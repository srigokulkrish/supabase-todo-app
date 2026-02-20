'use client'

import Link from 'next/link'

export default function BackButton({ href = '/todos' }) {
  return (
    <Link 
      href={href} 
      className="btn btn-link p-0 me-3 text-muted back-button-hover"
      style={{ 
        textDecoration: 'none', 
        display: 'flex',
        transition: 'color 0.2s ease-in-out'
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
    </Link>
  )
}
