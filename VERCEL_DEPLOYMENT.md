# Vercel Deployment Guide

## 🚀 Quick Setup (Recommended)

### 1. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with your GitHub account
3. Click "Import Project"
4. Select your repository: `Bavantha-Senanayake/typefront`
5. Vercel will auto-detect it's a Vite project
6. Click "Deploy"

### 2. Automatic Deployments
- **Push to main branch** → Auto deploys to production
- **Pull requests** → Creates preview deployments
- **Custom domains** → Easy to set up

---

## 🔧 Manual Setup with GitHub Actions

### Required Secrets (Add to GitHub repo settings):
```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

### How to get the secrets:

1. **VERCEL_TOKEN**:
   - Go to Vercel Dashboard → Settings → Tokens
   - Create a new token

2. **VERCEL_ORG_ID**:
   - Run: `vercel link` in your project
   - Or find it in `.vercel/project.json` after linking

3. **VERCEL_PROJECT_ID**:
   - Same as above, in `.vercel/project.json`

### Add to GitHub:
1. Go to your repo → Settings → Secrets and variables → Actions
2. Add each secret above

---

## 📁 Project Structure
```
.github/workflows/deploy.yml  # GitHub Actions workflow
vercel.json                   # Vercel configuration
dist/                        # Build output (auto-generated)
```

## 🎯 Deployment URLs
- **Production**: `https://your-project.vercel.app`
- **Preview**: `https://your-project-git-branch.vercel.app`

## 🔍 Environment Variables
Add any environment variables in Vercel dashboard under Project Settings → Environment Variables.

## 📝 Notes
- The workflow includes linting and building steps
- Tests are optional (currently set to continue on error)
- Deploys automatically on push to main branch
- Preview deployments for all pull requests