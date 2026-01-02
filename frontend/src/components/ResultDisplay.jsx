import React from 'react'
import { formatNumber } from '../utils/validation'
import './ResultDisplay.css'

/**
 * ResultDisplay Component
 *
 * Displays the calculation result prominently.
 *
 * Props:
 *   result: number - The result to display
 *   operand1: number - First operand (for context)
 *   operand2: number - Second operand (for context)
 *   operator: string - Operator used
 */
function ResultDisplay({ result, operand1, operand2, operator }) {
  if (result === null || result === undefined) {
    return null
  }

  return (
    <div className="result-display">
      <div className="result-label">Result</div>
      <div className="result-value">{formatNumber(result)}</div>
      <div className="result-calculation">
        {formatNumber(operand1)} {operator} {formatNumber(operand2)} = {formatNumber(result)}
      </div>
    </div>
  )
}

export default ResultDisplay
