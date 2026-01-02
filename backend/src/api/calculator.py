"""
Calculator API endpoints.

This module defines the REST API endpoints for calculator operations.
Main endpoint: POST /api/calculate
"""

from flask import Blueprint, request, jsonify
from src.validators.input_validator import validate_calculation_request
from src.services.calculator_service import calculate

# Create blueprint
bp = Blueprint('calculator', __name__, url_prefix='/api')


@bp.route('/health', methods=['GET'])
def health():
    """
    Health check endpoint to verify API is running.

    HTTP Method: GET
    URL: /api/health

    Success Response (HTTP 200):
    {
        "status": "healthy"
    }
    """
    return jsonify({'status': 'healthy'}), 200


@bp.route('/calculate', methods=['POST'])
def perform_calculation():
    """
    Perform a calculation operation.

    HTTP Method: POST
    URL: /api/calculate
    Content-Type: application/json

    Request Body:
    {
        "operand1": <number>,
        "operand2": <number>,
        "operator": <"+" | "−" | "×" | "÷">
    }

    Success Response (HTTP 200):
    {
        "result": <number>
    }

    Error Response (HTTP 400):
    {
        "error": "<error message>"
    }

    Example Request:
    POST /api/calculate
    {
        "operand1": 5,
        "operand2": 3,
        "operator": "+"
    }

    Example Response:
    HTTP 200
    {
        "result": 8
    }

    Error Example:
    POST /api/calculate
    {
        "operand1": 10,
        "operand2": 0,
        "operator": "÷"
    }

    Error Response:
    HTTP 400
    {
        "error": "Division by zero is not allowed"
    }
    """
    try:
        # Get JSON data from request
        data = request.get_json()

        # Validate request
        is_valid, operand1, operand2, operator, error = validate_calculation_request(data)

        if not is_valid:
            # Validation failed, return 400 Bad Request
            return jsonify({'error': error}), 400

        # Perform calculation
        result = calculate(operand1, operand2, operator)

        # Return successful result
        return jsonify({'result': result}), 200

    except Exception as e:
        # Catch unexpected errors
        return jsonify({'error': 'Internal server error'}), 500
