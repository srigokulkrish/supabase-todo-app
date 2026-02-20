'use client'

import { useState } from 'react'
import { signup } from '@/app/auth/actions'
import Link from 'next/link'

export default function SignupPage() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const result = await signup(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-vh-100 d-flex" style={{ background: '#fafafa' }}>
      <div 
        className="d-none d-lg-flex col-lg-6 align-items-center justify-content-center position-relative" 
        style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}
      >
        <div className="text-center text-white p-5" style={{ maxWidth: '400px' }}>
          <div>
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.9 }}><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            </div>
            <h2 className="fw-bold mb-3">Get Started</h2>
            <p className="opacity-75 mb-0">Create an account to organize your tasks and boost productivity.</p>
          </div>
        </div>
        <div className="position-absolute bottom-0 start-0 end-0" style={{ height: '200px', background: 'linear-gradient(to top, rgba(0,0,0,0.1), transparent)' }}></div>
      </div>

      <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-4">
        <div style={{ width: '100%', maxWidth: '380px' }}>
          <div className="d-lg-none text-center mb-4">
            <Link href="/" className="fw-bold d-inline-flex align-items-center" style={{ color: '#6366f1', textDecoration: 'none', fontSize: '1.5rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              Supabase Todo
            </Link>
          </div>
          
          <div>
            <div className="mb-4">
              <h4 className="fw-bold mb-1" style={{ color: '#1e293b' }}>Create account</h4>
              <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Fill in your details to get started</p>
            </div>
          
            {error && (
              <div 
                className="alert px-3 py-2 mb-4" 
                role="alert" 
                style={{ background: '#fef2f2', color: '#dc2626', border: 'none', borderRadius: '8px', fontSize: '0.875rem' }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label" style={{ fontSize: '0.875rem', fontWeight: 500, color: '#475569' }}>Email</label>
                <input 
                  type="email" 
                  className="form-control py-2" 
                  id="email" 
                  name="email" 
                  placeholder="you@example.com"
                  required 
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
                <input 
                  type="password" 
                  className="form-control py-2" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••"
                  minLength="6"
                  required 
                  style={{ 
                    borderColor: '#e2e8f0', 
                    background: '#f8fafc',
                    borderRadius: '8px',
                    fontSize: '0.95rem'
                  }}
                />
                <div className="form-text" style={{ fontSize: '0.8rem' }}>Must be at least 6 characters</div>
              </div>
              <button 
                type="submit" 
                className="btn w-100 py-2 fw-medium" 
                disabled={loading}
                style={{ background: '#6366f1', color: 'white', borderRadius: '8px' }}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="mb-0" style={{ color: '#64748b', fontSize: '0.9rem' }}>
                Already have an account?{' '}
                <Link href="/login" style={{ color: '#6366f1', fontWeight: 500, textDecoration: 'none' }}>
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
