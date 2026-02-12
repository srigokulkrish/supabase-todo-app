import Link from "next/link";
import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/todos')
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <main className="mb-5">
        <h1 className="display-4 fw-bold mb-3">Supabase Todo App</h1>
        <p className="lead text-muted mb-4" style={{ maxWidth: '600px' }}>
          A simple, secure, and modern todo list application built with Next.js 15, Supabase, and Bootstrap 5.
        </p>
        
        <div className="d-flex gap-3 justify-content-center">
          <Link href="/login" className="btn btn-outline-primary btn-lg px-4">
            Log In
          </Link>
          <Link href="/signup" className="btn btn-primary btn-lg px-4">
            Sign Up
          </Link>
        </div>
      </main>

      <footer className="text-muted fixed-bottom pb-4">
        <small>&copy; {new Date().getFullYear()} Supabase Todo App</small>
      </footer>
    </div>
  );
}
