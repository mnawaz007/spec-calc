import React, { useState } from 'react'
import { validateCalculationForm } from '../utils/validation'
import './CalculatorForm.css'

/**
 * CalculatorForm Component
 *
 * Renders the input form for calculator operations.
 * Includes two number inputs, operator selector, and calculate button.
 *
 * Props:
 *   onSubmit: function(operand1, operand2, operator) - Called when form is submitted
 *   isLoading: boolean - Whether API call is in progress
 */
function CalculatorForm({ onSubmit, isLoading = false }) {
  const [operand1, setOperand1] = useState('')
  const [operand2, setOperand2] = useState('')
  const [operator, setOperator] = useState('+')
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    const { isValid, errors: validationErrors } = validateCalculationForm({
      operand1,
      operand2,
      operator,
    })

    if (!isValid) {
      setErrors(validationErrors)
      return
    }

    // Clear errors and submit
    setErrors({})
    onSubmit(operand1, operand2, operator)
  }

  const handleOperand1Change = (e) => {
    setOperand1(e.target.value)
    if (errors.operand1) {
      setErrors({ ...errors, operand1: undefined })
    }
  }

  const handleOperand2Change = (e) => {
    setOperand2(e.target.value)
    if (errors.operand2) {
      setErrors({ ...errors, operand2: undefined })
    }
  }

  const handleOperatorChange = (e) => {
    setOperator(e.target.value)
    if (errors.operator) {
      setErrors({ ...errors, operator: undefined })
    }
  }

  return (
    <form className="calculator-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="operand1">First Number</label>
        <input
          id="operand1"
          type="text"
          value={operand1}
          onChange={handleOperand1Change}
          placeholder="Enter number"
          disabled={isLoading}
          className={errors.operand1 ? 'input-error' : ''}
        />
        {errors.operand1 && <span className="error-message">{errors.operand1}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="operator">Operation</label>
        <select
          id="operator"
          value={operator}
          onChange={handleOperatorChange}
          disabled={isLoading}
          className={errors.operator ? 'input-error' : ''}
        >
          <option value="+">+ (Addition)</option>
          <option value="−">− (Subtraction)</option>
          <option value="×">× (Multiplication)</option>
          <option value="÷">÷ (Division)</option>
        </select>
        {errors.operator && <span className="error-message">{errors.operator}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="operand2">Second Number</label>
        <input
          id="operand2"
          type="text"
          value={operand2}
          onChange={handleOperand2Change}
          placeholder="Enter number"
          disabled={isLoading}
          className={errors.operand2 ? 'input-error' : ''}
        />
        {errors.operand2 && <span className="error-message">{errors.operand2}</span>}
      </div>

      <button type="submit" disabled={isLoading} className="submit-button">
        {isLoading ? 'Calculating...' : 'Calculate'}
      </button>
    </form>
  )
}

export default CalculatorForm
