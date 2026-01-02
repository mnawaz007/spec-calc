---
description: "Task list for calculator web app implementation"
---

# Tasks: Web-Based Calculator Application

**Input**: Design documents from `/specs/001-calculator-app/`
**Prerequisites**: spec.md, plan.md, data-model.md, contracts/calculator-api.yaml

**Organization**: Tasks are grouped by phase and user story. All user stories are P1 (MVP critical) except UI/UX (P2).

**Testing Approach**: Tests are MANDATORY - write tests first, ensure they fail, then implement.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story/phase (US1, US2, etc.)
- Exact file paths included in descriptions

---

## Phase 1: Setup & Project Initialization

**Purpose**: Initialize both backend and frontend projects with base structure

### Backend Setup

- [ ] T001 Create backend directory structure per plan.md: `backend/src/{app.py, api/, services/, validators/}`, `backend/tests/{unit/, contract/, integration/}`
- [ ] T002 [P] Initialize Python virtual environment: `cd backend && python3 -m venv venv`
- [ ] T003 [P] Create `backend/requirements.txt` with: Flask==2.3.0, Flask-CORS==4.0.0, pytest==7.3.0, pytest-cov==4.1.0
- [ ] T004 [P] Create `backend/run.py` entry point with Flask app initialization
- [ ] T005 Create `backend/src/__init__.py` (empty init file)
- [ ] T006 Create `backend/src/app.py` with Flask app setup, CORS configuration, error handlers

### Frontend Setup

- [ ] T007 [P] Create frontend directory structure per plan.md: `frontend/src/{components/, services/, utils/}`, `frontend/tests/`
- [ ] T008 [P] Initialize Node.js project: `cd frontend && npm init -y`
- [ ] T009 [P] Create `frontend/package.json` with: vite, @vitejs/plugin-react, react, react-dom, axios, vitest, @testing-library/react, @testing-library/jest-dom
- [ ] T010 [P] Create `frontend/vite.config.js` with Vite/React config and dev server port 5173
- [ ] T011 [P] Create `frontend/.env.example` with `VITE_API_URL=http://localhost:5000/api`
- [ ] T012 Create `frontend/src/index.js` React entry point with ReactDOM.createRoot
- [ ] T013 Create `frontend/index.html` with div#root and script src pointing to src/index.js

**Checkpoint**: Both projects have base structure and can start development

---

## Phase 2: Foundational Infrastructure

**Purpose**: Core infrastructure that MUST be complete before any user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Backend Infrastructure

- [ ] T014 [P] Create `backend/src/validators/input_validator.py` with functions: `validate_operand(value)`, `validate_operator(op)` (no implementation yet, only function signatures)
- [ ] T015 [P] Create `backend/src/services/calculator_service.py` with functions: `add()`, `subtract()`, `multiply()`, `divide()` (no implementation yet, only signatures)
- [ ] T016 Create `backend/src/api/calculator.py` with Flask Blueprint for `/api/calculate` endpoint (no implementation yet)
- [ ] T017 Create error handling middleware in `backend/src/app.py` to return consistent JSON error responses with HTTP status codes

### Frontend Infrastructure

- [ ] T018 [P] Create `frontend/src/utils/validation.js` with functions: `validateNumber()`, `validateOperator()` (no implementation yet)
- [ ] T019 [P] Create `frontend/src/services/api.js` with `calculateAPI()` function that sends POST request to backend (no implementation yet)
- [ ] T020 Create `frontend/src/components/CalculatorForm.jsx` component with form structure (no functionality yet)
- [ ] T021 Create `frontend/src/components/ResultDisplay.jsx` component for displaying results
- [ ] T022 Create `frontend/src/components/ErrorDisplay.jsx` component for displaying errors
- [ ] T023 Create `frontend/src/App.jsx` main component that orchestrates form, result, and error displays

### Test Infrastructure

- [ ] T024 [P] Create `backend/tests/__init__.py` (init file)
- [ ] T025 [P] Create `backend/tests/conftest.py` with pytest fixtures: `client` (Flask test client), `app` (Flask app instance)
- [ ] T026 [P] Create `frontend/vitest.config.js` with Vitest configuration and React Testing Library setup
- [ ] T027 [P] Create `frontend/setup.test.js` with test environment setup

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Perform Basic Addition and Subtraction (Priority: P1)

**Goal**: Implement addition (+) and subtraction (−) operations with full test coverage

**Independent Test**: Can be fully tested by entering two numbers, selecting + or −, and verifying result

### Tests for User Story 1 (MUST WRITE FIRST - ENSURE THEY FAIL)

- [ ] T028 [P] [US1] Create `backend/tests/unit/test_calculator_service.py` with test case for addition:
  - Test: `test_add_positive_integers()` → add(5, 3) should equal 8
  - Test: `test_add_negative_integers()` → add(-5, 3) should equal -2
  - Test: `test_add_decimals()` → add(2.5, 3.75) should equal 6.25
  - Ensure tests FAIL before implementation

- [ ] T029 [P] [US1] Create tests in `backend/tests/unit/test_calculator_service.py` for subtraction:
  - Test: `test_subtract_positive_integers()` → subtract(10, 7) should equal 3
  - Test: `test_subtract_negative_integers()` → subtract(-5, 3) should equal -8
  - Test: `test_subtract_decimals()` → subtract(10.5, 2.5) should equal 8
  - Ensure tests FAIL before implementation

- [ ] T030 [P] [US1] Create `backend/tests/contract/test_calculator_api.py` with API contract tests:
  - Test: `test_api_addition_request()` → POST /api/calculate with operand1=5, operand2=3, operator='+' returns HTTP 200 with result=8
  - Test: `test_api_subtraction_request()` → POST /api/calculate with operand1=10, operand2=7, operator='−' returns HTTP 200 with result=3
  - Ensure tests FAIL before implementation

- [ ] T031 [P] [US1] Create `frontend/tests/CalculatorForm.test.jsx` with component tests:
  - Test: `test_form_renders()` → Component renders input fields and button
  - Test: `test_form_handles_addition_input()` → Can enter 5, +, 3, submit
  - Ensure tests FAIL before implementation

### Implementation for User Story 1

- [ ] T032 [US1] Implement `add()` function in `backend/src/services/calculator_service.py`:
  - Accept two numeric parameters
  - Return sum of operands
  - Example: add(5, 3) → 8

- [ ] T033 [US1] Implement `subtract()` function in `backend/src/services/calculator_service.py`:
  - Accept two numeric parameters
  - Return difference of operands
  - Example: subtract(10, 7) → 3

- [ ] T034 [US1] Implement `validate_operand()` in `backend/src/validators/input_validator.py`:
  - Check if value is numeric
  - Return True if valid, False if invalid
  - Handle negative numbers and decimals

- [ ] T035 [US1] Implement POST `/api/calculate` endpoint in `backend/src/api/calculator.py`:
  - Accept JSON body: operand1, operand2, operator
  - Call calculator_service.add() or subtract() based on operator
  - Return JSON response with result field
  - Handle errors (catch exceptions, return 400 with error field)

- [ ] T036 [US1] Implement form submission in `frontend/src/components/CalculatorForm.jsx`:
  - Create input fields for operand1 and operand2
  - Create operator selection dropdown (+, −)
  - Create calculate button
  - On submit: call api.calculateAPI() from api.js
  - Pass results to parent component

- [ ] T037 [US1] Implement `calculateAPI()` in `frontend/src/services/api.js`:
  - Accept operand1, operand2, operator as parameters
  - Send POST request to `${VITE_API_URL}/calculate`
  - Return response or throw error

- [ ] T038 [US1] Implement `App.jsx` to orchestrate US1:
  - Use useState for form data, result, error
  - Render CalculatorForm
  - On form submission: call calculateAPI(), update result or error state
  - Render ResultDisplay if result exists
  - Render ErrorDisplay if error exists

- [ ] T039 [US1] Add logging for addition/subtraction operations in backend

**Checkpoint**: User Story 1 fully functional and independently testable

---

## Phase 4: User Story 2 - Perform Multiplication and Division (Priority: P1)

**Goal**: Implement multiplication (×) and division (÷) operations with full test coverage

**Independent Test**: Can be fully tested by entering numbers with × or ÷ and verifying results

### Tests for User Story 2 (MUST WRITE FIRST - ENSURE THEY FAIL)

- [ ] T040 [P] [US2] Create tests in `backend/tests/unit/test_calculator_service.py` for multiplication:
  - Test: `test_multiply_positive_integers()` → multiply(6, 4) should equal 24
  - Test: `test_multiply_negative_integers()` → multiply(-8, 2) should equal -16
  - Test: `test_multiply_decimals()` → multiply(2.5, 4) should equal 10
  - Ensure tests FAIL before implementation

- [ ] T041 [P] [US2] Create tests in `backend/tests/unit/test_calculator_service.py` for division:
  - Test: `test_divide_positive_integers()` → divide(20, 5) should equal 4
  - Test: `test_divide_negative_integers()` → divide(-10, -2) should equal 5
  - Test: `test_divide_decimals()` → divide(10.5, 2.5) should equal 4.2
  - Ensure tests FAIL before implementation

- [ ] T042 [P] [US2] Create API contract tests in `backend/tests/contract/test_calculator_api.py`:
  - Test: `test_api_multiplication_request()` → POST /api/calculate with ×, returns correct result
  - Test: `test_api_division_request()` → POST /api/calculate with ÷, returns correct result
  - Ensure tests FAIL before implementation

- [ ] T043 [P] [US2] Create component tests in `frontend/tests/CalculatorForm.test.jsx`:
  - Test: `test_form_handles_multiplication_input()` → Can enter 6, ×, 4, submit
  - Test: `test_form_handles_division_input()` → Can enter 20, ÷, 5, submit
  - Ensure tests FAIL before implementation

### Implementation for User Story 2

- [ ] T044 [US2] Implement `multiply()` function in `backend/src/services/calculator_service.py`:
  - Accept two numeric parameters
  - Return product of operands
  - Example: multiply(6, 4) → 24

- [ ] T045 [US2] Implement `divide()` function in `backend/src/services/calculator_service.py`:
  - Accept two numeric parameters
  - Return quotient of operands
  - Example: divide(20, 5) → 4
  - Note: Division by zero check happens in validator (see US4)

- [ ] T046 [US2] Update `validate_operator()` to accept × and ÷:
  - Check if operator is in ['+', '−', '×', '÷']
  - Return True if valid, False otherwise

- [ ] T047 [US2] Update POST `/api/calculate` endpoint to handle multiplication and division:
  - Route operator to correct service function (multiply or divide)
  - Return result or error as before

- [ ] T048 [US2] Update `CalculatorForm.jsx` to include × and ÷ in operator dropdown:
  - Add options for × and ÷

- [ ] T049 [US2] Add logging for multiplication/division operations in backend

**Checkpoint**: User Stories 1 AND 2 fully functional and independently testable

---

## Phase 5: User Story 3 - Handle Decimal Numbers with Accuracy (Priority: P1)

**Goal**: Ensure all operations produce accurate decimal results

**Independent Test**: Can be tested by entering decimal inputs and verifying accuracy across all operations

### Tests for User Story 3 (MUST WRITE FIRST - ENSURE THEY FAIL)

- [ ] T050 [P] [US3] Create comprehensive decimal tests in `backend/tests/unit/test_calculator_service.py`:
  - Test: `test_decimal_precision_addition()` → add(1.1, 2.2) produces accurate result (may be 3.3000... due to IEEE 754, document expectation)
  - Test: `test_decimal_precision_multiplication()` → multiply(2.5, 4) should equal 10
  - Test: `test_decimal_division_precision()` → divide(10.5, 2.5) should equal 4.2
  - Test: `test_very_small_decimals()` → operations with 0.001 magnitude
  - Test: `test_large_decimals()` → operations with 1000.123 magnitude
  - Ensure tests FAIL before implementation

- [ ] T051 [P] [US3] Create API contract tests in `backend/tests/contract/test_calculator_api.py`:
  - Test: `test_api_decimal_addition()` → operands 2.5 and 3.75 with + returns 6.25
  - Test: `test_api_decimal_division()` → operands 10.5 and 2.5 with ÷ returns 4.2
  - Ensure tests FAIL before implementation

- [ ] T052 [US3] Create integration tests in `backend/tests/integration/test_calculator_workflow.py`:
  - Test: `test_multiple_decimal_calculations()` → Series of calculations with decimals maintains accuracy
  - Ensure tests FAIL before implementation

### Implementation for User Story 3

- [ ] T053 [US3] Update `validate_operand()` to accept and parse decimal numbers:
  - Accept strings like "2.5", "3.75", "10.0"
  - Parse to float
  - Reject multiple decimal points like "1.2.3"

- [ ] T054 [US3] Verify all calculator functions handle decimals:
  - Test that add(2.5, 3.75) = 6.25
  - Test that divide(10.5, 2.5) = 4.2
  - No code changes needed if Python's float handles this (it should)

- [ ] T055 [US3] Document floating-point precision limitation in `backend/src/app.py` comment:
  - Note: IEEE 754 precision means 1.1 + 2.2 may return 3.3000000000000003
  - This is acceptable per specification

- [ ] T056 [US3] Update `CalculatorForm.jsx` input type to accept decimals:
  - Change input type if needed to allow decimal entry
  - Frontend validation to prevent multiple decimal points

**Checkpoint**: All operations handle decimals accurately within IEEE 754 limits

---

## Phase 6: User Story 4 - Prevent Division by Zero (Priority: P1)

**Goal**: Detect and gracefully handle division by zero attempts

**Independent Test**: Can be tested by dividing any number by 0 and verifying error message

### Tests for User Story 4 (MUST WRITE FIRST - ENSURE THEY FAIL)

- [ ] T057 [P] [US4] Create division-by-zero tests in `backend/tests/unit/test_calculator_service.py`:
  - Test: `test_divide_by_zero_raises_error()` → divide(10, 0) raises appropriate exception or returns error indicator
  - Test: `test_divide_by_zero_with_negative()` → divide(-5, 0) raises same error
  - Ensure tests FAIL before implementation

- [ ] T058 [P] [US4] Create validator tests in `backend/tests/unit/test_input_validator.py`:
  - Test: `test_validate_division_by_zero()` → validate_division_operands(operand1, operand2, operator) detects zero divisor
  - Ensure test FAILS before implementation

- [ ] T059 [P] [US4] Create API contract tests in `backend/tests/contract/test_calculator_api.py`:
  - Test: `test_api_division_by_zero()` → POST with operand2=0 and operator=÷ returns HTTP 400 with error="Division by zero is not allowed"
  - Ensure test FAILS before implementation

- [ ] T060 [US4] Create frontend error display test in `frontend/tests/ErrorDisplay.test.jsx`:
  - Test: `test_error_display_renders()` → Component displays error message
  - Test: `test_error_message_visible_after_api_error()` → Error displays when API returns error
  - Ensure tests FAIL before implementation

### Implementation for User Story 4

- [ ] T061 [US4] Create `validate_division_operands()` in `backend/src/validators/input_validator.py`:
  - Check if operator is ÷ and operand2 == 0
  - Return error indication if true
  - Return success if operands are valid

- [ ] T062 [US4] Update divide() function to raise exception on zero divisor:
  - Or: Update API endpoint to check before calling divide()
  - Either way: Must prevent actual division by zero

- [ ] T063 [US4] Update POST `/api/calculate` endpoint to handle division-by-zero:
  - Call validate_division_operands() before calling divide()
  - If validation fails, return HTTP 400 with error="Division by zero is not allowed"

- [ ] T064 [US4] Implement `ErrorDisplay.jsx` component:
  - Render error message prominently
  - Use distinct styling/color from result display
  - Example error text: "Error: Division by zero is not allowed"

- [ ] T065 [US4] Update `App.jsx` to display error when API returns error:
  - Check response for error field
  - Set error state if error field present
  - Clear error state when new calculation begins

- [ ] T066 [US4] Add logging for division-by-zero attempts in backend

**Checkpoint**: Division by zero is prevented with clear error message

---

## Phase 7: User Story 5 - Validate and Reject Invalid Input (Priority: P1)

**Goal**: Detect non-numeric and invalid operator inputs, return clear error messages

**Independent Test**: Can be tested by entering invalid inputs and verifying error messages

### Tests for User Story 5 (MUST WRITE FIRST - ENSURE THEY FAIL)

- [ ] T067 [P] [US5] Create input validation tests in `backend/tests/unit/test_input_validator.py`:
  - Test: `test_reject_non_numeric_operand()` → validate_operand("abc") returns False
  - Test: `test_reject_special_characters()` → validate_operand("1@2") returns False
  - Test: `test_reject_multiple_decimal_points()` → validate_operand("1.2.3") returns False
  - Test: `test_accept_valid_numbers()` → validate_operand("5"), validate_operand("2.5"), validate_operand("-10") all return True
  - Test: `test_reject_invalid_operator()` → validate_operator("%") returns False
  - Test: `test_accept_valid_operators()` → validate_operator("+"), validate_operator("×") etc. return True
  - Ensure tests FAIL before implementation

- [ ] T068 [P] [US5] Create API contract error tests in `backend/tests/contract/test_calculator_api.py`:
  - Test: `test_api_invalid_numeric_input()` → POST with operand1="abc" returns HTTP 400 with error="Invalid input: Please enter numeric values for both operands."
  - Test: `test_api_invalid_operator()` → POST with operator="%" returns HTTP 400 with error="Invalid operator. Supported operators are: +, −, ×, ÷"
  - Test: `test_api_missing_field()` → POST with missing operand1 returns HTTP 400 with error="Invalid input: operand1 is required."
  - Ensure tests FAIL before implementation

- [ ] T069 [P] [US5] Create frontend validation tests in `frontend/tests/validation.test.js`:
  - Test: `test_validate_number()` → validateNumber("abc") returns False, validateNumber("5") returns True
  - Test: `test_validate_operator()` → validateOperator("%") returns False, validateOperator("+") returns True
  - Ensure tests FAIL before implementation

- [ ] T070 [US5] Create frontend component error test in `frontend/tests/CalculatorForm.test.jsx`:
  - Test: `test_form_prevents_non_numeric_input()` → Form rejects or clears non-numeric input
  - Ensure test FAILS before implementation

### Implementation for User Story 5

- [ ] T071 [US5] Implement `validate_operand()` in `backend/src/validators/input_validator.py`:
  - Try to parse input as float
  - Catch exception if parsing fails
  - Return True if valid number, False otherwise
  - Handle edge cases: empty string, None, multiple decimal points

- [ ] T072 [US5] Implement `validate_operator()` in `backend/src/validators/input_validator.py`:
  - Check if operator is exactly one of: '+', '−', '×', '÷'
  - Return True if valid, False otherwise

- [ ] T073 [US5] Update POST `/api/calculate` endpoint to validate all inputs:
  - Validate operand1 exists and is numeric
  - Validate operand2 exists and is numeric
  - Validate operator is valid
  - Return HTTP 400 with specific error message for each failure case

- [ ] T074 [US5] Implement validation functions in `frontend/src/utils/validation.js`:
  - `validateNumber(value)` → True if numeric, False otherwise
  - `validateOperator(op)` → True if valid operator, False otherwise

- [ ] T075 [US5] Update `CalculatorForm.jsx` to prevent invalid input:
  - Use input type constraints (e.g., type="number" for operands)
  - Or: Call validateNumber() before allowing input
  - Show error if user tries to enter invalid data

- [ ] T076 [US5] Update form submission to validate before API call:
  - Call validateNumber(operand1), validateNumber(operand2), validateOperator(op)
  - Only call API if all validations pass
  - Show frontend error if validation fails (optional, backend validates too)

- [ ] T077 [US5] Add logging for rejected invalid inputs in backend

**Checkpoint**: All invalid inputs are detected and rejected with clear messages

---

## Phase 8: User Story 6 - Use Interface Intuitively (Priority: P2)

**Goal**: Create simple, intuitive calculator UI

**Independent Test**: Can be tested by having new user perform calculation without instructions

### Tests for User Story 6

- [ ] T078 [P] [US6] Create component rendering tests in `frontend/tests/CalculatorForm.test.jsx`:
  - Test: `test_form_has_two_input_fields()` → Component renders two input fields (operand1, operand2)
  - Test: `test_form_has_operator_selector()` → Component renders operator dropdown with all four operators
  - Test: `test_form_has_calculate_button()` → Component has clearly labeled "Calculate" button
  - Test: `test_inputs_are_labeled()` → Input fields have visible labels
  - Ensure tests FAIL before implementation

- [ ] T079 [P] [US6] Create result display test in `frontend/tests/ResultDisplay.test.jsx`:
  - Test: `test_result_displays_prominently()` → Result is shown in large, visible format
  - Test: `test_result_visually_distinct_from_input()` → Result styled differently from input fields
  - Ensure tests FAIL before implementation

### Implementation for User Story 6

- [ ] T080 [US6] Refine `CalculatorForm.jsx` for usability:
  - Add clear labels: "First Number", "Second Number", "Operation", "Result"
  - Use logical layout: inputs in row, operator dropdown clear, calculate button prominent
  - Add placeholder text: "Enter number" for input fields
  - Use standard form styling (spacing, fonts, colors)

- [ ] T081 [US6] Refine `ResultDisplay.jsx` for prominence:
  - Display result in large font (e.g., font-size: 2em)
  - Use distinct background color or box styling
  - Show result clearly separate from form

- [ ] T082 [US6] Refine `ErrorDisplay.jsx` for clarity:
  - Use error color (red) or warning styling
  - Display error message clearly
  - Make error visually distinct from results

- [ ] T083 [US6] Create basic CSS styling in `frontend/src/App.css`:
  - Style form with proper spacing
  - Style result display prominently
  - Style error display with warning color
  - Ensure responsive design (works on small/large screens)

- [ ] T084 [US6] Test usability manually:
  - Open frontend at http://localhost:5173
  - Perform calculation 5 + 3 without instructions
  - Verify result displays
  - Verify next calculation can be performed without issues

**Checkpoint**: UI is simple, intuitive, and usable without instructions

---

## Phase 9: Integration & End-to-End Testing

**Purpose**: Verify complete workflows work across backend and frontend

- [ ] T085 [P] Create `backend/tests/integration/test_calculator_workflow.py` with full workflows:
  - Test: `test_addition_workflow()` → POST /api/calculate for addition, verify result
  - Test: `test_subtraction_workflow()` → POST /api/calculate for subtraction, verify result
  - Test: `test_multiplication_workflow()` → POST /api/calculate for multiplication, verify result
  - Test: `test_division_workflow()` → POST /api/calculate for division, verify result
  - Test: `test_division_by_zero_workflow()` → POST /api/calculate with zero divisor, verify error
  - Test: `test_invalid_input_workflow()` → POST with invalid input, verify error

- [ ] T086 [P] Create end-to-end flow documentation in `backend/tests/integration/test_calculator_workflow.py`:
  - Document: User enters data → Frontend validates → Frontend sends request → Backend validates → Backend calculates → Response returned → Frontend displays

- [ ] T087 Create manual integration test checklist in `specs/001-calculator-app/integration-checklist.md`:
  - [ ] Backend running on http://localhost:5000
  - [ ] Frontend running on http://localhost:5173
  - [ ] 5 + 3 = 8
  - [ ] 10 − 7 = 3
  - [ ] 6 × 4 = 24
  - [ ] 20 ÷ 5 = 4
  - [ ] 2.5 + 3.75 = 6.25
  - [ ] 10 ÷ 0 shows error
  - [ ] Entering "abc" shows error
  - [ ] Selecting "%" shows error

**Checkpoint**: All workflows function end-to-end

---

## Phase 10: Code Quality & Polish

**Purpose**: Final improvements before release

- [ ] T088 [P] Add docstrings to all Python functions in `backend/src/`:
  - Document parameters and return values
  - Add examples where relevant

- [ ] T089 [P] Add comments to complex logic in JavaScript:
  - Document non-obvious code sections
  - Explain error handling approaches

- [ ] T090 [P] Run test coverage reports:
  - `pytest backend/tests/ --cov=backend/src --cov-report=html` (target >90% backend coverage)
  - `npm test --prefix frontend -- --coverage` (target >80% frontend coverage)

- [ ] T091 [P] Clean up unused code and dependencies:
  - Remove any unused imports
  - Remove any commented-out code

- [ ] T092 Create `backend/.gitignore` and `frontend/.gitignore`:
  - Exclude venv/, node_modules/, __pycache__, .pytest_cache, coverage/, dist/, build/

- [ ] T093 Create `README.md` in project root:
  - Link to specs/001-calculator-app/README.md
  - Link to quickstart.md
  - Link to API documentation

- [ ] T094 [P] Run full test suite one final time:
  - `pytest backend/tests/ -v` (all tests PASS)
  - `npm test --prefix frontend` (all tests PASS)

- [ ] T095 Verify app works end-to-end with fresh browser window

**Checkpoint**: Code is clean, tested, and documented

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - can start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 completion - BLOCKS all user stories
- **Phases 3-8 (User Stories)**: All depend on Phase 2 completion
  - Can proceed in parallel (if team capacity allows)
  - Or sequentially in priority order (P1 → P2)
- **Phase 9 (Integration)**: Depends on all user stories completed
- **Phase 10 (Polish)**: Depends on all phases completed

### User Story Dependencies

- **US1 (Addition/Subtraction)**: Can start after Phase 2 - No dependencies on other stories
- **US2 (Multiplication/Division)**: Can start after Phase 2 - May reuse validation from US1
- **US3 (Decimals)**: Can start after Phase 2 - Tests all stories with decimals
- **US4 (Division by Zero)**: Can start after Phase 2 - Extends US2
- **US5 (Invalid Input)**: Can start after Phase 2 - Affects all stories
- **US6 (UI/UX)**: Can start after US1, refines frontend components

### Task Dependencies Within Each Phase

- Tests MUST be written and FAILING before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Integration before polish

---

## Parallel Opportunities

- **Phase 1**: T002, T003, T004, T005 can run in parallel (backend)
  - T007, T008, T009, T010, T011 can run in parallel (frontend)
  - Backend and frontend Phase 1 can be parallel
- **Phase 2**: All [P] tasks can run in parallel
- **Phases 3-8**: Different user stories can be worked in parallel by different developers
- **Phase 10**: All [P] tasks can run in parallel

---

## Testing & Validation

### Must-Pass Criteria

- ✅ All 95 tasks completed
- ✅ All unit tests pass (>90% backend coverage)
- ✅ All contract tests pass (API works as specified)
- ✅ All integration tests pass (full workflows work)
- ✅ All frontend component tests pass (>80% coverage)
- ✅ Manual end-to-end checklist passed
- ✅ No unhandled exceptions
- ✅ All error cases return appropriate messages

### Definition of Done

- [x] Task implemented and tested
- [x] Code reviewed for clarity
- [x] Documentation updated if needed
- [x] Commit created with clear message
- [x] All related tests passing

---

## Notes

- Tests marked [P] = can run in parallel (different files)
- Tests marked [Story] = which story this task belongs to (traceability)
- Each user story should be independently completable and testable
- Stop at any checkpoint to validate story independently
- Document any deviations from this plan with rationale

---

**Created**: 2026-01-02
**Total Tasks**: 95
**Estimated Effort**: ~2-3 weeks for solo developer, ~1 week with 2 developers (parallelization)
**Status**: Ready for implementation (Phase 1 starting)
