# Quickstart Guide: Web-Based Calculator Application

**Feature**: 001-calculator-app | **Date**: 2026-01-02

This guide walks you through setting up and running the calculator application locally.

## Prerequisites

- **Python 3.10+** installed
- **Node.js 18+** and npm installed
- **Git** for version control
- A code editor (VS Code recommended)

## Project Structure Overview

```
calculator-app/
├── backend/               # Python Flask API
│   ├── src/
│   ├── tests/
│   ├── requirements.txt
│   └── run.py
└── frontend/              # React web UI
    ├── src/
    ├── tests/
    ├── package.json
    └── vite.config.js
```

## Backend Setup (Python Flask)

### 1. Create Python Virtual Environment

```bash
cd backend

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate

# On Windows
python -m venv venv
venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

Expected dependencies:
```
Flask==2.3.0
Flask-CORS==4.0.0
pytest==7.3.0
pytest-cov==4.1.0
```

### 3. Run Backend Server

```bash
python run.py
```

Expected output:
```
* Serving Flask app 'src.app'
* Debug mode: on
* Running on http://localhost:5000
```

The API is now accessible at `http://localhost:5000/api`

### 4. Test Backend API (Optional)

Using curl or Postman:

```bash
curl -X POST http://localhost:5000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "operand1": 5,
    "operand2": 3,
    "operator": "+"
  }'
```

Expected response:
```json
{
  "result": 8
}
```

Test division by zero error:

```bash
curl -X POST http://localhost:5000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "operand1": 10,
    "operand2": 0,
    "operator": "÷"
  }'
```

Expected response:
```json
{
  "error": "Division by zero is not allowed"
}
```

### 5. Run Backend Tests

```bash
pytest tests/ -v

# With coverage report
pytest tests/ --cov=src --cov-report=html
```

## Frontend Setup (React)

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure API Endpoint

Create `.env` file (copy from `.env.example`):

```
VITE_API_URL=http://localhost:5000/api
```

Or for production:
```
VITE_API_URL=https://api.calculator.example.com/api
```

### 3. Run Development Server

```bash
npm run dev
```

Expected output:
```
VITE v4.0.0  ready in XXX ms

➜  Local:   http://localhost:5173/
```

Open `http://localhost:5173` in your browser. You should see the calculator form.

### 4. Test Frontend

```bash
npm test

# With coverage
npm test -- --coverage
```

## First Calculation (End-to-End Test)

With both servers running:

1. Open frontend in browser: `http://localhost:5173`
2. Enter first number: `5`
3. Select operator: `+`
4. Enter second number: `3`
5. Click "Calculate"
6. See result: `8`

## Development Workflow

### Backend Development

1. Implement feature in `backend/src/`
2. Write tests in `backend/tests/`
3. Run `pytest tests/ -v` to verify
4. Backend hot-reloads on file change (Flask debug mode)

### Frontend Development

1. Implement component in `frontend/src/`
2. Write tests in `frontend/tests/`
3. Run `npm test` to verify
4. Frontend hot-reloads on file change (Vite dev server)

### Testing Both Together

1. Ensure backend is running on `http://localhost:5000`
2. Ensure frontend is running on `http://localhost:5173`
3. Perform calculations in the UI
4. Check browser console for errors
5. Check terminal for backend logs

## Troubleshooting

### Backend Issues

**Issue**: `ModuleNotFoundError: No module named 'flask'`
- **Solution**: Ensure virtual environment is activated and `pip install -r requirements.txt` was run

**Issue**: `Address already in use: Port 5000`
- **Solution**: Change port in `run.py` or kill process using port 5000

**Issue**: CORS errors in browser console
- **Solution**: Ensure `Flask-CORS` is installed and configured in `app.py`

### Frontend Issues

**Issue**: `Cannot find module '@vite/client'`
- **Solution**: Delete `node_modules/` and run `npm install` again

**Issue**: API requests return 404
- **Solution**: Verify backend is running on `http://localhost:5000` and `.env` has correct `VITE_API_URL`

**Issue**: Port 5173 already in use
- **Solution**: Change port in `vite.config.js` or kill process using port 5173

## Project Commands Quick Reference

### Backend
```bash
# Activate environment
source backend/venv/bin/activate  # macOS/Linux
backend\venv\Scripts\activate     # Windows

# Run tests
pytest backend/tests/ -v

# Run server
python backend/run.py

# Deactivate environment
deactivate
```

### Frontend
```bash
# Install dependencies
npm install --prefix frontend

# Run dev server
npm run dev --prefix frontend

# Run tests
npm test --prefix frontend

# Build for production
npm run build --prefix frontend
```

## Next Steps

After confirming the setup works:

1. Review the API specification: `specs/001-calculator-app/contracts/calculator-api.yaml`
2. Review the data model: `specs/001-calculator-app/data-model.md`
3. Start implementing features using test-first approach (see `tasks.md` for breakdown)
4. Commit working code regularly

## Documentation Links

- **Specification**: [spec.md](spec.md) - Feature requirements and user stories
- **Implementation Plan**: [plan.md](plan.md) - Architecture and design decisions
- **Data Model**: [data-model.md](data-model.md) - API entities and validation rules
- **API Contract**: [contracts/calculator-api.yaml](contracts/calculator-api.yaml) - OpenAPI specification
- **Tasks**: [tasks.md](tasks.md) - Implementation task breakdown (generated by `/sp.tasks`)

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review error messages in terminal/browser console
3. Verify both servers are running and ports are correct
4. Consult the implementation plan for architectural decisions
