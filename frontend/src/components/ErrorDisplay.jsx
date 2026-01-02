import React from 'react'
import './ErrorDisplay.css'

/**
 * ErrorDisplay Component
 *
 * Displays error messages prominently with a distinct visual style.
 *
 * Props:
 *   error: string - The error message to display
 *   onDismiss: function - Called when user dismisses the error (optional)
 */
function ErrorDisplay({ error, onDismiss }) {
  if (!error) {
    return null
  }

  return (
    <div className="error-display">
      <div className="error-icon">⚠️</div>
      <div className="error-content">
        <div className="error-label">Error</div>
        <div className="error-message">{error}</div>
      </div>
      {onDismiss && (
        <button className="error-dismiss" onClick={onDismiss} aria-label="Dismiss error">
          ✕
        </button>
      )}
    </div>
  )
}

export default ErrorDisplay
