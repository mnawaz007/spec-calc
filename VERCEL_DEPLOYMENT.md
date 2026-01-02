# Vercel Deployment Guide

This guide explains how to deploy the Calculator App to Vercel with both frontend and backend in a monorepo structure.

## Architecture Overview

- **Frontend**: React + Vite (deployed as static site)
- **Backend**: Flask (deployed as Vercel Serverless Functions under `/api` routes)
- **Deployment**: Single Vercel project containing both frontend and backend

## Prerequisites

1. **Vercel Account**: Create one at [vercel.com](https://vercel.com)
2. **Git Repository**: Push this project to GitHub (required for Vercel)
3. **Node.js**: Version 16+ installed locally
4. **Python**: Version 3.9+ installed locally (for testing)

## Step 1: Push Code to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: Calculator App ready for Vercel deployment"
git remote add origin https://github.com/YOUR_USERNAME/Calculator-App.git
git branch -M main
git push -u origin main
```

## Step 2: Create Vercel Project

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Select your GitHub repository **Calculator-App**
4. Configure project settings:
   - **Root Directory**: Leave as `.` (root)
   - **Framework Preset**: React (will auto-detect)
   - **Build Command**: Keep default or use the one from `vercel.json`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: Keep default

5. Click **"Deploy"**

## Step 3: Set Environment Variables

After deployment begins, go to **Project Settings** → **Environment Variables**:

### Add these variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `FLASK_ENV` | `production` | Production |
| `CORS_ORIGINS` | `*` | Production |

**Note**: The frontend will automatically use the Vercel domain for the API URL.

## Step 4: Update Frontend Configuration

Edit `frontend/.env.production`:

```env
VITE_API_URL=https://YOUR_PROJECT_NAME.vercel.app/api
VITE_ENV=production
```

Replace `YOUR_PROJECT_NAME` with your actual Vercel project name.

## Step 5: Verify Deployment

Once deployment completes:

1. **Frontend**: Visit `https://YOUR_PROJECT_NAME.vercel.app`
2. **Backend Health Check**: Visit `https://YOUR_PROJECT_NAME.vercel.app/api/health`
   - Should return: `{"status": "healthy"}`
3. **Test Calculation**: Use the calculator UI and verify it works

## Step 6: Deploy Updates

Future deployments are automatic:
- Push changes to `main` branch on GitHub
- Vercel automatically rebuilds and deploys

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

## Troubleshooting

### Issue: API returns 404 or CORS errors

**Solution**: Verify environment variables are set:
```bash
# In Vercel Dashboard, Project Settings → Environment Variables
# Ensure FLASK_ENV=production is set
```

### Issue: Backend errors in logs

**Check logs**:
1. Go to Vercel Dashboard → Your Project
2. Click **"Deployments"**
3. Select latest deployment
4. View **"Functions"** tab for backend logs

### Issue: Frontend can't connect to backend

**Solution**: Ensure `frontend/.env.production` has correct API URL:
```env
VITE_API_URL=https://YOUR_VERCEL_DOMAIN.vercel.app/api
```

### Issue: Build fails with Python errors

**Solution**: Ensure `backend/requirements.txt` is properly formatted:
```bash
# Locally, test requirements installation:
pip install -r backend/requirements.txt
```

## Local Development

For local testing before deployment:

### Start Backend:
```bash
cd backend
python run.py
# Server runs on http://localhost:5000
```

### Start Frontend (new terminal):
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

## Project Structure

```
Calculator-App/
├── api/
│   └── index.py                 # Vercel serverless entry point
├── backend/
│   ├── src/
│   │   ├── api/
│   │   │   └── calculator.py   # API routes
│   │   ├── services/           # Business logic
│   │   └── app.py              # Flask app factory
│   ├── requirements.txt         # Python dependencies
│   └── run.py                   # Local development runner
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── services/           # API client
│   │   └── App.jsx
│   ├── .env.example            # Example env file
│   ├── .env.production         # Production env file
│   ├── package.json
│   └── vite.config.js
├── vercel.json                  # Vercel configuration
└── VERCEL_DEPLOYMENT.md        # This file
```

## Key Files Modified

1. **`vercel.json`**: Vercel build and routing configuration
2. **`api/index.py`**: Serverless Flask handler for Vercel
3. **`backend/requirements.txt`**: Added Werkzeug for serverless support
4. **`backend/src/app.py`**: Updated CORS configuration for production
5. **`frontend/.env.production`**: Production API URL configuration

## Performance & Limits

- **Vercel Free Tier**: Up to 1000 function invocations/month
- **Execution Time**: 10-second limit per request
- **Memory**: 1 GB per function
- **Maximum Payload**: 32 MB request/response size

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Flask Docs**: [flask.palletsprojects.com](https://flask.palletsprojects.com)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev)
