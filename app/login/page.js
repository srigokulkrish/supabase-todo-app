'use client'

import { useState } from 'react'
import { login } from '@/app/auth/actions'
import Link from 'next/link'
import { motion } from 'motion/react'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function LoginPage() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const result = await login(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-vh-100 d-flex" style={{ background: '#fafafa' }}>
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="d-none d-lg-flex col-lg-6 align-items-center justify-content-center position-relative" 
        style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}
      >
        <div className="text-center text-white p-5" style={{ maxWidth: '400px' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.9 }}><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            </div>
            <h2 className="fw-bold mb-3">Welcome Back</h2>
            <p className="opacity-75 mb-0">Sign in to access your tasks and stay organized.</p>
          </motion.div>
        </div>
        <div className="position-absolute bottom-0 start-0 end-0" style={{ height: '200px', background: 'linear-gradient(to top, rgba(0,0,0,0.1), transparent)' }}></div>
      </motion.div>

      <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          style={{ width: '100%', maxWidth: '380px' }}
        >
          <div className="d-lg-none text-center mb-4">
            <Link href="/" className="fw-bold d-inline-flex align-items-center" style={{ color: '#6366f1', textDecoration: 'none', fontSize: '1.5rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              Supabase Todo
            </Link>
          </div>
          
          <motion.div variants={stagger} initial="initial" animate="animate">
            <motion.div variants={fadeIn} className="mb-4">
              <h4 className="fw-bold mb-1" style={{ color: '#1e293b' }}>Sign in</h4>
              <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Enter your credentials to continue</p>
            </motion.div>
          
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="alert px-3 py-2 mb-4" 
                role="alert" 
                style={{ background: '#fef2f2', color: '#dc2626', border: 'none', borderRadius: '8px', fontSize: '0.875rem' }}
              >
                {error}
              </motion.div>
            )}

            <motion.form 
              onSubmit={handleSubmit}
              variants={fadeIn}
            >
              <div className="mb-3">
                <label htmlFor="email" className="form-label" style={{ fontSize: '0.875rem', fontWeight: 500, color: '#475569' }}>Email</label>
                <motion.input 
                  type="email" 
                  className="form-control py-2" 
                  id="email" 
                  name="email" 
                  placeholder="you@example.com"
                  required 
                  whileFocus={{ scale: 1.01 }}
                  style={{ 
                    borderColor: '#e2e8f0', 
                    background: '#f8fafc',
                    borderRadius: '8px',
                    fontSize: '0.95rem'
                  }}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label" style={{ fontSize: '0.875rem', fontWeight: 500, color: '#475569' }}>Password</label>
                <motion.input 
                  type="password" 
                  className="form-control py-2" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••"
                  required 
                  whileFocus={{ scale: 1.01 }}
                  style={{ 
                    borderColor: '#e2e8f0', 
                    background: '#f8fafc',
                    borderRadius: '8px',
                    fontSize: '0.95rem'
                  }}
                />
              </div>
              <motion.button 
                type="submit" 
                className="btn w-100 py-2 fw-medium" 
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ background: '#6366f1', color: 'white', borderRadius: '8px' }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </motion.button>
            </motion.form>

            <motion.div 
              variants={fadeIn}
              className="mt-4 text-center"
            >
              <p className="mb-0" style={{ color: '#64748b', fontSize: '0.9rem' }}>
                Don't have an account?{' '}
                <Link href="/signup" style={{ color: '#6366f1', fontWeight: 500, textDecoration: 'none' }}>
                  Create one
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
