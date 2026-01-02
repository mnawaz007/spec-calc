# Research & Technical Decisions: Web-Based Calculator Application

**Feature**: 001-calculator-app | **Date**: 2026-01-02

## Backend Framework Selection

### Decision: Flask

**Rationale**:
- Lightweight and simple for small API
- Minimal boilerplate for a single endpoint
- Excellent documentation and community support
- CORS support via Flask-CORS extension
- Easy to test with pytest

**Alternatives Considered**:
- FastAPI: More modern, faster, but adds complexity for a simple calculator
- Django: Over-engineered for a stateless API with one endpoint
- Bottle: Too minimal, less community support

**Implementation Strategy**:
- Single Flask app in `src/app.py`
- One route: `POST /api/calculate`
- Error handling middleware for consistent error responses
- CORS enabled to allow frontend requests

---

## Frontend Build Tool Selection

### Decision: Vite

**Rationale**:
- Significantly faster development server than Create React App
- Minimal configuration needed
- Fast Hot Module Replacement (HMR)
- Modern ES modules for cleaner code
- Smaller build output

**Alternatives Considered**:
- Create React App: Slower, more boilerplate, complex eject process
- Webpack: Powerful but requires extensive configuration for simple project
- Parcel: Less mature than Vite for React projects

**Implementation Strategy**:
- Use Vite's React template
- Simple form component using hooks (useState)
- Axios for HTTP client (lightweight alternative to fetch)
- Vitest for unit testing (Vite-native testing)

---

## Testing Strategy

### Backend Testing

**Decision**: pytest with standard fixtures

**Test Categories**:
1. **Unit Tests** - Test `calculator_service.py` functions in isolation
   - Test addition, subtraction, multiplication, division
   - Test decimal precision
   - Test negative numbers
   - Test error conditions

2. **Input Validation Tests** - Test `input_validator.py`
   - Valid numeric inputs
   - Invalid numeric inputs (letters, symbols)
   - Valid operators
   - Invalid operators
   - Division by zero detection

3. **Contract Tests** - Test API endpoint `/api/calculate`
   - Success responses (HTTP 200)
   - Error responses (HTTP 400)
   - Request/response formats
   - CORS headers

4. **Integration Tests** - Test full request/response cycle
   - Valid calculation flow
   - Error handling flow
   - Multiple sequential calculations

**Test File Structure**:
```
backend/tests/
├── unit/
│   ├── test_calculator_service.py
│   └── test_input_validator.py
├── contract/
│   └── test_calculator_api.py
└── integration/
    └── test_calculator_workflow.py
```

### Frontend Testing

**Decision**: Vitest with React Testing Library

**Test Categories**:
1. **Component Tests** - Test React components
   - CalculatorForm renders inputs and button
   - ResultDisplay shows result
   - ErrorDisplay shows error message
   - Form submission works

2. **Integration Tests** - Test component interactions
   - User enters data → form submits
   - Result displays after API response
   - Error displays on API error

3. **Utility Tests** - Test helper functions
   - Client-side validation functions
   - API client error handling

**Test File Structure**:
```
frontend/tests/
├── CalculatorForm.test.jsx
├── ResultDisplay.test.jsx
├── ErrorDisplay.test.jsx
├── api.test.js
└── validation.test.js
```

---

## API Error Handling

### Decision: HTTP 400 for validation errors, HTTP 500 for server errors

**Error Response Format**:
```json
{
  "error": "Human-readable message"
}
```

**Status Code Mapping**:
- `200 OK`: Successful calculation, result returned
- `400 Bad Request`: Validation failed (invalid input, operator, division by zero)
- `500 Internal Server Error`: Unexpected server error

**Error Messages** (exact wording):
- Non-numeric: "Invalid input: Please enter numeric values for both operands."
- Invalid operator: "Invalid operator. Supported operators are: +, −, ×, ÷"
- Division by zero: "Division by zero is not allowed"
- Missing field: "Invalid input: {field_name} is required."

### Implementation Strategy**:
- Create error handler middleware in Flask
- Return consistent JSON format from all endpoints
- Log errors for debugging
- Frontend catches and displays errors to user

---

## Floating-Point Precision Handling

### Decision: Accept IEEE 754 double precision limits

**Rationale**:
- Per specification assumptions, IEEE 754 precision acceptable
- Python's native float provides this precision
- Adding Decimal module adds complexity
- Most user inputs won't hit precision limits (within reasonable range)

**Known Limitation**:
```python
1.1 + 2.2 = 3.3000000000000003  # IEEE 754 artifact
```

**Mitigation Strategy**:
- Round results to reasonable decimal places for display (e.g., 8 significant figures)
- Document this assumption in specification
- If precision becomes critical later, switch to Python's `Decimal` module

### Alternative (Not Selected): Python Decimal Module

**Pros**: Arbitrary precision, exact decimal arithmetic
**Cons**: Slower, more complex, unnecessary for MVP
**Decision**: Revisit if test results show precision issues

---

## Frontend Validation Strategy

### Decision: Dual validation (client + server)

**Client-Side Validation** (UX):
- Reject non-numeric characters in input fields
- Validate operator selection
- Show immediate feedback to user
- Prevent invalid requests

**Server-Side Validation** (Security):
- Always validate request body
- Never trust client-side validation
- Return error if validation fails
- Ensures API works correctly even if frontend is compromised

**Implementation**:
- Frontend: Input type="number" + validation function
- Backend: Validate operands are numeric, operator is valid

---

## CORS Configuration

### Decision: Allow frontend origin only

**Rationale**:
- Security: Only allow requests from frontend domain
- Prevents unauthorized API access
- Simple to configure with Flask-CORS

**Configuration**:
```python
from flask_cors import CORS

# Development
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# Production
CORS(app, resources={r"/api/*": {"origins": "https://calculator.example.com"}})
```

---

## Deployment Strategy

### Backend Deployment

**Development**: Flask dev server on `http://localhost:5000`
**Production**: WSGI server (Gunicorn) + Nginx reverse proxy

### Frontend Deployment

**Development**: Vite dev server on `http://localhost:5173`
**Production**: Build to static files, serve from Nginx or CDN

### Environment Configuration

**Development** (.env):
```
VITE_API_URL=http://localhost:5000/api
FLASK_ENV=development
```

**Production** (.env.production):
```
VITE_API_URL=https://api.calculator.example.com/api
FLASK_ENV=production
```

---

## Development Workflow

### Local Development

1. Start backend: `python backend/run.py`
2. Start frontend: `npm run dev --prefix frontend`
3. Open `http://localhost:5173`
4. Make changes, auto-reload on save
5. Run tests: `pytest` (backend), `npm test` (frontend)

### Testing Before Commit

```bash
# Backend
pytest backend/tests/ -v --cov=backend/src

# Frontend
npm test --prefix frontend -- --coverage
```

### Version Control

- Commit frequently after tests pass
- Branch for features: `001-calculator-app`
- Tag releases: `v1.0.0`

---

## Summary of Technical Decisions

| Component | Decision | Rationale |
|-----------|----------|-----------|
| Backend Framework | Flask | Lightweight, simple, excellent for single API endpoint |
| Frontend Build Tool | Vite | Fast dev server, modern, minimal config |
| Frontend HTTP Client | Axios | Lightweight, promise-based, excellent error handling |
| Testing Backend | pytest | Industry standard, excellent fixtures, community support |
| Testing Frontend | Vitest | Vite-native, fast, modern alternative to Jest |
| Validation | Dual (client + server) | UX responsiveness + security |
| Precision Handling | IEEE 754 float | Adequate for MVP, simplicity |
| CORS Strategy | Whitelist origins | Security best practice |
| Error Format | JSON with error field | Consistent, parseable, user-friendly |

---

## Next Steps

1. ✅ Technical context resolved
2. ✅ Constitution check passed
3. ✅ Data model designed
4. ✅ API contract specified
5. ⏭️ Generate tasks with `/sp.tasks` command
6. ⏭️ Begin implementation with test-first approach

**Created**: 2026-01-02
**Status**: Complete - Ready for Task Generation
