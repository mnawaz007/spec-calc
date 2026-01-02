# GitHub Setup Instructions

**Project**: Calculator Web Application
**Status**: ✅ Locally committed and ready for GitHub

---

## Current Git Status

✅ **Local Repository**: Initialized
✅ **Initial Commit**: Created (17f451c)
✅ **Branch**: master
✅ **Staged**: All project files
✅ **Untracked**: Only `.claude/settings.local.json` (local settings, can ignore)

---

## Step 1: Create Repository on GitHub

### Option A: Create on GitHub.com

1. Go to **https://github.com/new**
2. Enter repository name: `calculator-app` (or your preferred name)
3. Description: "Web-based calculator with Flask backend and React frontend"
4. Choose visibility: **Public** (for open source) or **Private** (for private)
5. **DO NOT** initialize with README, .gitignore, or license (we have these locally)
6. Click **Create repository**
7. Copy the HTTPS or SSH URL from the page

### Option B: Using GitHub CLI

```bash
gh repo create calculator-app --public --source=. --remote=origin --push
```

This will create the repo, set remote, and push automatically.

---

## Step 2: Add Remote to Local Repository

If you created the repo on GitHub.com manually (Option A), add the remote:

```bash
cd D:\speckit

# Using HTTPS (simpler, requires password/token each time)
git remote add origin https://github.com/YOUR_USERNAME/calculator-app.git

# OR using SSH (requires SSH key setup)
git remote add origin git@github.com:YOUR_USERNAME/calculator-app.git
```

**Replace `YOUR_USERNAME`** with your actual GitHub username.

---

## Step 3: Rename Branch (Optional)

GitHub defaults to `main`, but we're using `master`. You can either:

### Option A: Rename to main

```bash
git branch -M main
```

### Option B: Keep master (GitHub allows this)

No action needed - just push to master.

---

## Step 4: Push to GitHub

### First Push

```bash
cd D:\speckit
git push -u origin master
```

The `-u` flag sets `master` as the upstream branch for future pushes.

### Subsequent Pushes

```bash
git push
```

---

## Step 5: Verify on GitHub

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/calculator-app`
2. Verify all files are present:
   - ✅ `IMPLEMENTATION_READY.md`
   - ✅ `specs/001-calculator-app/` (with all docs)
   - ✅ `.specify/memory/constitution.md`
   - ✅ `history/prompts/` (with all PHRs)
   - ✅ `README.md` (original project readme)
   - ✅ `.gitignore`

---

## Complete Command Sequence

Copy and paste to set everything up:

### For HTTPS:

```bash
cd D:\speckit
git remote add origin https://github.com/YOUR_USERNAME/calculator-app.git
git push -u origin master
```

### For SSH:

```bash
cd D:\speckit
git remote add origin git@github.com:YOUR_USERNAME/calculator-app.git
git push -u origin master
```

---

## Future Commits

After implementing tasks:

```bash
# Make changes
git add .
git commit -m "feat: implement addition and subtraction operations"
git push
```

---

## Setting Up GitHub Pages (Optional)

If you want to host documentation:

1. Go to repository **Settings** → **Pages**
2. Select branch: `master`
3. Select folder: `/docs` (if you create one)
4. Site will be available at: `https://YOUR_USERNAME.github.io/calculator-app`

---

## Issues & Troubleshooting

### Error: "fatal: 'origin' does not appear to be a 'git' repository"

**Solution**: You haven't added the remote yet. Run:
```bash
git remote add origin https://github.com/YOUR_USERNAME/calculator-app.git
```

### Error: "fatal: could not read from remote repository"

**Solution**:
- For HTTPS: Check your GitHub username and token
- For SSH: Ensure SSH key is configured (see [GitHub SSH setup](https://docs.github.com/en/authentication/connecting-to-github-with-ssh))

### Error: "remote origin already exists"

**Solution**: Remove and re-add:
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/calculator-app.git
```

### Branch Push Rejected

**Solution**: If GitHub defaults to `main`, you can:
1. Push to `main`: `git push -u origin master:main`
2. Or rename your branch: `git branch -M main` then push

---

## Authentication

### For HTTPS (Recommended for Beginners)

GitHub no longer accepts password authentication. Use a **Personal Access Token**:

1. Go to **Settings** → **Developer settings** → **Personal access tokens**
2. Click **Generate new token (classic)**
3. Give it a name: "Calculator App"
4. Check scopes: `repo` (full control of private repositories)
5. Click **Generate token**
6. Copy the token (it won't show again)
7. When prompted for password, paste the token

### For SSH (Recommended for Frequent Use)

[GitHub SSH Setup Guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

---

## What's Committed

✅ **Total Files**: 17 (new/modified)
✅ **Lines Added**: 2,942
✅ **Commit Hash**: 17f451c

### Key Files

- `IMPLEMENTATION_READY.md` — Complete project summary
- `specs/001-calculator-app/spec.md` — Feature specification
- `specs/001-calculator-app/plan.md` — Implementation plan
- `specs/001-calculator-app/tasks.md` — 95-task breakdown
- `specs/001-calculator-app/contracts/calculator-api.yaml` — API contract
- `.specify/memory/constitution.md` — Project constitution
- `history/prompts/` — Prompt history records (PHRs)

---

## Next Steps After GitHub Setup

1. ✅ **GitHub repo created and code pushed**
2. ⏭️ **Create feature branch**: `git checkout -b 001-calculator-app-setup`
3. ⏭️ **Start Phase 1 implementation**: Create backend/frontend directories
4. ⏭️ **Create pull requests** for code review

---

## Example GitHub PR Workflow

```bash
# Create feature branch
git checkout -b 001-calculator-app-phase1

# Make changes (Phase 1 setup)
# ... edit files ...

# Stage and commit
git add .
git commit -m "chore: setup backend and frontend project structure"

# Push to GitHub
git push -u origin 001-calculator-app-phase1

# Create Pull Request on GitHub.com
# ... fill in PR details, link to spec ...
# Request review, merge when ready
```

---

**Setup Status**: ✅ READY
**Next Command**: Run Step 1-4 above to push to GitHub
**Questions**: See [GitHub Documentation](https://docs.github.com/en)
