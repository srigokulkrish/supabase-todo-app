import Link from "next/link";
import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { motion } from 'motion/react'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/todos')
  }

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
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="hero-section mb-5"
              >
                <motion.h1 
                  className="display-5 fw-bold mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Stay Organized, Get Things Done
                </motion.h1>
                <motion.p 
                  className="lead mb-0 opacity-75"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  A simple, secure, and modern todo list application built with Next.js 15 and Supabase.
                </motion.p>
              </motion.div>
              
              <motion.div 
                className="d-flex gap-3 justify-content-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/login" className="btn btn-light btn-lg px-4 fw-medium">
                    Log In
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/signup" className="btn btn-outline-light btn-lg px-4 fw-medium">
                    Sign Up
                  </Link>
                </motion.div>
              </motion.div>
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
