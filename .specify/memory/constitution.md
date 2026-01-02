# Simple Basic Level Calculator Constitution

## Core Principles

### I. Robust Edge Case Handling (NON-NEGOTIABLE)
All calculator operations MUST gracefully handle edge cases without crashing or providing incorrect results. Decimal arithmetic MUST be accurate; division by zero MUST return a clear error; invalid inputs MUST be detected and reported. Negative numbers MUST be fully supported in all operations.

### II. Clear User-Facing Error Messages
Every error state MUST communicate what went wrong and why in plain language. Error messages MUST guide users toward valid input. Examples: "Error: Division by zero is not allowed", "Error: Invalid operator. Supported operators are: +, −, ×, ÷". Errors MUST be distinguishable from valid results.

### III. Input Validation Before Processing
All user input MUST be validated before computation. Numeric validation MUST check for non-numeric characters and reject appropriately. Operator validation MUST check against the supported set (+, −, ×, ÷) and reject unsupported operators. Validation errors MUST be reported immediately.

### IV. Test-Driven Development for Critical Paths
All calculator operations (addition, subtraction, multiplication, division) and all edge case handling MUST have tests written and verified to fail BEFORE implementation begins. Tests MUST exercise both success and error paths. Backend API endpoints MUST have contract tests.

### V. Simplicity and Clarity Over Features
The calculator MUST perform only the four basic operations specified. No additional math functions, history, undo, or advanced features MUST be added. Code MUST be readable and maintainable. UI MUST be minimal and focused—simple form with two number inputs, operator selector, and calculate button.

### VI. Backend-Frontend Separation
Backend (Python Flask) MUST expose a JSON API endpoint for calculation operations. Frontend (React) MUST send requests to the backend and display results. The two services MUST be independently deployable and testable. API contract MUST be documented.

## Edge Case Specification (Mandatory Testing Coverage)

These are non-negotiable and MUST be tested in both backend and integration tests:

- **Decimal Handling**: Addition, subtraction, multiplication, and division with decimal inputs MUST produce accurate results
- **Division by Zero**: Attempting division where divisor is 0 MUST return error (HTTP 400) with message "Division by zero is not allowed"
- **Invalid Numeric Input**: Non-numeric input MUST be rejected at frontend validation and API validation
- **Invalid Operators**: Unsupported operators MUST be rejected with clear message listing supported operators
- **Negative Numbers**: All operations MUST correctly handle negative operands

## Technology Stack

- **Backend**: Python 3.x with Flask framework
- **Frontend**: React with modern JavaScript (ES6+)
- **API Protocol**: JSON over HTTP (REST)
- **Testing**: pytest (backend), Jest/Vitest (frontend)
- **Project Structure**: Separate `backend/` and `frontend/` directories

## Development Workflow

1. **Specification First**: Feature requirements and test cases MUST be documented before code is written
2. **Backend Tests First**: Unit and contract tests for API endpoints MUST be written and fail before implementation
3. **Frontend Tests First**: Component tests for UI MUST be written and fail before implementation
4. **Implementation**: Code MUST implement only what is specified; no scope creep
5. **Integration Testing**: Full end-to-end flows (user enters data → backend calculates → frontend displays result) MUST be tested

## Governance

Constitution supersedes all other practices. All feature work and code changes MUST comply with the six core principles. Edge case tests are mandatory—no edge case is considered "handled" until it has an automated test. API contract MUST remain stable across backend and frontend. Amendments to this constitution require documentation of the rationale and impact on all specifications.

**Version**: 1.0.0 | **Ratified**: 2026-01-02 | **Last Amended**: 2026-01-02
