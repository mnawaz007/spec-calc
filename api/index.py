"""
Serverless Flask application entry point for Vercel deployment.

This module wraps the Flask application to run on Vercel's serverless functions.
"""

import sys
import os

# Add backend directory to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from src.app import create_app

# Create Flask application
app = create_app()

# Export handler for Vercel
def handler(request):
    """
    Vercel serverless function handler.

    Routes all requests to the Flask application.

    Args:
        request: Vercel request object

    Returns:
        Response from Flask application
    """
    # Strip /api prefix if present (Vercel adds it)
    path = request.path
    if path.startswith('/api'):
        path = path[4:]

    # Handle root health check
    if not path or path == '/':
        path = '/health'

    with app.test_request_context(
        path=path,
        method=request.method,
        data=request.get_data(),
        headers=dict(request.headers),
        query_string=request.query_string
    ):
        return app.full_dispatch_request()


# For local development with Flask
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
