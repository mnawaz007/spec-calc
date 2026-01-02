import React, { useState, useEffect } from 'react'
import CalculatorForm from './components/CalculatorForm'
import ResultDisplay from './components/ResultDisplay'
import ErrorDisplay from './components/ErrorDisplay'
import { calculateAPI, checkAPIHealth } from './services/api'
import './App.css'

/**
 * Main Calculator Application Component
 *
 * Orchestrates:
 * - CalculatorForm: Input form for user interactions
 * - ResultDisplay: Display calculation results
 * - ErrorDisplay: Display error messages
 * - API communication with backend
 */
function App() {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isAPIHealthy, setIsAPIHealthy] = useState(false)
  const [formData, setFormData] = useState({
    operand1: null,
    operand2: null,
    operator: null,
  })

  // Check if API is reachable on mount
  useEffect(() => {
    checkAPIHealth().then((isHealthy) => {
      setIsAPIHealthy(isHealthy)
      if (!isHealthy) {
        setError('Backend server is not responding. Is it running on http://localhost:5000?')
      }
    })
  }, [])

  const handleFormSubmit = async (operand1, operand2, operator) => {
    // Clear previous result
    setResult(null)
    setError(null)
    setIsLoading(true)

    // Store form data for display
    setFormData({
      operand1: parseFloat(operand1),
      operand2: parseFloat(operand2),
      operator,
    })

    // Call API
    const response = await calculateAPI(operand1, operand2, operator)

    setIsLoading(false)

    if (response.error) {
      setError(response.error)
    } else if (response.result !== undefined) {
      setResult(response.result)
    } else {
      setError('Unexpected response from server')
    }
  }

  const handleDismissError = () => {
    setError(null)
  }

  return (
    <div className="app">
      <header>
        <h1>Calculator</h1>
        <p className="subtitle">Simple arithmetic operations</p>
        {!isAPIHealthy && <p className="api-warning">⚠️ Backend not responding</p>}
      </header>
      <main>
        <CalculatorForm onSubmit={handleFormSubmit} isLoading={isLoading} />

        {result !== null && (
          <ResultDisplay
            result={result}
            operand1={formData.operand1}
            operand2={formData.operand2}
            operator={formData.operator}
          />
        )}

        {error && <ErrorDisplay error={error} onDismiss={handleDismissError} />}
      </main>
    </div>
  )
}

export default App
