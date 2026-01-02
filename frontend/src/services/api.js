/**
 * API client for communicating with the calculator backend.
 *
 * Handles HTTP requests to the Flask backend API.
 */

import axios from 'axios'

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Perform a calculation via the API
 *
 * Makes a POST request to /api/calculate with the operands and operator
 *
 * @param {number} operand1 - First operand
 * @param {number} operand2 - Second operand
 * @param {string} operator - Operator (+, −, ×, ÷)
 * @returns {Promise<Object>} Response with result or error
 *   Success: { result: <number> }
 *   Error: { error: <string> }
 *
 * @throws {Error} Network error or server error
 *
 * @example
 * try {
 *   const response = await calculateAPI(5, 3, '+')
 *   console.log(response.result) // 8
 * } catch (error) {
 *   console.error('Calculation failed:', error.message)
 * }
 */
export async function calculateAPI(operand1, operand2, operator) {
  try {
    const response = await apiClient.post('/calculate', {
      operand1: parseFloat(operand1),
      operand2: parseFloat(operand2),
      operator: operator,
    })

    // Check if response has data
    if (response.data) {
      return response.data
    }

    throw new Error('No data returned from server')
  } catch (error) {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const errorData = error.response.data
      if (errorData && errorData.error) {
        return { error: errorData.error }
      }
      return { error: 'Server error: ' + error.response.status }
    } else if (error.request) {
      // Request made but no response
      return { error: 'No response from server. Is it running?' }
    } else {
      // Error in request setup
      return { error: 'Request error: ' + error.message }
    }
  }
}

/**
 * Check if the API server is reachable
 *
 * @returns {Promise<boolean>} true if server is reachable, false otherwise
 *
 * @example
 * const isHealthy = await checkAPIHealth()
 * if (!isHealthy) {
 *   console.warn('Backend server is not responding')
 * }
 */
export async function checkAPIHealth() {
  try {
    const response = await apiClient.get('/health')
    return response.status === 200
  } catch (error) {
    return false
  }
}

/**
 * Get the API base URL
 *
 * @returns {string} The API base URL
 */
export function getAPIURL() {
  return API_URL
}
