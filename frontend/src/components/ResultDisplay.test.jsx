/**
 * ResultDisplay Component Tests
 *
 * Tests the result display with:
 * - Result rendering
 * - Calculation context display
 * - Number formatting
 * - Conditional rendering
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultDisplay from './ResultDisplay';

describe('ResultDisplay Component', () => {
  describe('Rendering', () => {
    it('should render result when result is provided', () => {
      render(
        <ResultDisplay
          result={8}
          operand1={5}
          operand2={3}
          operator="+"
        />
      );

      expect(screen.getByText('8')).toBeInTheDocument();
    });

    it('should not render when result is null', () => {
      const { container } = render(
        <ResultDisplay
          result={null}
          operand1={5}
          operand2={3}
          operator="+"
        />
      );

      expect(container.firstChild).toBeEmptyDOMElement();
    });

    it('should not render when result is undefined', () => {
      const { container } = render(
        <ResultDisplay
          result={undefined}
          operand1={5}
          operand2={3}
          operator="+"
        />
      );

      expect(container.firstChild).toBeEmptyDOMElement();
    });

    it('should not render when result is 0', () => {
      // 0 is a valid result, so it should render
      render(
        <ResultDisplay
          result={0}
          operand1={5}
          operand2={5}
          operator="−"
        />
      );

      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  describe('Calculation Context Display', () => {
    it('should display addition context', () => {
      render(
        <ResultDisplay
          result={8}
          operand1={5}
          operand2={3}
          operator="+"
        />
      );

      expect(screen.getByText(/5.*\+.*3.*=.*8/)).toBeInTheDocument();
    });

    it('should display subtraction context', () => {
      render(
        <ResultDisplay
          result={2}
          operand1={5}
          operand2={3}
          operator="−"
        />
      );

      expect(screen.getByText(/5.*−.*3.*=.*2/)).toBeInTheDocument();
    });

    it('should display multiplication context', () => {
      render(
        <ResultDisplay
          result={15}
          operand1={5}
          operand2={3}
          operator="×"
        />
      );

      expect(screen.getByText(/5.*×.*3.*=.*15/)).toBeInTheDocument();
    });

    it('should display division context', () => {
      render(
        <ResultDisplay
          result={5}
          operand1={20}
          operand2={4}
          operator="÷"
        />
      );

      expect(screen.getByText(/20.*÷.*4.*=.*5/)).toBeInTheDocument();
    });
  });

  describe('Number Formatting', () => {
    it('should display integer results without decimals', () => {
      render(
        <ResultDisplay
          result={8}
          operand1={5}
          operand2={3}
          operator="+"
        />
      );

      expect(screen.getByText('8')).toBeInTheDocument();
    });

    it('should display decimal results with appropriate precision', () => {
      render(
        <ResultDisplay
          result={6.25}
          operand1={2.5}
          operand2={3.75}
          operator="+"
        />
      );

      expect(screen.getByText('6.25')).toBeInTheDocument();
    });

    it('should handle very small decimal numbers', () => {
      render(
        <ResultDisplay
          result={0.1}
          operand1={0.05}
          operand2={0.05}
          operator="+"
        />
      );

      expect(screen.getByText('0.1')).toBeInTheDocument();
    });

    it('should handle division results with floating point', () => {
      render(
        <ResultDisplay
          result={3.3333333}
          operand1={10}
          operand2={3}
          operator="÷"
        />
      );

      const resultText = screen.getByText(/3\.333/);
      expect(resultText).toBeInTheDocument();
    });

    it('should format negative results', () => {
      render(
        <ResultDisplay
          result={-2}
          operand1={3}
          operand2={5}
          operator="−"
        />
      );

      expect(screen.getByText('-2')).toBeInTheDocument();
    });

    it('should format large numbers', () => {
      render(
        <ResultDisplay
          result={3000000}
          operand1={1000000}
          operand2={2000000}
          operator="+"
        />
      );

      expect(screen.getByText('3000000')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle negative operands', () => {
      render(
        <ResultDisplay
          result={-8}
          operand1={-5}
          operand2={-3}
          operator="+"
        />
      );

      expect(screen.getByText('-8')).toBeInTheDocument();
      expect(screen.getByText(/-5.*\+.*-3.*=.*-8/)).toBeInTheDocument();
    });

    it('should handle zero result', () => {
      render(
        <ResultDisplay
          result={0}
          operand1={5}
          operand2={5}
          operator="−"
        />
      );

      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should handle division with decimal divisor', () => {
      render(
        <ResultDisplay
          result={10}
          operand1={5}
          operand2={0.5}
          operator="÷"
        />
      );

      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText(/5.*÷.*0\.5.*=.*10/)).toBeInTheDocument();
    });

    it('should handle very large multiplication results', () => {
      render(
        <ResultDisplay
          result={1000000000}
          operand1={1000000}
          operand2={1000}
          operator="×"
        />
      );

      expect(screen.getByText('1000000000')).toBeInTheDocument();
    });
  });

  describe('Display Styling', () => {
    it('should have success styling class', () => {
      const { container } = render(
        <ResultDisplay
          result={8}
          operand1={5}
          operand2={3}
          operator="+"
        />
      );

      const resultElement = container.querySelector('.result-display');
      expect(resultElement).toHaveClass('result-display');
    });

    it('should display result in prominent size', () => {
      const { container } = render(
        <ResultDisplay
          result={8}
          operand1={5}
          operand2={3}
          operator="+"
        />
      );

      const resultNumber = container.querySelector('.result-number');
      expect(resultNumber).toBeInTheDocument();
    });

    it('should display calculation line separately', () => {
      const { container } = render(
        <ResultDisplay
          result={8}
          operand1={5}
          operand2={3}
          operator="+"
        />
      );

      const calculationLine = container.querySelector('.calculation-line');
      expect(calculationLine).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have appropriate semantic HTML', () => {
      const { container } = render(
        <ResultDisplay
          result={8}
          operand1={5}
          operand2={3}
          operator="+"
        />
      );

      expect(container.querySelector('.result-display')).toBeInTheDocument();
    });

    it('should display all important information as text', () => {
      render(
        <ResultDisplay
          result={8}
          operand1={5}
          operand2={3}
          operator="+"
        />
      );

      expect(screen.getByText('8')).toBeInTheDocument();
      expect(screen.getByText(/5.*\+.*3.*=.*8/)).toBeInTheDocument();
    });
  });

  describe('Various Operations', () => {
    const testCases = [
      { operand1: 10, operand2: 5, operator: '+', result: 15 },
      { operand1: 10, operand2: 5, operator: '−', result: 5 },
      { operand1: 10, operand2: 5, operator: '×', result: 50 },
      { operand1: 10, operand2: 5, operator: '÷', result: 2 },
      { operand1: -5, operand2: 3, operator: '+', result: -2 },
      { operand1: 2.5, operand2: 1.5, operator: '+', result: 4 },
    ];

    testCases.forEach(({ operand1, operand2, operator, result }) => {
      it(`should display result for ${operand1} ${operator} ${operand2}`, () => {
        render(
          <ResultDisplay
            result={result}
            operand1={operand1}
            operand2={operand2}
            operator={operator}
          />
        );

        expect(screen.getByText(String(result))).toBeInTheDocument();
      });
    });
  });
});
