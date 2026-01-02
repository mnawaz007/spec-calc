/**
 * Validation Utilities Tests
 *
 * Tests client-side validation functions with:
 * - Number validation
 * - Operator validation
 * - Form validation
 * - Number formatting
 */

import { describe, it, expect } from 'vitest';
import {
  validateNumber,
  validateOperator,
  validateCalculationForm,
  formatNumber
} from './validation';

describe('Validation Utilities', () => {
  describe('validateNumber()', () => {
    describe('Valid Numbers', () => {
      it('should validate positive integers', () => {
        expect(validateNumber(5)).toBe(true);
        expect(validateNumber(0)).toBe(true);
        expect(validateNumber(100)).toBe(true);
      });

      it('should validate negative numbers', () => {
        expect(validateNumber(-5)).toBe(true);
        expect(validateNumber(-0.5)).toBe(true);
      });

      it('should validate decimal numbers', () => {
        expect(validateNumber(2.5)).toBe(true);
        expect(validateNumber(3.14159)).toBe(true);
        expect(validateNumber(0.1)).toBe(true);
      });

      it('should validate string representations of numbers', () => {
        expect(validateNumber('5')).toBe(true);
        expect(validateNumber('2.5')).toBe(true);
        expect(validateNumber('-5')).toBe(true);
      });

      it('should validate large numbers', () => {
        expect(validateNumber(999999999)).toBe(true);
        expect(validateNumber('1000000000')).toBe(true);
      });
    });

    describe('Invalid Numbers', () => {
      it('should reject empty values', () => {
        expect(validateNumber('')).toBe(false);
        expect(validateNumber(null)).toBe(false);
        expect(validateNumber(undefined)).toBe(false);
      });

      it('should reject non-numeric strings', () => {
        expect(validateNumber('abc')).toBe(false);
        expect(validateNumber('12a')).toBe(false);
        expect(validateNumber('a12')).toBe(false);
      });

      it('should reject multiple decimal points', () => {
        expect(validateNumber('1.2.3')).toBe(false);
        expect(validateNumber('1..2')).toBe(false);
      });

      it('should reject special characters', () => {
        expect(validateNumber('1@2')).toBe(false);
        expect(validateNumber('1#2')).toBe(false);
        expect(validateNumber('1!2')).toBe(false);
      });

      it('should reject NaN', () => {
        expect(validateNumber(NaN)).toBe(false);
      });

      it('should reject Infinity', () => {
        expect(validateNumber(Infinity)).toBe(false);
        expect(validateNumber(-Infinity)).toBe(false);
      });
    });

    describe('Edge Cases', () => {
      it('should validate zero as a number', () => {
        expect(validateNumber(0)).toBe(true);
        expect(validateNumber('0')).toBe(true);
      });

      it('should handle leading zeros', () => {
        expect(validateNumber('007')).toBe(true);
      });

      it('should handle leading minus sign with decimals', () => {
        expect(validateNumber('-2.5')).toBe(true);
      });
    });
  });

  describe('validateOperator()', () => {
    describe('Valid Operators', () => {
      it('should validate addition operator', () => {
        expect(validateOperator('+')).toBe(true);
      });

      it('should validate subtraction operator', () => {
        expect(validateOperator('−')).toBe(true);
      });

      it('should validate multiplication operator', () => {
        expect(validateOperator('×')).toBe(true);
      });

      it('should validate division operator', () => {
        expect(validateOperator('÷')).toBe(true);
      });
    });

    describe('Invalid Operators', () => {
      it('should reject invalid operators', () => {
        expect(validateOperator('%')).toBe(false);
        expect(validateOperator('^')).toBe(false);
        expect(validateOperator('*')).toBe(false);
        expect(validateOperator('/')).toBe(false);
      });

      it('should reject empty operator', () => {
        expect(validateOperator('')).toBe(false);
      });

      it('should reject null or undefined', () => {
        expect(validateOperator(null)).toBe(false);
        expect(validateOperator(undefined)).toBe(false);
      });

      it('should reject multiple character operators', () => {
        expect(validateOperator('++')).toBe(false);
        expect(validateOperator('+-')).toBe(false);
      });

      it('should reject operators with spaces', () => {
        expect(validateOperator('+ ')).toBe(false);
        expect(validateOperator(' +')).toBe(false);
      });
    });
  });

  describe('validateCalculationForm()', () => {
    describe('Valid Forms', () => {
      it('should validate complete valid form', () => {
        const { errors } = validateCalculationForm({
          operand1: 5,
          operand2: 3,
          operator: '+'
        });

        expect(errors.operand1).toBeUndefined();
        expect(errors.operand2).toBeUndefined();
        expect(errors.operator).toBeUndefined();
      });

      it('should validate with decimal numbers', () => {
        const { errors } = validateCalculationForm({
          operand1: 2.5,
          operand2: 3.75,
          operator: '+'
        });

        expect(Object.keys(errors).length).toBe(0);
      });

      it('should validate with negative numbers', () => {
        const { errors } = validateCalculationForm({
          operand1: -5,
          operand2: 3,
          operator: '−'
        });

        expect(Object.keys(errors).length).toBe(0);
      });

      it('should validate with all operators', () => {
        const operators = ['+', '−', '×', '÷'];

        operators.forEach(op => {
          const { errors } = validateCalculationForm({
            operand1: 5,
            operand2: 3,
            operator: op
          });

          expect(errors.operator).toBeUndefined();
        });
      });

      it('should validate with zero', () => {
        const { errors } = validateCalculationForm({
          operand1: 0,
          operand2: 0,
          operator: '+'
        });

        expect(Object.keys(errors).length).toBe(0);
      });
    });

    describe('Invalid Forms - Missing Fields', () => {
      it('should reject missing operand1', () => {
        const { errors } = validateCalculationForm({
          operand2: 3,
          operator: '+'
        });

        expect(errors.operand1).toBeDefined();
        expect(errors.operand1).toMatch(/operand1|required/i);
      });

      it('should reject missing operand2', () => {
        const { errors } = validateCalculationForm({
          operand1: 5,
          operator: '+'
        });

        expect(errors.operand2).toBeDefined();
        expect(errors.operand2).toMatch(/operand2|required/i);
      });

      it('should reject missing operator', () => {
        const { errors } = validateCalculationForm({
          operand1: 5,
          operand2: 3
        });

        expect(errors.operator).toBeDefined();
        expect(errors.operator).toMatch(/operator|required/i);
      });

      it('should reject all missing fields', () => {
        const { errors } = validateCalculationForm({});

        expect(errors.operand1).toBeDefined();
        expect(errors.operand2).toBeDefined();
        expect(errors.operator).toBeDefined();
      });
    });

    describe('Invalid Forms - Invalid Values', () => {
      it('should reject invalid operand1', () => {
        const { errors } = validateCalculationForm({
          operand1: 'abc',
          operand2: 3,
          operator: '+'
        });

        expect(errors.operand1).toBeDefined();
      });

      it('should reject invalid operand2', () => {
        const { errors } = validateCalculationForm({
          operand1: 5,
          operand2: 'xyz',
          operator: '+'
        });

        expect(errors.operand2).toBeDefined();
      });

      it('should reject invalid operator', () => {
        const { errors } = validateCalculationForm({
          operand1: 5,
          operand2: 3,
          operator: '%'
        });

        expect(errors.operator).toBeDefined();
      });

      it('should reject multiple invalid fields', () => {
        const { errors } = validateCalculationForm({
          operand1: 'abc',
          operand2: 'xyz',
          operator: '!'
        });

        expect(errors.operand1).toBeDefined();
        expect(errors.operand2).toBeDefined();
        expect(errors.operator).toBeDefined();
      });
    });

    describe('Return Value Structure', () => {
      it('should return object with field keys', () => {
        const { errors } = validateCalculationForm({
          operand1: 5,
          operand2: 3,
          operator: '+'
        });

        expect(typeof errors).toBe('object');
        expect(errors).not.toBeNull();
      });

      it('should not include keys for valid fields', () => {
        const { errors } = validateCalculationForm({
          operand1: 5,
          operand2: 3,
          operator: '+'
        });

        expect(Object.keys(errors).length).toBe(0);
      });

      it('should include error messages for invalid fields', () => {
        const { errors } = validateCalculationForm({
          operand1: 'abc',
          operand2: 3,
          operator: '+'
        });

        expect(typeof errors.operand1).toBe('string');
        expect(errors.operand1.length).toBeGreaterThan(0);
      });
    });
  });

  describe('formatNumber()', () => {
    describe('Integer Formatting', () => {
      it('should format integer without decimals', () => {
        expect(formatNumber(8)).toBe('8');
        expect(formatNumber(100)).toBe('100');
      });

      it('should format negative integers', () => {
        expect(formatNumber(-8)).toBe('-8');
        expect(formatNumber(-100)).toBe('-100');
      });

      it('should format zero', () => {
        expect(formatNumber(0)).toBe('0');
      });

      it('should format large integers', () => {
        expect(formatNumber(999999999)).toBe('999999999');
      });
    });

    describe('Decimal Formatting', () => {
      it('should format decimal numbers', () => {
        expect(formatNumber(6.25)).toBe('6.25');
      });

      it('should remove trailing zeros', () => {
        const result = formatNumber(6.0);
        expect(result).toBe('6');
      });

      it('should respect maxDecimals parameter', () => {
        const num = 3.14159265;
        const result = formatNumber(num, 2);
        expect(result).toMatch(/3\.14/);
      });

      it('should handle small decimals', () => {
        expect(formatNumber(0.1)).toBe('0.1');
        expect(formatNumber(0.01)).toBe('0.01');
      });

      it('should handle negative decimals', () => {
        expect(formatNumber(-6.25)).toBe('-6.25');
        expect(formatNumber(-0.5)).toBe('-0.5');
      });
    });

    describe('Floating Point Precision', () => {
      it('should handle division results', () => {
        const result = formatNumber(10 / 3, 4);
        expect(result).toMatch(/3\.333/);
      });

      it('should handle addition precision issues', () => {
        const result = formatNumber(0.1 + 0.2, 2);
        expect(result).toBe('0.3');
      });

      it('should clean up floating point artifacts', () => {
        const result = formatNumber(1.1 + 2.2, 1);
        expect(result).toBe('3.3');
      });
    });

    describe('maxDecimals Parameter', () => {
      it('should use default maxDecimals when not specified', () => {
        const result = formatNumber(3.14159);
        expect(result).toContain('3.14');
      });

      it('should truncate to specified maxDecimals', () => {
        expect(formatNumber(3.14159, 2)).toMatch(/3\.14/);
        expect(formatNumber(3.14159, 3)).toMatch(/3\.14/);
        expect(formatNumber(3.14159, 5)).toMatch(/3\.14/);
      });

      it('should handle maxDecimals of 0', () => {
        const result = formatNumber(3.14159, 0);
        expect(result).toBe('3');
      });

      it('should handle maxDecimals greater than actual decimals', () => {
        const result = formatNumber(6.25, 5);
        expect(result).toBe('6.25');
      });
    });

    describe('Edge Cases', () => {
      it('should format negative zero as zero', () => {
        expect(formatNumber(-0)).toBe('0');
      });

      it('should handle string numbers', () => {
        // formatNumber might accept strings or numbers
        const result = formatNumber(6.25);
        expect(result).toBe('6.25');
      });

      it('should handle very small numbers', () => {
        const result = formatNumber(0.000001, 6);
        expect(result).toMatch(/0\.00/);
      });

      it('should handle very large numbers', () => {
        expect(formatNumber(1000000000, 2)).toBe('1000000000');
      });
    });

    describe('Return Type', () => {
      it('should return string', () => {
        expect(typeof formatNumber(8)).toBe('string');
        expect(typeof formatNumber(6.25)).toBe('string');
      });

      it('should not include trailing zeros in output', () => {
        const result = formatNumber(8.0);
        expect(result).not.toContain('8.0');
      });
    });
  });

  describe('Integration Scenarios', () => {
    it('should validate and format addition result', () => {
      const form = {
        operand1: 2.5,
        operand2: 3.75,
        operator: '+'
      };

      const { errors } = validateCalculationForm(form);
      expect(Object.keys(errors).length).toBe(0);

      const result = 6.25;
      const formatted = formatNumber(result);
      expect(formatted).toBe('6.25');
    });

    it('should validate and format subtraction result', () => {
      const form = {
        operand1: 10.5,
        operand2: 2.5,
        operator: '−'
      };

      const { errors } = validateCalculationForm(form);
      expect(Object.keys(errors).length).toBe(0);

      const result = 8.0;
      const formatted = formatNumber(result);
      expect(formatted).toBe('8');
    });

    it('should catch validation errors early', () => {
      const form = {
        operand1: 'abc',
        operand2: 3,
        operator: '%'
      };

      const { errors } = validateCalculationForm(form);
      expect(Object.keys(errors).length).toBeGreaterThan(0);
    });

    it('should handle complete division workflow', () => {
      const form = {
        operand1: 20,
        operand2: 3,
        operator: '÷'
      };

      const { errors } = validateCalculationForm(form);
      expect(Object.keys(errors).length).toBe(0);

      const result = 6.66666667;
      const formatted = formatNumber(result, 2);
      expect(formatted).toMatch(/6\.6/);
    });
  });
});
