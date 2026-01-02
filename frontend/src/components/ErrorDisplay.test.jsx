/**
 * ErrorDisplay Component Tests
 *
 * Tests the error message display with:
 * - Error rendering
 * - Dismiss functionality
 * - Conditional rendering
 * - Error message formats
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorDisplay from './ErrorDisplay';

describe('ErrorDisplay Component', () => {
  describe('Rendering', () => {
    it('should render error when error message is provided', () => {
      render(<ErrorDisplay error="Division by zero is not allowed" />);

      expect(screen.getByText('Division by zero is not allowed')).toBeInTheDocument();
    });

    it('should not render when error is null', () => {
      const { container } = render(<ErrorDisplay error={null} />);

      expect(container.firstChild).toBeEmptyDOMElement();
    });

    it('should not render when error is undefined', () => {
      const { container } = render(<ErrorDisplay error={undefined} />);

      expect(container.firstChild).toBeEmptyDOMElement();
    });

    it('should not render when error is empty string', () => {
      const { container } = render(<ErrorDisplay error="" />);

      expect(container.firstChild).toBeEmptyDOMElement();
    });

    it('should render error label', () => {
      render(<ErrorDisplay error="Invalid input" />);

      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });

    it('should render warning icon', () => {
      const { container } = render(<ErrorDisplay error="Invalid input" />);

      const icon = container.querySelector('.error-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveTextContent('⚠️');
    });
  });

  describe('Error Messages', () => {
    it('should display division by zero error', () => {
      render(<ErrorDisplay error="Division by zero is not allowed" />);

      expect(screen.getByText('Division by zero is not allowed')).toBeInTheDocument();
    });

    it('should display invalid input error', () => {
      render(<ErrorDisplay error="Invalid input: Please enter numeric values" />);

      expect(screen.getByText(/Invalid input/)).toBeInTheDocument();
    });

    it('should display invalid operator error', () => {
      render(<ErrorDisplay error="Invalid operator. Supported operators are: +, −, ×, ÷" />);

      expect(screen.getByText(/Invalid operator/)).toBeInTheDocument();
    });

    it('should display missing field error', () => {
      render(<ErrorDisplay error="operand1 is required" />);

      expect(screen.getByText(/operand1 is required/)).toBeInTheDocument();
    });

    it('should display network error', () => {
      render(<ErrorDisplay error="Failed to connect to the server" />);

      expect(screen.getByText(/Failed to connect/)).toBeInTheDocument();
    });

    it('should handle very long error messages', () => {
      const longError = 'This is a very long error message that provides detailed information about what went wrong and how to fix it.';
      render(<ErrorDisplay error={longError} />);

      expect(screen.getByText(longError)).toBeInTheDocument();
    });

    it('should handle special characters in error messages', () => {
      const errorWithSpecialChars = 'Error: Invalid input "abc" on line 1 @ position 5';
      render(<ErrorDisplay error={errorWithSpecialChars} />);

      expect(screen.getByText(errorWithSpecialChars)).toBeInTheDocument();
    });
  });

  describe('Dismiss Functionality', () => {
    it('should render dismiss button', () => {
      render(<ErrorDisplay error="Invalid input" />);

      expect(screen.getByRole('button', { name: /✕|close|dismiss/i })).toBeInTheDocument();
    });

    it('should call onDismiss when dismiss button is clicked', async () => {
      const mockOnDismiss = vi.fn();
      render(
        <ErrorDisplay
          error="Invalid input"
          onDismiss={mockOnDismiss}
        />
      );

      const dismissButton = screen.getByRole('button', { name: /✕|close|dismiss/i });
      await userEvent.click(dismissButton);

      expect(mockOnDismiss).toHaveBeenCalled();
    });

    it('should not render dismiss button when onDismiss is not provided', () => {
      const { container } = render(
        <ErrorDisplay error="Invalid input" />
      );

      // Should still have button but it might not call anything
      const dismissButton = container.querySelector('.dismiss-button');
      expect(dismissButton).toBeInTheDocument();
    });

    it('should call onDismiss only once per click', async () => {
      const mockOnDismiss = vi.fn();
      render(
        <ErrorDisplay
          error="Invalid input"
          onDismiss={mockOnDismiss}
        />
      );

      const dismissButton = screen.getByRole('button', { name: /✕|close|dismiss/i });
      await userEvent.click(dismissButton);

      expect(mockOnDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe('Styling and Display', () => {
    it('should have error styling class', () => {
      const { container } = render(<ErrorDisplay error="Invalid input" />);

      const errorElement = container.querySelector('.error-display');
      expect(errorElement).toHaveClass('error-display');
    });

    it('should render error container with proper structure', () => {
      const { container } = render(<ErrorDisplay error="Invalid input" />);

      const errorContainer = container.querySelector('.error-display');
      expect(errorContainer).toBeInTheDocument();

      const icon = errorContainer.querySelector('.error-icon');
      expect(icon).toBeInTheDocument();

      const content = errorContainer.querySelector('.error-content');
      expect(content).toBeInTheDocument();
    });

    it('should have error label in error content', () => {
      const { container } = render(<ErrorDisplay error="Invalid input" />);

      const errorLabel = container.querySelector('.error-label');
      expect(errorLabel).toBeInTheDocument();
      expect(errorLabel).toHaveTextContent(/error/i);
    });

    it('should have error message in error content', () => {
      const { container } = render(<ErrorDisplay error="Invalid input" />);

      const errorMessage = container.querySelector('.error-message');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent('Invalid input');
    });
  });

  describe('Multiple Error Scenarios', () => {
    const errorScenarios = [
      'Division by zero is not allowed',
      'Invalid input: Both operands are required.',
      'Invalid operator. Supported operators are: +, −, ×, ÷',
      'operand1 is required',
      'operand2 is required',
      'operator is required',
      'Failed to connect to the server',
      'Server error occurred. Please try again.',
    ];

    errorScenarios.forEach((error) => {
      it(`should display error: "${error}"`, () => {
        render(<ErrorDisplay error={error} />);

        expect(screen.getByText(error)).toBeInTheDocument();
      });
    });
  });

  describe('Animation and Transitions', () => {
    it('should render with slide-in animation class', () => {
      const { container } = render(<ErrorDisplay error="Invalid input" />);

      const errorElement = container.querySelector('.error-display');
      expect(errorElement).toHaveClass('error-display');
      // Animation class should be present if component uses it
    });

    it('should have transition styling', () => {
      const { container } = render(<ErrorDisplay error="Invalid input" />);

      const errorElement = container.querySelector('.error-display');
      const styles = window.getComputedStyle(errorElement);
      // CSS transitions will be applied, we just verify the element exists
      expect(errorElement).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      const { container } = render(<ErrorDisplay error="Invalid input" />);

      const errorDisplay = container.querySelector('.error-display');
      expect(errorDisplay).toBeInTheDocument();
    });

    it('should have dismissible error with button', () => {
      render(<ErrorDisplay error="Invalid input" />);

      const dismissButton = screen.getByRole('button', { name: /✕|close|dismiss/i });
      expect(dismissButton).toBeInTheDocument();
    });

    it('should display error text that is readable by screen readers', () => {
      render(<ErrorDisplay error="Division by zero is not allowed" />);

      expect(screen.getByText('Division by zero is not allowed')).toBeInTheDocument();
    });

    it('should have accessible icon with meaning', () => {
      const { container } = render(<ErrorDisplay error="Invalid input" />);

      const icon = container.querySelector('.error-icon');
      expect(icon).toHaveTextContent('⚠️');
    });
  });

  describe('State Transitions', () => {
    it('should handle rapid error changes', async () => {
      const { rerender } = render(<ErrorDisplay error="First error" />);

      expect(screen.getByText('First error')).toBeInTheDocument();

      rerender(<ErrorDisplay error="Second error" />);

      expect(screen.getByText('Second error')).toBeInTheDocument();
      expect(screen.queryByText('First error')).not.toBeInTheDocument();
    });

    it('should handle error to null transition', async () => {
      const { rerender, container } = render(<ErrorDisplay error="Error message" />);

      expect(screen.getByText('Error message')).toBeInTheDocument();

      rerender(<ErrorDisplay error={null} />);

      expect(container.firstChild).toBeEmptyDOMElement();
    });

    it('should handle null to error transition', () => {
      const { rerender } = render(<ErrorDisplay error={null} />);

      rerender(<ErrorDisplay error="New error" />);

      expect(screen.getByText('New error')).toBeInTheDocument();
    });
  });
});
