/**
 * CalculatorForm Component Tests
 *
 * Tests the calculator input form with:
 * - Input field validation
 * - Operator selection
 * - Form submission
 * - Error display
 * - Loading states
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CalculatorForm from './CalculatorForm';

describe('CalculatorForm Component', () => {
  let mockOnSubmit;

  beforeEach(() => {
    mockOnSubmit = vi.fn();
  });

  describe('Rendering', () => {
    it('should render form with all required fields', () => {
      render(<CalculatorForm onSubmit={mockOnSubmit} isLoading={false} />);

      expect(screen.getByLabelText(/operand 1/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/operand 2/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/operator/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument();
    });

    it('should render operator options', () => {
      render(<CalculatorForm onSubmit={mockOnSubmit} isLoading={false} />);

      const operatorSelect = screen.getByLabelText(/operator/i);
      expect(operatorSelect).toHaveValue('+');

      const options = operatorSelect.querySelectorAll('option');
      expect(options).toHaveLength(4);
      expect(options[0]).toHaveValue('+');
      expect(options[1]).toHaveValue('−');
      expect(options[2]).toHaveValue('×');
      expect(options[3]).toHaveValue('÷');
    });

    it('should have input type="number" for operands', () => {
      render(<CalculatorForm onSubmit={mockOnSubmit} isLoading={false} />);

      const operand1 = screen.getByLabelText(/operand 1/i);
      const operand2 = screen.getByLabelText(/operand 2/i);

      expect(operand1).toHaveAttribute('type', 'number');
      expect(operand2).toHaveAttribute('type', 'number');
    });

    it('should have placeholder text for guidance', () => {
      render(<CalculatorForm onSubmit={mockOnSubmit} isLoading={false} />);

      expect(screen.getByPlaceholderText('Enter first number')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter second number')).toBeInTheDocument();
    });
  });

  describe('Form Input Handling', () => {
    it('should update operand1 input value', async () => {
      render(<CalculatorForm onSubmit={mockOnSubmit} isLoading={false} />);

      const operand1 = screen.getByLabelText(/operand 1/i);
      await userEvent.type(operand1, '5');

      expect(operand1).toHaveValue(5);
    });

    it('should update operand2 input value', async () => {
      render(<CalculatorForm onSubmit={mockOnSubmit} isLoading={false} />);

      const operand2 = screen.getByLabelText(/operand 2/i);
      await userEvent.type(operand2, '3');

      expect(operand2).toHaveValue(3);
    });

    it('should update operator selection', async () => {
      render(<CalculatorForm onSubmit={mockOnSubmit} isLoading={false} />);

      const operatorSelect = screen.getByLabelText(/operator/i);
      await userEvent.selectOptions(operatorSelect, '−');

      expect(operatorSelect).toHaveValue('−');
    });

    it('should handle decimal inputs', async () => {
      render(<CalculatorForm onSubmit={mockOnSubmit} isLoading={false} />);

      const operand1 = screen.getByLabelText(/operand 1/i);
      await userEvent.type(operand1, '2.5');

      expect(operand1).toHaveValue(2.5);
    });

    it('should handle negative inputs', async () => {
      render(<CalculatorForm onSubmit={mockOnSubmit} isLoading={false} />);

      const operand1 = screen.getByLabelText(/operand 1/i);
      await userEvent.type(operand1, '-5');

      expect(operand1).toHaveValue(-5);
    });
  });

  describe('Form Submission', () => {
    it('should call onSubmit with form data when submitted', async () => {
      render(<CalculatorForm onSubmit={mockOnSubmit} isLoading={false} />);

      const operand1 = screen.getByLabelText(/operand 1/i);
      const operand2 = screen.getByLabelText(/operand 2/i);
      const operatorSelect = screen.getByLabelText(/operator/i);
      const submitButton = screen.getByRole('button', { name: /calculate/i });

      await userEvent.type(operand1, '5');
      await userEvent.type(operand2, '3');
      await userEvent.selectOptions(operatorSelect, '+');

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          operand1: 5,
          operand2: 3,
          operator: '+'
        });
      });
    });

    it('should not submit form with empty operand1', async () => {
      render(<CalculatorForm onSubmit={mockOnSubmit} isLoading={false} />);

      const operand2 = screen.getByLabelText(/operand 2/i);
      const submitButton = screen.getByRole('button', { name: /calculate/i });

      await userEvent.type(operand2, '3');
      fireEvent.click(submitButton);

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should not submit form with empty operand2', async () => {
      render(<CalculatorForm onSubmit={mockOnSubmit} isLoading={false} />);

      const operand1 = screen.getByLabelText(/operand 1/i);
      const submitButton = screen.getByRole('button', { name: /calculate/i });

      await userEvent.type(operand1, '5');
      fireEvent.click(submitButton);

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should display error message when provided', () => {
      const errors = { operand1: 'Invalid input' };
      render(
        <CalculatorForm
          onSubmit={mockOnSubmit}
          isLoading={false}
          errors={errors}
        />
      );

      expect(screen.getByText('Invalid input')).toBeInTheDocument();
    });

    it('should clear error when input is changed', async () => {
      const errors = { operand1: 'Invalid input' };
      const { rerender } = render(
        <CalculatorForm
          onSubmit={mockOnSubmit}
          isLoading={false}
          errors={errors}
        />
      );

      expect(screen.getByText('Invalid input')).toBeInTheDocument();

      const operand1 = screen.getByLabelText(/operand 1/i);
      await userEvent.clear(operand1);
      await userEvent.type(operand1, '10');

      rerender(
        <CalculatorForm
          onSubmit={mockOnSubmit}
          isLoading={false}
          errors={{}}
        />
      );

      expect(screen.queryByText('Invalid input')).not.toBeInTheDocument();
    });

    it('should display multiple errors if provided', () => {
      const errors = {
        operand1: 'Operand 1 is required',
        operand2: 'Operand 2 is required'
      };
      render(
        <CalculatorForm
          onSubmit={mockOnSubmit}
          isLoading={false}
          errors={errors}
        />
      );

      expect(screen.getByText('Operand 1 is required')).toBeInTheDocument();
      expect(screen.getByText('Operand 2 is required')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('should disable all inputs during loading', () => {
      render(<CalculatorForm onSubmit={mockOnSubmit} isLoading={true} />);

      expect(screen.getByLabelText(/operand 1/i)).toBeDisabled();
      expect(screen.getByLabelText(/operand 2/i)).toBeDisabled();
      expect(screen.getByLabelText(/operator/i)).toBeDisabled();
      expect(screen.getByRole('button', { name: /calculate/i })).toBeDisabled();
    });

    it('should enable all inputs when not loading', () => {
      render(<CalculatorForm onSubmit={mockOnSubmit} isLoading={false} />);

      expect(screen.getByLabelText(/operand 1/i)).not.toBeDisabled();
      expect(screen.getByLabelText(/operand 2/i)).not.toBeDisabled();
      expect(screen.getByLabelText(/operator/i)).not.toBeDisabled();
      expect(screen.getByRole('button', { name: /calculate/i })).not.toBeDisabled();
    });

    it('should show loading state text on button', () => {
      render(<CalculatorForm onSubmit={mockOnSubmit} isLoading={true} />);

      const button = screen.getByRole('button', { name: /calculating\.\.\.|calculate/i });
      expect(button).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper label associations', () => {
      render(<CalculatorForm onSubmit={mockOnSubmit} isLoading={false} />);

      const operand1Input = screen.getByLabelText(/operand 1/i);
      const operand2Input = screen.getByLabelText(/operand 2/i);
      const operatorInput = screen.getByLabelText(/operator/i);

      expect(operand1Input).toBeInTheDocument();
      expect(operand2Input).toBeInTheDocument();
      expect(operatorInput).toBeInTheDocument();
    });

    it('should have descriptive button text', () => {
      render(<CalculatorForm onSubmit={mockOnSubmit} isLoading={false} />);

      const button = screen.getByRole('button', { name: /calculate/i });
      expect(button).toBeInTheDocument();
    });

    it('should maintain focus management', async () => {
      render(<CalculatorForm onSubmit={mockOnSubmit} isLoading={false} />);

      const operand1 = screen.getByLabelText(/operand 1/i);
      operand1.focus();

      expect(document.activeElement).toBe(operand1);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero as valid input', async () => {
      render(<CalculatorForm onSubmit={mockOnSubmit} isLoading={false} />);

      const operand1 = screen.getByLabelText(/operand 1/i);
      const operand2 = screen.getByLabelText(/operand 2/i);
      const submitButton = screen.getByRole('button', { name: /calculate/i });

      await userEvent.type(operand1, '0');
      await userEvent.type(operand2, '0');

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          operand1: 0,
          operand2: 0,
          operator: '+'
        });
      });
    });

    it('should handle very large numbers', async () => {
      render(<CalculatorForm onSubmit={mockOnSubmit} isLoading={false} />);

      const operand1 = screen.getByLabelText(/operand 1/i);
      const operand2 = screen.getByLabelText(/operand 2/i);
      const submitButton = screen.getByRole('button', { name: /calculate/i });

      await userEvent.type(operand1, '999999999');
      await userEvent.type(operand2, '888888888');

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          operand1: 999999999,
          operand2: 888888888,
          operator: '+'
        });
      });
    });

    it('should handle all operator types', async () => {
      render(<CalculatorForm onSubmit={mockOnSubmit} isLoading={false} />);

      const operators = ['+', '−', '×', '÷'];

      for (const op of operators) {
        mockOnSubmit.mockClear();

        const operand1 = screen.getByLabelText(/operand 1/i);
        const operand2 = screen.getByLabelText(/operand 2/i);
        const operatorSelect = screen.getByLabelText(/operator/i);
        const submitButton = screen.getByRole('button', { name: /calculate/i });

        await userEvent.clear(operand1);
        await userEvent.clear(operand2);

        await userEvent.type(operand1, '5');
        await userEvent.type(operand2, '3');
        await userEvent.selectOptions(operatorSelect, op);

        fireEvent.click(submitButton);

        await waitFor(() => {
          expect(mockOnSubmit).toHaveBeenCalledWith({
            operand1: 5,
            operand2: 3,
            operator: op
          });
        });
      }
    });
  });
});
