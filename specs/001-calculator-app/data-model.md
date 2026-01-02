# Data Model: Web-Based Calculator Application

**Feature**: 001-calculator-app | **Date**: 2026-01-02

## Entities

### Calculation Request

Represents a user's calculation request sent from frontend to backend.

**Fields**:
- `operand1` (number): First operand in the calculation
  - Type: float (supports decimals and negatives)
  - Validation: Must be numeric, cannot be empty
  - Example: `5`, `2.5`, `-10`

- `operand2` (number): Second operand in the calculation
  - Type: float (supports decimals and negatives)
  - Validation: Must be numeric, cannot be empty
  - Example: `3`, `3.75`, `-2`

- `operator` (string): Arithmetic operator
  - Type: string, exactly one character
  - Validation: Must be one of: `+`, `−`, `×`, `÷`
  - Example: `+`, `−`, `×`, `÷`

**Validation Rules**:
```
operand1 is required AND numeric
operand2 is required AND numeric
operator is required AND in ['+', '−', '×', '÷']
```

**Example**:
```json
{
  "operand1": 2.5,
  "operand2": 3.75,
  "operator": "+"
}
```

---

### Calculation Response (Success)

Represents a successful calculation result returned from backend to frontend.

**Fields**:
- `result` (number): The arithmetic result of the calculation
  - Type: float (may include decimals)
  - Example: `6.25`, `4`, `-2`

**Example**:
```json
{
  "result": 6.25
}
```

---

### Calculation Response (Error)

Represents an error condition when calculation cannot be performed.

**Fields**:
- `error` (string): Human-readable error message
  - Examples:
    - "Division by zero is not allowed"
    - "Invalid input: operand1 must be numeric"
    - "Invalid operator. Supported operators are: +, −, ×, ÷"

**Example**:
```json
{
  "error": "Division by zero is not allowed"
}
```

---

## Relationships

Single-request, stateless interaction:
```
User Input (Frontend)
  → Calculation Request
    → Backend API
      → Calculation Response (Success or Error)
        → User Display (Frontend)
```

No persistent relationships or foreign keys required. Each calculation is independent.

---

## Validation Rules (Comprehensive)

### Numeric Validation (Frontend + Backend)

**operand1 and operand2 must satisfy**:
- ✓ Not empty/null
- ✓ Can be parsed as a number (integer or decimal)
- ✓ Can be negative (e.g., `-5`)
- ✓ Can have leading zeros (e.g., `007` treated as `7`)
- ✗ Multiple decimal points (e.g., `1.2.3` rejected)
- ✗ Non-numeric characters except hyphen and decimal point (e.g., `1a2` rejected)
- ✗ Non-printable or special characters

**Accepted formats**:
- Integers: `5`, `-10`, `0`
- Decimals: `2.5`, `3.75`, `-1.5`
- With leading zeros: `007` → `7`

**Rejected formats**:
- Empty: `""`, `null`
- Non-numeric: `abc`, `1a2`, `@#$`
- Multiple decimals: `1.2.3`
- Infinity/NaN: `Infinity`, `NaN` (handled in backend)

### Operator Validation

**operator must satisfy**:
- ✓ Exactly one character
- ✓ One of: `+`, `−`, `×`, `÷`
- ✗ Any other character
- ✗ Empty/null
- ✗ Multiple characters

**Note**: Unicode characters used (minus `−`, multiplication `×`, division `÷`) differ from ASCII equivalents (`-`, `*`, `/`). Frontend must normalize user input (keyboard `-` → `−`) or accept both.

### Division by Zero Validation

**Special case for division**:
- ✓ operand2 = non-zero number
- ✗ operand2 = 0 (exact zero), returns error "Division by zero is not allowed"

**Implementation note**: Use `if operator == '÷' and operand2 == 0:` check in backend.

---

## Error Handling

### Error Response Format

All errors return HTTP 400 Bad Request with JSON body:

```json
{
  "error": "[specific error message]"
}
```

### Error Messages (Exact Wording Required)

| Scenario | Error Message |
|----------|---------------|
| Non-numeric operand | "Invalid input: Please enter numeric values for both operands." |
| Empty operand | "Invalid input: Both operands are required." |
| Invalid operator | "Invalid operator. Supported operators are: +, −, ×, ÷" |
| Division by zero | "Division by zero is not allowed" |
| Multiple decimal points | "Invalid input: Please enter numeric values for both operands." |

---

## State Transitions

No state persistence. Single request/response cycle:

1. **Idle**: Frontend ready for input
2. **Input**: User enters operand1, operand2, operator
3. **Validate**: Frontend validates before sending (optional, for UX)
4. **Send Request**: Frontend sends to backend API
5. **Process**: Backend validates and calculates
6. **Respond**: Backend returns result or error
7. **Display**: Frontend shows result or error message
8. **Ready**: Return to Idle for next calculation

---

## Precision & Limits

### Floating-Point Precision

**Strategy**: Python's native float (IEEE 754 double precision)
- **Precision**: ~15-17 significant decimal digits
- **Known limitation**: 1.1 + 2.2 may return 3.3000000000000003
- **Acceptable**: Per specification assumptions, IEEE 754 precision is acceptable
- **Alternative**: Python's `Decimal` module for exact decimal arithmetic (not required for MVP)

### Number Limits

| Limit | Value | Note |
|-------|-------|------|
| Min positive | ~2.2e-308 | Smallest positive float |
| Max positive | ~1.8e308 | Largest positive float |
| Min negative | -1.8e308 | Most negative float |
| Max negative | ~-2.2e-308 | Closest to zero (negative) |

**Assumption**: Users input numbers within reasonable range (e.g., -10^6 to 10^6).

---

## Contract Summary

**Request/Response Cycle**:
```
POST /api/calculate
Content-Type: application/json

{
  "operand1": <number>,
  "operand2": <number>,
  "operator": <"+" | "−" | "×" | "÷">
}

---

HTTP 200 OK
{
  "result": <number>
}

OR

HTTP 400 Bad Request
{
  "error": "<error message>"
}
```

---

**Validation Responsibility**:
- **Frontend**: Client-side validation for UX responsiveness
- **Backend**: Authoritative validation (always validate, never trust frontend)

**Testing Coverage**:
- Unit tests for each validation rule
- Integration tests for request/response cycle
- Edge case tests (boundary values, precision, special cases)
