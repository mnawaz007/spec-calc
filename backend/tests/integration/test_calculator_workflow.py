"""
Integration tests for calculator workflows.

Tests complete workflows from API request to result display:
- Addition workflow (multiple scenarios)
- Subtraction workflow
- Error handling workflows
- Multiple sequential calculations
"""

import pytest
import json


class TestAdditionWorkflow:
    """Test complete addition workflows."""

    def test_simple_addition_workflow(self, client):
        """Test simple 5 + 3 = 8 workflow."""
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
        assert data['result'] == 8

    def test_negative_addition_workflow(self, client):
        """Test addition with negative numbers: -5 + 3 = -2."""
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

    def test_decimal_addition_workflow(self, client):
        """Test addition with decimals: 2.5 + 3.75 = 6.25."""
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

    def test_multiple_additions_workflow(self, client):
        """Test multiple addition calculations in sequence."""
        # First calculation: 5 + 3 = 8
        response1 = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': 5,
                'operand2': 3,
                'operator': '+'
            }),
            content_type='application/json'
        )
        assert response1.status_code == 200
        assert json.loads(response1.data)['result'] == 8

        # Second calculation: 10 + 20 = 30
        response2 = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': 10,
                'operand2': 20,
                'operator': '+'
            }),
            content_type='application/json'
        )
        assert response2.status_code == 200
        assert json.loads(response2.data)['result'] == 30

        # Third calculation: -5 + 5 = 0
        response3 = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': -5,
                'operand2': 5,
                'operator': '+'
            }),
            content_type='application/json'
        )
        assert response3.status_code == 200
        assert json.loads(response3.data)['result'] == 0


class TestSubtractionWorkflow:
    """Test complete subtraction workflows."""

    def test_simple_subtraction_workflow(self, client):
        """Test simple 10 - 7 = 3 workflow."""
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

    def test_negative_subtraction_workflow(self, client):
        """Test subtraction with negative numbers: -5 - 3 = -8."""
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

    def test_decimal_subtraction_workflow(self, client):
        """Test subtraction with decimals: 10.5 - 2.5 = 8.0."""
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


class TestDivisionByZeroWorkflow:
    """Test division by zero error workflows."""

    def test_division_by_zero_error_workflow(self, client):
        """Test division by zero returns error."""
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

    def test_division_by_zero_with_negative_workflow(self, client):
        """Test division by zero with negative dividend."""
        response = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': -5,
                'operand2': 0,
                'operator': '÷'
            }),
            content_type='application/json'
        )

        assert response.status_code == 400
        data = json.loads(response.data)
        assert data['error'] == "Division by zero is not allowed"


class TestInvalidInputWorkflow:
    """Test invalid input error workflows."""

    def test_non_numeric_operand_error_workflow(self, client):
        """Test non-numeric operand returns error."""
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

    def test_invalid_operator_error_workflow(self, client):
        """Test invalid operator returns error."""
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

    def test_missing_field_error_workflow(self, client):
        """Test missing required field returns error."""
        response = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': 5,
                'operator': '+'
                # missing operand2
            }),
            content_type='application/json'
        )

        assert response.status_code == 400
        data = json.loads(response.data)
        assert 'error' in data


class TestSuccessAfterErrorWorkflow:
    """Test that calculations work after error."""

    def test_successful_calculation_after_error(self, client):
        """Test that a successful calculation works after an error."""
        # First request with error: division by zero
        error_response = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': 10,
                'operand2': 0,
                'operator': '÷'
            }),
            content_type='application/json'
        )
        assert error_response.status_code == 400

        # Second request should succeed
        success_response = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': 5,
                'operand2': 3,
                'operator': '+'
            }),
            content_type='application/json'
        )
        assert success_response.status_code == 200
        assert json.loads(success_response.data)['result'] == 8

    def test_successful_calculation_after_invalid_input(self, client):
        """Test that a successful calculation works after invalid input."""
        # First request with invalid input
        error_response = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': 'abc',
                'operand2': 3,
                'operator': '+'
            }),
            content_type='application/json'
        )
        assert error_response.status_code == 400

        # Second request should succeed
        success_response = client.post(
            '/api/calculate',
            data=json.dumps({
                'operand1': 10,
                'operand2': 7,
                'operator': '−'
            }),
            content_type='application/json'
        )
        assert success_response.status_code == 200
        assert json.loads(success_response.data)['result'] == 3
