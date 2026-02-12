Create a complete, modern, minimal Next.js 14/15 App Router project with the following features:

Project goal:
- Very simple Todo List application
- Authentication (email + password) via Supabase Auth
- After login → shows user's personal todo list
- Deployable to Vercel with one click (include vercel.json if needed)

Tech stack requirements:
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (both Auth + Database)
- Use @supabase/supabase-js (latest version)
- Use server actions where possible (no separate API routes if not necessary)
- Prefer server components, but use client components only when needed ('use client')

Pages & features:

1. Public pages:
   - / (home) → simple landing with "Sign Up" and "Log In" buttons
   - /signup → email + password signup form
     - After successful signup → automatically sign in the user and redirect to /todos
   - /login → email + password login form
     - Successful login → redirect to /todos
   - Show nice error messages for wrong credentials, weak password, email already exists, etc.

2. Protected page:
   - /todos (only accessible when logged in)
     - Shows a clean list of the user's todos
     - Each todo displayed as a card/tile with:
       - Title (bold)
       - Optional small description/text
       - Checkbox (completed / not completed)
       - Delete button (× or trash icon)
     - Input field + "Add" button at the top to create new todo
     - Very minimal, clean UI (use good spacing, rounded cards, subtle shadows)

Database (Supabase):
- Table: todos
  - id          uuid            primary key default uuid_generate_v4()
  - user_id     uuid            references auth.users(id) on delete cascade
  - title       text            not null
  - description text
  - completed   boolean         default false
  - created_at  timestamptz     default now()
  - updated_at  timestamptz     default now()

- Enable Row Level Security (RLS):
  - SELECT, INSERT, UPDATE, DELETE policies → only owner (auth.uid() = user_id)

Authentication flow:
- Use Supabase Auth with email/password (no magic links, no social logins)
- Protect /todos route using middleware or server-side check
- Show loading state while checking auth
- Add simple logout button (top-right corner)

Bonus (nice to have, but keep it simple):
- Optimistic updates when checking/unchecking or deleting
- Minimal loading skeletons when fetching todos
- Responsive design (mobile + desktop)
- Dark mode support (optional but nice)

Folder structure suggestion:
app/
  layout.tsx
  page.tsx             ← landing
  login/
    page.tsx
  signup/
    page.tsx
  todos/
    page.tsx
components/
  AuthForm.tsx
  TodoCard.tsx
  TodoForm.tsx
lib/
  supabase.ts          ← createBrowserClient + createServerClient helpers
middleware.ts
types/
  supabase.ts          ← generated types

Also generate:
- A README.md with setup instructions including:
  - How to create Supabase project
  - Which env variables to set (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY if needed)
  - How to deploy to Vercel
- .env.example file
- vercel.json (if needed for clean URLs / rewrites)

Keep the code clean, well-commented, and beginner-friendly.
Use modern patterns (server actions, server components, suspense when appropriate).
Avoid unnecessary dependencies.

Please output the most important files with good formatting:
- app/layout.tsx
- app/page.tsx
- app/login/page.tsx
- app/signup/page.tsx
- app/todos/page.tsx
- lib/supabase.ts
- components/… (the main ones)
- middleware.ts (if used)
- README.md content

Thank you! lets build together You keep saying what you want me to install I will help  you we build together