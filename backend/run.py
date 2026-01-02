#!/usr/bin/env python3
"""
Entry point for Flask application.
Run with: python run.py
"""

import os
from dotenv import load_dotenv
from src.app import create_app

# Load environment variables from .env file
load_dotenv()

# Create Flask app
app = create_app()

if __name__ == '__main__':
    # Get configuration from environment
    host = os.getenv('FLASK_HOST', '127.0.0.1')
    port = int(os.getenv('FLASK_PORT', 5000))
    debug = os.getenv('FLASK_ENV', 'development') == 'development'

    # Run development server
    app.run(host=host, port=port, debug=debug)
