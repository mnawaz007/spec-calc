"""
Serverless Flask application entry point for Vercel deployment.

This module wraps the Flask application to run on Vercel's serverless functions.
"""

import sys
import os
from werkzeug.serving import WSGIRequestHandler

# Add backend directory to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from src.app import create_app

# Create Flask application
app = create_app()


def handler(request):
    """
    Vercel serverless function handler.

    Routes all requests to the Flask application using WSGI.

    Args:
        request: Vercel request object

    Returns:
        Response from Flask application
    """
    # Use Flask's built-in WSGI handling
    environ = {
        'REQUEST_METHOD': request.method,
        'PATH_INFO': request.path.replace('/api', '', 1) or '/',
        'QUERY_STRING': request.query_string.decode() if isinstance(request.query_string, bytes) else request.query_string or '',
        'CONTENT_TYPE': request.headers.get('content-type', ''),
        'CONTENT_LENGTH': request.headers.get('content-length', ''),
        'SERVER_NAME': request.headers.get('host', 'localhost').split(':')[0],
        'SERVER_PORT': request.headers.get('host', 'localhost').split(':')[1] if ':' in request.headers.get('host', '') else '443',
        'SERVER_PROTOCOL': 'HTTP/1.1',
        'wsgi.version': (1, 0),
        'wsgi.url_scheme': 'https',
        'wsgi.input': request.stream,
        'wsgi.errors': sys.stderr,
        'wsgi.multithread': True,
        'wsgi.multiprocess': False,
        'wsgi.run_once': False,
    }

    # Add headers to environ
    for key, value in request.headers.items():
        key = key.upper().replace('-', '_')
        if key not in ('CONTENT_TYPE', 'CONTENT_LENGTH'):
            key = f'HTTP_{key}'
        environ[key] = value

    # Call the Flask app with the environ
    response_data = []
    status = None
    response_headers = None

    def start_response(status_str, headers, exc_info=None):
        nonlocal status, response_headers
        status = status_str
        response_headers = headers
        return lambda s: response_data.append(s)

    try:
        app_iter = app(environ, start_response)
        for data in app_iter:
            response_data.append(data)
        if hasattr(app_iter, 'close'):
            app_iter.close()
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Internal Server Error: {str(e)}',
            'headers': {'content-type': 'text/plain'},
        }

    # Parse status code
    status_code = int(status.split()[0]) if status else 500

    # Combine response body
    body = b''.join(response_data)

    # Convert headers to dict
    headers_dict = {}
    if response_headers:
        for key, value in response_headers:
            headers_dict[key] = value

    return {
        'statusCode': status_code,
        'body': body.decode() if isinstance(body, bytes) else body,
        'headers': headers_dict,
    }


# For local development with Flask
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
