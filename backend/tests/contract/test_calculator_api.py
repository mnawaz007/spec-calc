"""
Contract tests for calculator API endpoints.

Tests the POST /api/calculate endpoint with:
- Valid requests (success cases)
- Invalid input (error cases)
- Error messages and HTTP status codes
"""

import pytest
import json


class TestCalculatorAPIEndpoint:
    """Test the POST /api/calculate endpoint."""

    def test_api_addition_request(self, client):
        """Test addition operation via API."""
        response = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': 5,
                'operand2': 3,
                'operator': '+'
            }),
            content_type='application/json'
        )

        assert response.status_code == 200
        data = json.loads(response.data)
        assert 'result' in data
        assert data['result'] == 8

    def test_api_subtraction_request(self, client):
        """Test subtraction operation via API."""
        response = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': 10,
                'operand2': 7,
                'operator': '−'
            }),
            content_type='application/json'
        )

        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['result'] == 3

    def test_api_addition_with_decimals(self, client):
        """Test addition with decimal numbers."""
        response = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': 2.5,
                'operand2': 3.75,
                'operator': '+'
            }),
            content_type='application/json'
        )

        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['result'] == 6.25

    def test_api_subtraction_with_decimals(self, client):
        """Test subtraction with decimal numbers."""
        response = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': 10.5,
                'operand2': 2.5,
                'operator': '−'
            }),
            content_type='application/json'
        )

        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['result'] == 8.0

    def test_api_addition_with_negative_numbers(self, client):
        """Test addition with negative numbers."""
        response = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': -5,
                'operand2': 3,
                'operator': '+'
            }),
            content_type='application/json'
        )

        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['result'] == -2

    def test_api_subtraction_with_negative_numbers(self, client):
        """Test subtraction with negative numbers."""
        response = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': -5,
                'operand2': 3,
                'operator': '−'
            }),
            content_type='application/json'
        )

        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['result'] == -8

    def test_api_multiplication_request(self, client):
        """Test multiplication operation via API."""
        response = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': 6,
                'operand2': 4,
                'operator': '×'
            }),
            content_type='application/json'
        )

        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['result'] == 24

    def test_api_division_request(self, client):
        """Test division operation via API."""
        response = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': 20,
                'operand2': 5,
                'operator': '÷'
            }),
            content_type='application/json'
        )

        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['result'] == 4.0

    def test_api_division_by_zero(self, client):
        """Test division by zero error."""
        response = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': 10,
                'operand2': 0,
                'operator': '÷'
            }),
            content_type='application/json'
        )

        assert response.status_code == 400
        data = json.loads(response.data)
        assert 'error' in data
        assert data['error'] == "Division by zero is not allowed"

    def test_api_invalid_numeric_input(self, client):
        """Test invalid numeric input."""
        response = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': 'abc',
                'operand2': 3,
                'operator': '+'
            }),
            content_type='application/json'
        )

        assert response.status_code == 400
        data = json.loads(response.data)
        assert 'error' in data
        assert 'Invalid input' in data['error']

    def test_api_invalid_operator(self, client):
        """Test invalid operator."""
        response = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': 5,
                'operand2': 3,
                'operator': '%'
            }),
            content_type='application/json'
        )

        assert response.status_code == 400
        data = json.loads(response.data)
        assert 'error' in data
        assert 'Invalid operator' in data['error']

    def test_api_missing_operand1(self, client):
        """Test missing operand1."""
        response = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand2': 3,
                'operator': '+'
            }),
            content_type='application/json'
        )

        assert response.status_code == 400
        data = json.loads(response.data)
        assert 'error' in data
        assert 'operand1' in data['error']

    def test_api_missing_operand2(self, client):
        """Test missing operand2."""
        response = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': 5,
                'operator': '+'
            }),
            content_type='application/json'
        )

        assert response.status_code == 400
        data = json.loads(response.data)
        assert 'error' in data
        assert 'operand2' in data['error']

    def test_api_missing_operator(self, client):
        """Test missing operator."""
        response = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': 5,
                'operand2': 3
            }),
            content_type='application/json'
        )

        assert response.status_code == 400
        data = json.loads(response.data)
        assert 'error' in data
        assert 'operator' in data['error']

    def test_api_response_format(self, client):
        """Test response format is valid JSON with proper structure."""
        response = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': 5,
                'operand2': 3,
                'operator': '+'
            }),
            content_type='application/json'
        )

        assert response.status_code == 200
        assert response.content_type == 'application/json'
        data = json.loads(response.data)
        assert isinstance(data, dict)
        assert 'result' in data or 'error' in data

    def test_api_content_type_header(self, client):
        """Test API returns correct content type."""
        response = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': 5,
                'operand2': 3,
                'operator': '+'
            }),
            content_type='application/json'
        )

        assert 'application/json' in response.content_type

    def test_api_health_endpoint(self, client):
        """Test health check endpoint."""
        response = client.get('/health')
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['status'] == 'healthy'
