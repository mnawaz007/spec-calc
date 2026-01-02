"""
Unit tests for input_validator module.

Tests validation of:
- Numeric operands
- Operators
- Division by zero
- Complete calculation requests
"""

import pytest
from src.validators.input_validator import (
    validate_operand,
    validate_operator,
    validate_division_operands,
    validate_calculation_request,
)


class TestValidateOperand:
    """Test operand validation."""

    def test_validate_integer_operand(self):
        """Test validation of integer operands."""
        assert validate_operand("5") == (True, 5.0, None)
        assert validate_operand("10") == (True, 10.0, None)
        assert validate_operand("0") == (True, 0.0, None)
        assert validate_operand("1") == (True, 1.0, None)

    def test_validate_negative_operand(self):
        """Test validation of negative operands."""
        assert validate_operand("-5") == (True, -5.0, None)
        assert validate_operand("-10") == (True, -10.0, None)
        assert validate_operand("-0.5") == (True, -0.5, None)

    def test_validate_decimal_operand(self):
        """Test validation of decimal operands."""
        assert validate_operand("2.5") == (True, 2.5, None)
        assert validate_operand("3.75") == (True, 3.75, None)
        assert validate_operand("0.1") == (True, 0.1, None)

    def test_validate_operand_with_leading_zeros(self):
        """Test validation of operands with leading zeros."""
        assert validate_operand("007") == (True, 7.0, None)
        assert validate_operand("010.5") == (True, 10.5, None)

    def test_validate_empty_operand(self):
        """Test validation of empty operands."""
        is_valid, operand, error = validate_operand("")
        assert is_valid is False
        assert error == "Invalid input: Both operands are required."

    def test_validate_none_operand(self):
        """Test validation of None operand."""
        is_valid, operand, error = validate_operand(None)
        assert is_valid is False
        assert error == "Invalid input: Both operands are required."

    def test_validate_non_numeric_operand(self):
        """Test validation of non-numeric operands."""
        is_valid, operand, error = validate_operand("abc")
        assert is_valid is False
        assert "Invalid input" in error

        is_valid, operand, error = validate_operand("12a")
        assert is_valid is False

    def test_validate_operand_with_multiple_decimal_points(self):
        """Test validation of operands with multiple decimal points."""
        is_valid, operand, error = validate_operand("1.2.3")
        assert is_valid is False
        assert "Invalid input" in error

    def test_validate_operand_with_special_characters(self):
        """Test validation of operands with special characters."""
        is_valid, operand, error = validate_operand("1@2")
        assert is_valid is False

        is_valid, operand, error = validate_operand("1#2")
        assert is_valid is False


class TestValidateOperator:
    """Test operator validation."""

    def test_validate_addition_operator(self):
        """Test validation of addition operator."""
        assert validate_operator("+") == (True, None)

    def test_validate_subtraction_operator(self):
        """Test validation of subtraction operator."""
        assert validate_operator("−") == (True, None)

    def test_validate_multiplication_operator(self):
        """Test validation of multiplication operator."""
        assert validate_operator("×") == (True, None)

    def test_validate_division_operator(self):
        """Test validation of division operator."""
        assert validate_operator("÷") == (True, None)

    def test_validate_invalid_operators(self):
        """Test validation of invalid operators."""
        is_valid, error = validate_operator("%")
        assert is_valid is False
        assert "Invalid operator" in error

        is_valid, error = validate_operator("^")
        assert is_valid is False

        is_valid, error = validate_operator("*")
        assert is_valid is False

        is_valid, error = validate_operator("/")
        assert is_valid is False

    def test_validate_empty_operator(self):
        """Test validation of empty operator."""
        is_valid, error = validate_operator("")
        assert is_valid is False

    def test_validate_multiple_character_operator(self):
        """Test validation of multiple character operator."""
        is_valid, error = validate_operator("++")
        assert is_valid is False


class TestValidateDivisionOperands:
    """Test division by zero detection."""

    def test_validate_non_division_operations(self):
        """Test that non-division operations pass validation."""
        assert validate_division_operands(10, 0, "+") == (True, None)
        assert validate_division_operands(10, 0, "−") == (True, None)
        assert validate_division_operands(10, 0, "×") == (True, None)

    def test_validate_division_with_non_zero_divisor(self):
        """Test division with non-zero divisor."""
        assert validate_division_operands(10, 5, "÷") == (True, None)
        assert validate_division_operands(10, -5, "÷") == (True, None)
        assert validate_division_operands(10, 0.5, "÷") == (True, None)

    def test_validate_division_by_zero(self):
        """Test division by zero detection."""
        is_valid, error = validate_division_operands(10, 0, "÷")
        assert is_valid is False
        assert error == "Division by zero is not allowed"

        is_valid, error = validate_division_operands(-5, 0, "÷")
        assert is_valid is False

        is_valid, error = validate_division_operands(0, 0, "÷")
        assert is_valid is False


class TestValidateCalculationRequest:
    """Test comprehensive calculation request validation."""

    def test_validate_valid_addition_request(self):
        """Test validation of valid addition request."""
        data = {"operand1": "5", "operand2": "3", "operator": "+"}
        is_valid, op1, op2, op, error = validate_calculation_request(data)
        assert is_valid is True
        assert op1 == 5.0
        assert op2 == 3.0
        assert op == "+"
        assert error is None

    def test_validate_valid_subtraction_request(self):
        """Test validation of valid subtraction request."""
        data = {"operand1": "10", "operand2": "7", "operator": "−"}
        is_valid, op1, op2, op, error = validate_calculation_request(data)
        assert is_valid is True
        assert op1 == 10.0
        assert op2 == 7.0
        assert op == "−"

    def test_validate_valid_decimal_request(self):
        """Test validation of valid decimal request."""
        data = {"operand1": "2.5", "operand2": "3.75", "operator": "+"}
        is_valid, op1, op2, op, error = validate_calculation_request(data)
        assert is_valid is True
        assert op1 == 2.5
        assert op2 == 3.75

    def test_validate_request_missing_operand1(self):
        """Test validation of request missing operand1."""
        data = {"operand2": "3", "operator": "+"}
        is_valid, op1, op2, op, error = validate_calculation_request(data)
        assert is_valid is False
        assert "operand1 is required" in error

    def test_validate_request_missing_operand2(self):
        """Test validation of request missing operand2."""
        data = {"operand1": "5", "operator": "+"}
        is_valid, op1, op2, op, error = validate_calculation_request(data)
        assert is_valid is False
        assert "operand2 is required" in error

    def test_validate_request_missing_operator(self):
        """Test validation of request missing operator."""
        data = {"operand1": "5", "operand2": "3"}
        is_valid, op1, op2, op, error = validate_calculation_request(data)
        assert is_valid is False
        assert "operator is required" in error

    def test_validate_request_invalid_operand1(self):
        """Test validation of request with invalid operand1."""
        data = {"operand1": "abc", "operand2": "3", "operator": "+"}
        is_valid, op1, op2, op, error = validate_calculation_request(data)
        assert is_valid is False
        assert "Invalid input" in error

    def test_validate_request_invalid_operand2(self):
        """Test validation of request with invalid operand2."""
        data = {"operand1": "5", "operand2": "xyz", "operator": "+"}
        is_valid, op1, op2, op, error = validate_calculation_request(data)
        assert is_valid is False

    def test_validate_request_invalid_operator(self):
        """Test validation of request with invalid operator."""
        data = {"operand1": "5", "operand2": "3", "operator": "%"}
        is_valid, op1, op2, op, error = validate_calculation_request(data)
        assert is_valid is False
        assert "Invalid operator" in error

    def test_validate_request_division_by_zero(self):
        """Test validation of division by zero request."""
        data = {"operand1": "10", "operand2": "0", "operator": "÷"}
        is_valid, op1, op2, op, error = validate_calculation_request(data)
        assert is_valid is False
        assert "Division by zero is not allowed" in error

    def test_validate_request_with_negative_numbers(self):
        """Test validation of request with negative numbers."""
        data = {"operand1": "-5", "operand2": "3", "operator": "+"}
        is_valid, op1, op2, op, error = validate_calculation_request(data)
        assert is_valid is True
        assert op1 == -5.0
        assert op2 == 3.0
