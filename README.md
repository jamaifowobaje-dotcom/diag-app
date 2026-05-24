# DIAG — Onboarding & Dashboard

## Project Overview
DIAG is a multi-step onboarding and dashboard web application. It walks new users through a 6-step setup flow — collecting their account details, profile, workspace, and goals — then displays their data on a personalized dashboard with charts, stats, and a latest signups table.


## Live Demo
Hosted on Railway: [your-railway-url-here]
GitHub Repository: https://github.com/jamaifowobaje-dotcom/diag-app


## Tech Stack
Next.js 16.2.6 — App Router, file-based routing, API route handlers
Tailwind CSS — Utility-first styling throughout
React Context API — Global onboarding state management across steps
Recharts — Revenue, plans, and user distribution charts
Framer Motion — Page entrance animations and dashboard transitions
Plain JavaScript — Application logic. No TypeScript


## Getting Started
```bash
# 1. Clone the repository
git clone https://github.com/jamaifowobaje-dotcom/diag-app.git

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open your browser
http://localhost:3000/onboarding/step-1
```

**Important:** This project uses in-memory storage. Every time you restart the dev server, all registered users are wiped. You will need to complete the onboarding flow again after each restart.


## Onboarding Flow
Step 1 ➔ `/onboarding/step-1` ➔ Email, password
Step 2 ➔ `/onboarding/step-2` ➔ OTP verification (mock)
Step 3 ➔ `/onboarding/step-3` ➔ Name, role, team size
Step 4 ➔ `/onboarding/step-4` ➔ Workspace name
Step 5 ➔ `/onboarding/step-5` ➔ Teammate invite emails (optional)
Step 6 ➔ `/onboarding/step-6` ➔ Primary focus / use case (optional)


## API Endpoints
POST ➔ `/api/auth/register` ➔ Create a new user account
POST ➔ `/api/auth/verify-otp` ➔ Verify 6-digit OTP code
POST ➔ `/api/auth/login` ➔ Authenticate a returning user
PUT ➔ `/api/user/profile` ➔ Save name, role, team size
PUT ➔ `/api/user/workspace` ➔ Save workspace name
POST ➔ `/api/user/invite` ➔ Save invited teammate emails
PUT ➔ `/api/user/focus` ➔ Save chosen focus area
GET ➔ `/api/user/[id]` ➔ Fetch full user profile for dashboard


## Data Flow
User fills form
↓
React Context (OnboardingContext)
holds state across all 6 steps
↓
Each step calls its API route on submit
↓
API route saves data to in-memory store (global._diagStore)
↓
On registration, userId saved to localStorage + cookie
↓
Dashboard mounts → fetches GET /api/user/:id
↓
Real user data displayed in welcome message,
profile dropdown, and latest signups table


## Architectural Decisions
**Next.js API Routes over Express**
The project is a Next.js application. Using the built-in API route handlers meant the frontend and backend live in the same codebase, share the same in-memory store, and deploy together as a single unit. Adding Express would have required a separate server process, separate deployment, and CORS configuration which is an unnecessary complexity.

**JavaScript over TypeScript**
JavaScript is the language I'm most fluent in, so it was the deliberate choice here. Introducing TypeScript which I'm still deepening experience with would have shifted focus away from the core engineering decisions being evaluated. The codebase is structured clearly enough that types would not change its readability. It can be migrated to TypeScript later if needed.

**Railway over Vercel**
Railway was chosen over Vercel specifically because this project uses in-memory storage (`global._diagStore`). Vercel deploys Next.js as serverless functions so each API call may spin up a fresh instance, meaning the in-memory store would not persist across requests. Railway runs the application as a persistent Node.js server, so `global._diagStore` behaves exactly as it does locally. Considering the storage approach, this was the right deployment decision.

**In-memory storage over a database**
The assignment explicitly permits in-memory storage. Considering the timeframe, using a database would add setup complexity — connection strings, schema definitions, migration files. The `global._diagStore` pattern ensures the store persists across Next.js hot reloads in development and across requests on Railway's persistent server.

**localStorage + cookie for session**
After registration, the `userId` is written to both localStorage and a cookie. The cookie exists specifically for the middleware. Next.js middleware runs on the Edge Runtime, which cannot access browser APIs like localStorage. The cookie travels with every HTTP request, so the middleware can read it to protect the `/dashboard` route. localStorage is used by the dashboard to fetch the correct user on mount.

**React Context for onboarding state**
Each onboarding step is a separate page. Without context, passing data between them would require URL parameters or repeated API calls. `OnboardingContext` provides a single shared state object that every step can read from and write to, with localStorage persistence so progress survives a page refresh.


## Known Limitations
- **Store resets on server restart** — in-memory storage is not persistent. Restarting `npm run dev` wipes all registered users.
- **OTP is not real** — the verify-otp route accepts any 6-digit code. No emails are sent.
- **Google auth is UI only** — the "Continue with Google" button does not connect to any OAuth provider.
- **Password hashing is not production-safe** — passwords are base64 encoded, not hashed with bcrypt or similar. This demonstrates the concept without requiring additional dependencies.
- **Middleware checks cookie existence only** — the `diag_user_id` cookie is not cryptographically verified. A real implementation would use signed JWTs.


## Bonus Features Implemented
- **Form validation (frontend + backend)** — every onboarding step validates inputs before submission. API routes independently validate all incoming data and return appropriate HTTP status codes (400, 401) on failure.
- **Persisting onboarding progress** — onboarding data is saved to localStorage via React Context on every update. Progress survives a page refresh and is restored automatically on return.
- **Authentication (simple session + mock login)** — registration generates a unique userId saved to localStorage and a cookie. Next.js middleware protects the `/dashboard` route, redirecting unauthenticated users to onboarding. A fully working login page allows returning users to restore their session.
- **Step progress indicator** — the onboarding sidebar tracks and visually highlights the current and completed steps throughout the flow.
- **Improved UX transitions** — Framer Motion animations on all onboarding cards, dashboard stat cards (fall from top), chart cards (slide from left), and a fade transition into the dashboard on onboarding completion. Loading states on all form submit buttons.


## Project Structure
diag-app/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.js
│   │   │   ├── verify-otp/route.js
│   │   │   └── login/route.js
│   │   └── user/
│   │       ├── [id]/route.js
│   │       ├── profile/route.js
│   │       ├── workspace/route.js
│   │       ├── invite/route.js
│   │       └── focus/route.js
│   ├── dashboard/page.js
│   ├── login/page.js
│   ├── onboarding/
│   │   ├── step-1 through step-6
│   ├── layout.js
│   └── Providers.js
├── components/
│   ├── dashboard/
│   │   ├── DashboardNavbar.js
│   │   └── DashboardSidebar.js
│   └── onboarding/
│       ├── OnboardingNavbar.js
│       └── OnboardingSidebar.js
├── context/
│   └── OnboardingContext.js
├── lib/
│   └── store.js
└── middleware.js