# MYAUDIT 🔍
[![Firebase Deploy](https://github.com/Butterdime/MYAUDIT/actions/workflows/firebase-hosting-merge.yml/badge.svg)](https://github.com/Butterdime/MYAUDIT/actions)
[![Live Site](https://img.shields.io/badge/Live-myaudit--tax--2026-blue?logo=firebase)](https://myaudit-tax-2026.web.app)

> **The Forensic Audit & Tax Assistant for Malaysian Entities.** > Automatically parse bank statements, reconcile accounts, and stay LHDN compliant with Gemini-powered AI.

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

This repository contains the MYAUDIT application, an AI-powered assistant for tax auditing.

View your app in AI Studio: https://ai.studio/apps/drive/12FeyDTtQ-MDpP-LQPHbewQhIYNTGWDPj

## 🚀 Deployment
This project is automatically deployed via **GitHub Actions** to **Firebase Hosting**.
- **Production URL:** [https://myaudit-tax-2026.web.app](https://myaudit-tax-2026.web.app)
- **CI/CD Pipeline:** Every merge to the `main` branch triggers a production build using Vite and Tailwind CSS v4.

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key
3. Run the app:
   ```bash
   npm run dev
   ```
