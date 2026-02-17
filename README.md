# Supabase Todo App (Multi-List)

A modern, minimal Todo List application built with Next.js 15, Supabase, and Bootstrap 5. This version supports multiple todo lists, each containing its own set of tasks.

## Features

- **Multiple Lists**: Organize your todos into different lists.
- **Authentication**: Email/Password login and signup via Supabase Auth.
- **Protected Routes**: Middleware ensures only authenticated users can access their lists.
- **CRUD Operations**: Create, read, update, and delete both lists and individual todos.
- **Row Level Security (RLS)**: Full data isolation—users can only see and manage their own data.
- **Server Actions**: Modern data handling using Next.js Server Actions.
- **User Settings**: Profile management with avatar, bio, social links.
- **Modern UI**: Micro animations using Motion library.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (Version 18 or later)
- A [Supabase](https://supabase.com/) account

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd supabase-todo-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1.  **Create a New Project**: Go to [database.new](https://database.new).
2.  **Disable Email Confirmation**: (For easier development) Go to **Authentication > Providers > Email** and turn off "Confirm email".
3.  **Get API Keys**: Go to **Project Settings > API** and copy the `Project URL` and `anon public` key.

### 4. Configure Environment Variables

Create a file named `.env.local` in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Initialize the Database

Run the following SQL in the **Supabase SQL Editor**:

```sql
-- 1. Create Todo Lists table
create table todo_lists (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text,
  created_at timestamptz default now()
);

-- 2. Create Todos table
create table todos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  list_id uuid references todo_lists(id) on delete cascade not null,
  title text not null,
  description text,
  completed boolean default false,
  created_at timestamptz default now()
);

-- 3. Create Profiles table (for user settings)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  phone text,
  website text,
  github_url text,
  twitter_url text,
  linkedin_url text,
  bio text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. Enable RLS
alter table todo_lists enable row level security;
alter table todos enable row level security;
alter table profiles enable row level security;

-- 5. Policies for todo_lists
create policy "Users can view their own lists" on todo_lists for select using (auth.uid() = user_id);
create policy "Users can insert their own lists" on todo_lists for insert with check (auth.uid() = user_id);
create policy "Users can update their own lists" on todo_lists for update using (auth.uid() = user_id);
create policy "Users can delete their own lists" on todo_lists for delete using (auth.uid() = user_id);

-- 6. Policies for todos
create policy "Users can view their own todos" on todos for select using (auth.uid() = user_id);
create policy "Users can insert their own todos" on todos for insert with check (auth.uid() = user_id);
create policy "Users can update their own todos" on todos for update using (auth.uid() = user_id);
create policy "Users can delete their own todos" on todos for delete using (auth.uid() = user_id);

-- 7. Policies for profiles
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- 8. Function to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- 9. Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 10. Function to update updated_at timestamp
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on profiles
  for each row execute function update_updated_at();
```

### 6. Set Up Storage (for profile avatars)

1. Go to **Storage** in Supabase dashboard
2. Create a new bucket named `avatars`
3. Make it **public**
4. Add these policies:

```sql
-- Allow authenticated users to upload avatars
create policy "Allow authenticated uploads"
on storage.objects for insert
with check (
  bucket_id = 'avatars' and auth.role() = 'authenticated'
);

-- Allow public view of avatars
create policy "Allow public view"
on storage.objects for select
using (bucket_id = 'avatars');

-- Allow authenticated users to update avatars
create policy "Allow authenticated update"
on storage.objects for update
using (bucket_id = 'avatars');
```

---

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## Deployment

### Vercel

1. Push your code to a Git repository (GitHub/GitLab/Bitbucket).
2. Connect your repository to Vercel.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the environment variables in Vercel.
4. Deploy!

---

## License

MIT
