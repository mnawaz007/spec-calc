"""
Unit tests for calculator_service module.

Tests all arithmetic operations:
- Addition
- Subtraction
- Multiplication (Phase 4)
- Division (Phase 4)

Each test covers:
- Positive integers
- Negative integers
- Decimal numbers
- Edge cases
"""

import pytest
from src.services.calculator_service import add, subtract, multiply, divide, calculate


class TestAddition:
    """Test addition operation."""

    def test_add_positive_integers(self):
        """Test addition of positive integers."""
        assert add(5, 3) == 8
        assert add(10, 20) == 30
        assert add(0, 5) == 5
        assert add(1, 1) == 2

    def test_add_negative_integers(self):
        """Test addition with negative integers."""
        assert add(-5, 3) == -2
        assert add(-5, -3) == -8
        assert add(10, -7) == 3
        assert add(-10, 10) == 0

    def test_add_decimals(self):
        """Test addition of decimal numbers."""
        assert add(2.5, 3.75) == 6.25
        assert add(0.1, 0.2) == pytest.approx(0.3)  # Account for float precision
        assert add(1.1, 2.2) == pytest.approx(3.3)  # Account for float precision
        assert add(10.5, 2.5) == 13.0

    def test_add_mixed_types(self):
        """Test addition of mixed integer and decimal inputs."""
        assert add(5, 2.5) == 7.5
        assert add(10.5, 5) == 15.5
        assert add(-5, 2.5) == -2.5

    def test_add_zero(self):
        """Test addition with zero."""
        assert add(0, 0) == 0
        assert add(5, 0) == 5
        assert add(0, -5) == -5

    def test_add_large_numbers(self):
        """Test addition with large numbers."""
        assert add(1000000, 2000000) == 3000000
        assert add(999999.99, 0.01) == pytest.approx(1000000)


class TestSubtraction:
    """Test subtraction operation."""

    def test_subtract_positive_integers(self):
        """Test subtraction of positive integers."""
        assert subtract(10, 7) == 3
        assert subtract(20, 5) == 15
        assert subtract(5, 5) == 0
        assert subtract(5, 0) == 5

    def test_subtract_negative_integers(self):
        """Test subtraction with negative integers."""
        assert subtract(-5, 3) == -8
        assert subtract(5, -3) == 8
        assert subtract(-5, -3) == -2
        assert subtract(-10, -10) == 0

    def test_subtract_decimals(self):
        """Test subtraction of decimal numbers."""
        assert subtract(10.5, 2.5) == 8.0
        assert subtract(5.75, 2.5) == 3.25
        assert subtract(1.1, 0.1) == pytest.approx(1.0)

    def test_subtract_mixed_types(self):
        """Test subtraction of mixed integer and decimal inputs."""
        assert subtract(10, 2.5) == 7.5
        assert subtract(10.5, 5) == 5.5
        assert subtract(-5, 2.5) == -7.5

    def test_subtract_zero(self):
        """Test subtraction with zero."""
        assert subtract(0, 0) == 0
        assert subtract(5, 0) == 5
        assert subtract(0, 5) == -5

    def test_subtract_large_numbers(self):
        """Test subtraction with large numbers."""
        assert subtract(1000000, 200000) == 800000
        assert subtract(1000000.99, 0.99) == pytest.approx(1000000)


class TestMultiplication:
    """Test multiplication operation."""

    def test_multiply_positive_integers(self):
        """Test multiplication of positive integers."""
        assert multiply(6, 4) == 24
        assert multiply(5, 5) == 25
        assert multiply(10, 1) == 10
        assert multiply(1, 1) == 1

    def test_multiply_negative_integers(self):
        """Test multiplication with negative integers."""
        assert multiply(-8, 2) == -16
        assert multiply(-5, -2) == 10
        assert multiply(10, -3) == -30

    def test_multiply_decimals(self):
        """Test multiplication of decimal numbers."""
        assert multiply(2.5, 4) == 10.0
        assert multiply(1.5, 2) == 3.0
        assert multiply(0.5, 0.5) == pytest.approx(0.25)

    def test_multiply_by_zero(self):
        """Test multiplication by zero."""
        assert multiply(0, 0) == 0
        assert multiply(5, 0) == 0
        assert multiply(0, -5) == 0

    def test_multiply_by_one(self):
        """Test multiplication by one."""
        assert multiply(5, 1) == 5
        assert multiply(-5, 1) == -5
        assert multiply(2.5, 1) == 2.5


class TestDivision:
    """Test division operation."""

    def test_divide_positive_integers(self):
        """Test division of positive integers."""
        assert divide(20, 5) == 4.0
        assert divide(10, 2) == 5.0
        assert divide(9, 3) == 3.0

    def test_divide_negative_integers(self):
        """Test division with negative integers."""
        assert divide(-10, 2) == -5.0
        assert divide(-10, -2) == 5.0
        assert divide(10, -2) == -5.0

    def test_divide_decimals(self):
        """Test division of decimal numbers."""
        assert divide(10.5, 2.5) == pytest.approx(4.2)
        assert divide(7.5, 2.5) == 3.0
        assert divide(15, 2.5) == 6.0

    def test_divide_by_one(self):
        """Test division by one."""
        assert divide(5, 1) == 5.0
        assert divide(-5, 1) == -5.0
        assert divide(2.5, 1) == 2.5

    def test_divide_by_zero_raises_error(self):
        """Test that division by zero raises error."""
        with pytest.raises(ValueError):
            divide(10, 0)

    def test_divide_zero_by_number(self):
        """Test division of zero by a number."""
        assert divide(0, 5) == 0.0
        assert divide(0, -5) == 0.0


class TestCalculateFunction:
    """Test the unified calculate() function."""

    def test_calculate_addition(self):
        """Test calculate() with addition operator."""
        assert calculate(5, 3, '+') == 8
        assert calculate(-5, 3, '+') == -2

    def test_calculate_subtraction(self):
        """Test calculate() with subtraction operator."""
        assert calculate(10, 7, '−') == 3
        assert calculate(-5, 3, '−') == -8

    def test_calculate_multiplication(self):
        """Test calculate() with multiplication operator."""
        assert calculate(6, 4, '×') == 24
        assert calculate(-8, 2, '×') == -16

    def test_calculate_division(self):
        """Test calculate() with division operator."""
        assert calculate(20, 5, '÷') == 4.0
        assert calculate(-10, 2, '÷') == -5.0

    def test_calculate_unknown_operator_raises_error(self):
        """Test that unknown operator raises error."""
        with pytest.raises(ValueError):
            calculate(5, 3, '%')

    def test_calculate_division_by_zero_raises_error(self):
        """Test that division by zero raises error."""
        with pytest.raises(ValueError):
            calculate(10, 0, '÷')
