"""
Pytest configuration and fixtures for Calculator API tests.
"""

import pytest
from src.app import create_app


@pytest.fixture
def app():
    """Create and configure a test Flask application instance."""
    app = create_app()
    app.config['TESTING'] = True
    return app


@pytest.fixture
def client(app):
    """Create a Flask test client."""
    return app.test_client()


@pytest.fixture
def runner(app):
    """Create a Flask CLI runner for testing CLI commands."""
    return app.test_cli_runner()
