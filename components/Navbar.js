'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signout } from '@/app/auth/actions'

export default function Navbar({ user, profile }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="navbar navbar-expand-lg border-bottom sticky-top bg-white">
      <div className="container py-2">
        <Link href="/" className="navbar-brand fw-bold d-flex align-items-center" style={{ color: '#6366f1', textDecoration: 'none' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          <span className="d-none d-sm-inline">Supabase Todo</span>
        </Link>
        
        <div className="d-flex align-items-center gap-2" ref={dropdownRef}>
          <div className="position-relative">
            <button
              className="btn p-0 d-flex align-items-center gap-2"
              style={{ background: 'none', border: 'none' }}
              onClick={() => setShowDropdown(!showDropdown)}
              type="button"
            >
              <div
                className="rounded-circle overflow-hidden bg-light"
                style={{
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                {profile?.avatar_url ? (
                  <Image 
                    src={profile.avatar_url} 
                    alt="Profile" 
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                    width={32}
                    height={32}
                  />
                ) : (
                  <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                )}
              </div>
              <span className="fw-medium text-dark d-none d-md-inline" style={{ fontSize: '0.875rem' }}>
                {(profile?.full_name || user.email?.split('@')[0]).replace(/\b\w/g, c => c.toUpperCase())}
              </span>
            </button>

            {showDropdown && (
              <div
                className="position-absolute end-0 mt-2 rounded shadow-lg"
                style={{ 
                  width: '220px', 
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  zIndex: 9999,
                  overflow: 'hidden'
                }}
              >
                <div className="py-2">
                  <div className="px-3 py-2 border-bottom" style={{ background: '#f8fafc' }}>
                    <p className="mb-0 fw-semibold" style={{ fontSize: '0.875rem', color: '#1e293b' }}>
                      {(profile?.full_name || user.email?.split('@')[0]).replace(/\b\w/g, c => c.toUpperCase())}
                    </p>
                    <p className="mb-0 text-muted" style={{ fontSize: '0.75rem' }}>{user.email}</p>
                  </div>
                  
                  <div className="py-1">
                    <Link 
                      href="/settings"
                      className="btn w-100 text-start px-3 py-2 d-flex align-items-center"
                      style={{ 
                        color: '#475569',
                        background: 'none',
                        border: 'none',
                        fontSize: '0.875rem',
                        textDecoration: 'none'
                      }}
                      onClick={() => setShowDropdown(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                      Settings
                    </Link>
                  </div>

                  <div className="border-top pt-1 mt-1">
                    <form action={signout}>
                      <button 
                        type="submit" 
                        className="btn w-100 text-start px-3 py-2 d-flex align-items-center"
                        style={{ 
                          color: '#dc2626',
                          background: 'none',
                          border: 'none',
                          fontSize: '0.875rem'
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                        Sign Out
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
