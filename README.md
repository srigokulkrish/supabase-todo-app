# Supabase Todo App

A minimal, modern Todo List application built with Next.js 15, Supabase, and Bootstrap 5.

## Features

- **Authentication**: Email/Password login and signup via Supabase Auth.
- **Protected Routes**: Middleware ensures only authenticated users access the todo list.
- **CRUD Operations**: Create, Read, Update (complete status), and Delete todos.
- **Row Level Security (RLS)**: Users can only access their own data.
- **Server Actions**: All data mutations happen on the server.

## Setup Instructions

### 1. Create a Supabase Project

1.  Go to [database.new](https://database.new) and create a new project.
2.  Once created, go to **Project Settings > API**.
3.  Copy the `Project URL` and `anon public` key.
4.  **Important:** Go to **Authentication > Providers > Email** and **disable** "Confirm email" (toggle off) if you want to skip clicking email links during development. Otherwise, you'll need to verify your email after signing up.

### 2. Configure Environment Variables

Create a `.env.local` file in the root of the project:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Database Schema

Run the following SQL in the **Supabase SQL Editor** to create the table and security policies:

```sql
-- Create a table for public todos
create table todos (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text,
  completed boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Secure the table
alter table todos enable row level security;

-- Policy: Authenticated users can only see their own todos
create policy "Users can view their own todos" on todos
  for select using (auth.uid() = user_id);

-- Policy: Users can only insert their own todos
create policy "Users can insert their own todos" on todos
  for insert with check (auth.uid() = user_id);

-- Policy: Users can only update their own todos
create policy "Users can update their own todos" on todos
  for update using (auth.uid() = user_id);

-- Policy: Users can only delete their own todos
create policy "Users can delete their own todos" on todos
  for delete using (auth.uid() = user_id);
```

### 4. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1.  Push your code to a Git repository (GitHub, GitLab, BitBucket).
2.  Import the project into Vercel.
3.  Add the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the **Environment Variables** section in Vercel project settings.
4.  Deploy!

## Troubleshooting

### "Email not confirmed" or "Email rate limit exceeded"
If you are facing issues with email verification during development:

1.  **Disable Email Confirmation**: In Supabase Dashboard -> Authentication -> Providers -> Email -> Toggle "Confirm email" OFF.
2.  **Manually Confirm User**: In Supabase Dashboard -> Authentication -> Users. Find your user -> Click the three dots (...) -> Click **"Confirm User"** (if available) or delete the user and sign up again after disabling confirmation.
3.  **Rate Limits**: If you sent too many emails, Supabase blocks you for a while. Use the manual confirmation method above to bypass this.
