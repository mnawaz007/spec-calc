"""
Input validation for calculator operations.

This module provides validation functions for:
- Numeric operands (with support for integers, decimals, and negative numbers)
- Arithmetic operators (+, −, ×, ÷)
- Division by zero detection
"""


def validate_operand(value):
    """
    Validate that a value is a valid numeric operand.

    Args:
        value: The value to validate (string, int, or float)

    Returns:
        tuple: (is_valid: bool, operand: float | None, error: str | None)
               If valid: (True, float_value, None)
               If invalid: (False, None, error_message)

    Examples:
        >>> validate_operand("5")
        (True, 5.0, None)
        >>> validate_operand("2.5")
        (True, 2.5, None)
        >>> validate_operand("-10")
        (True, -10.0, None)
        >>> validate_operand("abc")
        (False, None, "Invalid input: Please enter numeric values for both operands.")
        >>> validate_operand("1.2.3")
        (False, None, "Invalid input: Please enter numeric values for both operands.")
    """
    # Check for empty/None
    if value is None or value == "":
        return False, None, "Invalid input: Both operands are required."

    try:
        # Try to convert to float
        operand = float(value)
        return True, operand, None
    except (ValueError, TypeError):
        return False, None, "Invalid input: Please enter numeric values for both operands."


def validate_operator(operator):
    """
    Validate that an operator is supported.

    Args:
        operator: The operator to validate (string)

    Returns:
        tuple: (is_valid: bool, error: str | None)
               If valid: (True, None)
               If invalid: (False, error_message)

    Valid operators:
        '+' - Addition
        '−' - Subtraction (Unicode minus)
        '×' - Multiplication (Unicode multiply)
        '÷' - Division (Unicode divide)

    Examples:
        >>> validate_operator("+")
        (True, None)
        >>> validate_operator("÷")
        (True, None)
        >>> validate_operator("%")
        (False, "Invalid operator. Supported operators are: +, −, ×, ÷")
    """
    valid_operators = {'+', '−', '×', '÷'}

    if operator not in valid_operators:
        return False, "Invalid operator. Supported operators are: +, −, ×, ÷"

    return True, None


def validate_division_operands(operand1, operand2, operator):
    """
    Check for division by zero.

    Args:
        operand1 (float): First operand
        operand2 (float): Second operand
        operator (str): Arithmetic operator

    Returns:
        tuple: (is_valid: bool, error: str | None)
               If valid: (True, None)
               If invalid: (False, error_message)

    Examples:
        >>> validate_division_operands(10, 0, "÷")
        (False, "Division by zero is not allowed")
        >>> validate_division_operands(10, 5, "÷")
        (True, None)
        >>> validate_division_operands(10, 0, "+")
        (True, None)
    """
    if operator == '÷' and operand2 == 0:
        return False, "Division by zero is not allowed"

    return True, None


def validate_calculation_request(data):
    """
    Comprehensive validation for a calculation request.

    Args:
        data (dict): Request data with keys: operand1, operand2, operator

    Returns:
        tuple: (is_valid: bool, operand1: float | None, operand2: float | None, operator: str | None, error: str | None)
               If valid: (True, operand1_float, operand2_float, operator_str, None)
               If invalid: (False, None, None, None, error_message)

    Examples:
        >>> result = validate_calculation_request({"operand1": "5", "operand2": "3", "operator": "+"})
        >>> result[0]  # is_valid
        True
        >>> result[1:4]  # operand1, operand2, operator
        (5.0, 3.0, '+')
    """
    # Validate operand1
    if 'operand1' not in data:
        return False, None, None, None, "Invalid input: operand1 is required."

    valid1, operand1, error1 = validate_operand(data['operand1'])
    if not valid1:
        return False, None, None, None, error1

    # Validate operand2
    if 'operand2' not in data:
        return False, None, None, None, "Invalid input: operand2 is required."

    valid2, operand2, error2 = validate_operand(data['operand2'])
    if not valid2:
        return False, None, None, None, error2

    # Validate operator
    if 'operator' not in data:
        return False, None, None, None, "Invalid input: operator is required."

    operator = data['operator']
    valid_op, error_op = validate_operator(operator)
    if not valid_op:
        return False, None, None, None, error_op

    # Validate division by zero
    valid_div, error_div = validate_division_operands(operand1, operand2, operator)
    if not valid_div:
        return False, None, None, None, error_div

    return True, operand1, operand2, operator, None
