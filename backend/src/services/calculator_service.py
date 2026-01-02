"""
Calculator service with basic arithmetic operations.

This module implements the four basic arithmetic operations:
- Addition
- Subtraction
- Multiplication
- Division

All operations support:
- Integers (e.g., 5, -10)
- Decimals (e.g., 2.5, 3.75)
- Negative numbers (e.g., -5, -2.5)

Note: Floating-point precision follows IEEE 754 standard.
Example: 1.1 + 2.2 may return 3.3000000000000003 due to binary representation.
"""

import logging

# Configure logger
logger = logging.getLogger(__name__)


def add(operand1, operand2):
    """
    Add two numbers.

    Args:
        operand1 (float): First number
        operand2 (float): Second number

    Returns:
        float: Sum of operand1 and operand2

    Examples:
        >>> add(5, 3)
        8
        >>> add(2.5, 3.75)
        6.25
        >>> add(-5, 3)
        -2
    """
    result = operand1 + operand2
    logger.info(f"Addition: {operand1} + {operand2} = {result}")
    return result


def subtract(operand1, operand2):
    """
    Subtract two numbers.

    Args:
        operand1 (float): First number (minuend)
        operand2 (float): Second number (subtrahend)

    Returns:
        float: Difference (operand1 - operand2)

    Examples:
        >>> subtract(10, 7)
        3
        >>> subtract(10.5, 2.5)
        8.0
        >>> subtract(-5, 3)
        -8
    """
    result = operand1 - operand2
    logger.info(f"Subtraction: {operand1} - {operand2} = {result}")
    return result


def multiply(operand1, operand2):
    """
    Multiply two numbers.

    Args:
        operand1 (float): First number
        operand2 (float): Second number

    Returns:
        float: Product of operand1 and operand2

    Examples:
        >>> multiply(6, 4)
        24
        >>> multiply(2.5, 4)
        10.0
        >>> multiply(-8, 2)
        -16
    """
    result = operand1 * operand2
    logger.info(f"Multiplication: {operand1} × {operand2} = {result}")
    return result


def divide(operand1, operand2):
    """
    Divide two numbers.

    NOTE: Division by zero check MUST be done before calling this function.
    This function assumes operand2 is not zero.

    Args:
        operand1 (float): First number (dividend)
        operand2 (float): Second number (divisor)

    Returns:
        float: Quotient (operand1 / operand2)

    Raises:
        ZeroDivisionError: If operand2 is 0 (should be caught before calling)

    Examples:
        >>> divide(20, 5)
        4.0
        >>> divide(10.5, 2.5)
        4.2
        >>> divide(-10, -2)
        5.0
    """
    # Division by zero should be checked before this function is called
    # but we validate here as a safety measure
    if operand2 == 0:
        logger.error(f"Division by zero attempted: {operand1} ÷ 0")
        raise ValueError("Cannot divide by zero")

    result = operand1 / operand2
    logger.info(f"Division: {operand1} ÷ {operand2} = {result}")
    return result


def calculate(operand1, operand2, operator):
    """
    Perform a calculation based on the operator.

    This is the main entry point for calculations.

    Args:
        operand1 (float): First operand
        operand2 (float): Second operand
        operator (str): One of: '+', '−', '×', '÷'

    Returns:
        float: Result of the calculation

    Raises:
        ValueError: If operator is not recognized
        ZeroDivisionError: If attempting to divide by zero (should be caught elsewhere)

    Examples:
        >>> calculate(5, 3, '+')
        8
        >>> calculate(6, 4, '×')
        24
    """
    logger.debug(f"Calculate called: {operand1} {operator} {operand2}")

    if operator == '+':
        return add(operand1, operand2)
    elif operator == '−':
        return subtract(operand1, operand2)
    elif operator == '×':
        return multiply(operand1, operand2)
    elif operator == '÷':
        return divide(operand1, operand2)
    else:
        logger.error(f"Unknown operator: {operator}")
        raise ValueError(f"Unknown operator: {operator}")
