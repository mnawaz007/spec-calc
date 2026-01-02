/**
 * Client-side input validation utilities for the calculator.
 *
 * These functions provide immediate user feedback without API calls.
 * Note: Server-side validation is authoritative and always runs.
 */

/**
 * Validate that a value is a valid number
 *
 * @param {string|number} value - The value to validate
 * @returns {boolean} true if value is a valid number, false otherwise
 *
 * @example
 * validateNumber("5") // true
 * validateNumber("2.5") // true
 * validateNumber("-10") // true
 * validateNumber("abc") // false
 */
export function validateNumber(value) {
  if (value === null || value === undefined || value === '') {
    return false
  }

  // Check if it's a number type
  if (typeof value === 'number') {
    return !isNaN(value) && isFinite(value)
  }

  // Convert to string for regex validation
  const str = String(value).trim()

  // Reject if contains special characters (anything other than digits, minus, dot)
  if (!/^-?\d+(\.\d+)?$/.test(str)) {
    return false
  }

  const num = parseFloat(str)
  return !isNaN(num) && isFinite(num)
}

/**
 * Validate that an operator is supported
 *
 * @param {string} operator - The operator to validate
 * @returns {boolean} true if operator is valid, false otherwise
 *
 * @example
 * validateOperator("+") // true
 * validateOperator("÷") // true
 * validateOperator("%") // false
 */
export function validateOperator(operator) {
  const validOperators = ['+', '−', '×', '÷']
  return validOperators.includes(operator)
}

/**
 * Validate a complete calculation request
 *
 * @param {Object} formData - Object with operand1, operand2, operator
 * @returns {Object} { isValid: boolean, errors: { operand1?, operand2?, operator? } }
 *
 * @example
 * const result = validateCalculationForm({
 *   operand1: "5",
 *   operand2: "3",
 *   operator: "+"
 * })
 * // { isValid: true, errors: {} }
 */
export function validateCalculationForm(formData) {
  const errors = {}

  // Validate operand1
  if (!formData.operand1 && formData.operand1 !== 0) {
    errors.operand1 = 'operand1 is required'
  } else if (!validateNumber(formData.operand1)) {
    errors.operand1 = 'Please enter a valid number'
  }

  // Validate operand2
  if (!formData.operand2 && formData.operand2 !== 0) {
    errors.operand2 = 'operand2 is required'
  } else if (!validateNumber(formData.operand2)) {
    errors.operand2 = 'Please enter a valid number'
  }

  // Validate operator
  if (!formData.operator) {
    errors.operator = 'operator is required'
  } else if (!validateOperator(formData.operator)) {
    errors.operator = 'Please select a valid operator'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Format a number for display
 *
 * Removes unnecessary trailing zeros and limits decimal places
 *
 * @param {number} num - The number to format
 * @param {number} maxDecimals - Maximum decimal places (default: 8)
 * @returns {string} Formatted number string
 *
 * @example
 * formatNumber(3.3000000000000003) // "3.3"
 * formatNumber(6.25) // "6.25"
 * formatNumber(8) // "8"
 */
export function formatNumber(num, maxDecimals = 8) {
  if (typeof num !== 'number' || isNaN(num)) {
    return 'Error'
  }

  // Round to maxDecimals places
  const factor = Math.pow(10, maxDecimals)
  const rounded = Math.round(num * factor) / factor

  // Convert to string and remove trailing zeros
  return rounded.toString()
}
