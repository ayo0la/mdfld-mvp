# MDFLD MVP

## Overview
MDFLD is a modern football marketplace MVP built with Next.js, TypeScript, Tailwind CSS, and AWS Amplify. It features a perpetual AI-powered search bar, secure authentication, Stripe payments, and a modular, scalable architecture.

## Features
- Perpetual AI search bar with animated suggestions
- Modular, feature-based folder structure
- Secure authentication (Amplify Auth)
- Stripe & PayPal payments (PCI-SAQ A compliant)
- WCAG 2.1 AA accessibility & dark mode
- Jest unit tests & Cypress E2E tests
- Sentry error monitoring & analytics

## Local Setup
1. **Clone the repo:**
   ```bash
   git clone <your-repo-url>
   cd mdfld-mvp
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in the required values:
     - `NEXT_PUBLIC_AMPLIFY_REGION`
     - `NEXT_PUBLIC_AMPLIFY_USER_POOL_ID`
     - `NEXT_PUBLIC_AMPLIFY_WEB_CLIENT_ID`
     - `STRIPE_PUBLIC_KEY`
     - `SENTRY_DSN`
     - ...etc.
4. **Run the dev server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Test Commands
- **Unit tests:**
  ```bash
  npm run test
  ```
- **E2E tests:**
  ```bash
  npx cypress open
  ```
- **Lint & format:**
  ```bash
  npm run lint
  ```

## Project Structure
- `/src/components` — Shared UI components
- `/src/pages` — Next.js routes
- `/src/lib` — Integrations (Amplify, Stripe, etc.)
- `/src/features` — Feature modules (if >3 screens)
- `/src/hooks` — Custom React hooks
- `/src/styles` — Tailwind config & global CSS
- `/src/tests` — Jest & Cypress tests

## Contributing
- Follow the [mdfld-mvp-rules](.cursor/rules/mdfld-mvp-rules.mdc) for code style, security, and architecture.
- Use feature branches off `develop`.
- All PRs require passing tests, lint, and type checks.

## License
MIT 