'use client'

import Link from "next/link";

export default function LandingClient() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <nav className="navbar navbar-expand-lg border-bottom">
        <div className="container py-3">
          <Link href="/" className="navbar-brand fw-bold" style={{ color: '#6366f1' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            Supabase Todo
          </Link>
        </div>
      </nav>

      <main className="flex-grow-1 d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <div className="hero-section mb-5">
                <h1 className="display-5 fw-bold mb-3">
                  Stay Organized, Get Things Done
                </h1>
                <p className="lead mb-0 opacity-75">
                  A simple, secure, and modern todo list application built with Next.js 15 and Supabase.
                </p>
              </div>
              
              <div className="d-flex gap-3 justify-content-center">
                <Link href="/login" className="btn btn-light btn-lg px-4 fw-medium">
                  Log In
                </Link>
                <Link href="/signup" className="btn btn-outline-light btn-lg px-4 fw-medium">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-4 text-muted">
        <small>&copy; {new Date().getFullYear()} Supabase Todo App</small>
      </footer>
    </div>
  );
}
