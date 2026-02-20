'use client'

import { useState, useRef } from 'react'
import { updateProfile, updateAvatar } from './actions'
import Link from 'next/link'
import Image from 'next/image'

export default function SettingsClient({ profile: initialProfile }) {
  const [loading, setLoading] = useState(false)
  const [avatarLoading, setAvatarLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const fileInputRef = useRef(null)
  const [profile, setProfile] = useState(initialProfile || {
    full_name: '',
    username: '',
    phone: '',
    website: '',
    github_url: '',
    twitter_url: '',
    linkedin_url: '',
    bio: '',
    avatar_url: ''
  })

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setMessage(null)

    const formData = new FormData(event.currentTarget)
    const result = await updateProfile(formData)

    if (result?.error) {
      setMessage({ type: 'error', text: result.error })
    } else {
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
    }
    setLoading(false)
  }

  async function handleAvatarChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    setAvatarLoading(true)
    const result = await updateAvatar(file)

    if (result?.error) {
      setMessage({ type: 'error', text: result.error })
    } else if (result?.avatarUrl) {
      setProfile(prev => ({ ...prev, avatar_url: result.avatarUrl }))
      setMessage({ type: 'success', text: 'Profile photo updated!' })
    }
    setAvatarLoading(false)
  }

  return (
    <div className="min-vh-100" style={{ background: '#f8fafc' }}>
      <nav className="navbar navbar-expand-lg border-bottom bg-white">
        <div className="container py-3">
          <Link href="/" className="navbar-brand fw-bold d-flex align-items-center" style={{ color: '#6366f1', textDecoration: 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            Supabase Todo
          </Link>
          <Link href="/todos" className="btn btn-outline-secondary btn-sm">Back to Dashboard</Link>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="mb-4">
              <h2 className="fw-bold mb-1">Settings</h2>
              <p className="text-muted mb-0">Manage your account settings and preferences.</p>
            </div>

            {message && (
              <div 
                className={`alert mb-4 ${message.type === 'error' ? 'alert-danger' : 'alert-success'}`}
                style={{ borderRadius: '8px' }}
              >
                {message.text}
              </div>
            )}

            <div className="card mb-4" style={{ border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div className="card-header bg-white py-3">
                <h5 className="mb-0 fw-semibold">Profile Photo</h5>
              </div>
              <div className="card-body">
                <div className="d-flex align-items-center gap-4">
                  <div className="position-relative">
                    <div 
                      className="rounded-circle overflow-hidden"
                      style={{ 
                        width: '100px', 
                        height: '100px',
                        background: '#e2e8f0',
                        border: '3px solid #6366f1'
                      }}
                    >
                      {profile.avatar_url ? (
                        <Image 
                          src={profile.avatar_url} 
                          alt="Profile" 
                          className="w-100 h-100"
                          style={{ objectFit: 'cover' }}
                          width={100}
                          height={100}
                        />
                      ) : (
                        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        </div>
                      )}
                    </div>
                    {avatarLoading && (
                      <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '50%' }}>
                        <div className="spinner-border text-primary" role="status" style={{ width: '24px', height: '24px' }}>
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleAvatarChange}
                      accept="image/*"
                      className="d-none"
                    />
                    <button 
                      type="button"
                      className="btn"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={avatarLoading}
                      style={{ background: '#6366f1', color: 'white', borderRadius: '8px' }}
                    >
                      {avatarLoading ? 'Uploading...' : 'Change Photo'}
                    </button>
                    <p className="text-muted small mb-0 mt-2">JPG, GIF or PNG. Max 2MB.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4" style={{ border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div className="card-header bg-white py-3">
                <h5 className="mb-0 fw-semibold">Profile Information</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={{ fontWeight: 500 }}>Full Name</label>
                      <input 
                        type="text" 
                        name="full_name"
                        className="form-control"
                        value={profile.full_name || ''}
                        onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={{ fontWeight: 500 }}>Username</label>
                      <input 
                        type="text" 
                        name="username"
                        className="form-control"
                        value={profile.username || ''}
                        onChange={(e) => setProfile({...profile, username: e.target.value})}
                        placeholder="johndoe"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label" style={{ fontWeight: 500 }}>Bio</label>
                    <textarea 
                      name="bio"
                      className="form-control"
                      rows="3"
                      value={profile.bio || ''}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" style={{ fontWeight: 500 }}>Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      className="form-control"
                      value={profile.phone || ''}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" style={{ fontWeight: 500 }}>Website</label>
                    <input 
                      type="url" 
                      name="website"
                      className="form-control"
                      value={profile.website || ''}
                      onChange={(e) => setProfile({...profile, website: e.target.value})}
                      placeholder="https://example.com"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn mt-2"
                    disabled={loading}
                    style={{ background: '#6366f1', color: 'white', borderRadius: '8px' }}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            </div>

            <div className="card mb-4" style={{ border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div className="card-header bg-white py-3">
                <h5 className="mb-0 fw-semibold">Social Links</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" style={{ fontWeight: 500 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-2"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      GitHub
                    </label>
                    <input 
                      type="url" 
                      name="github_url"
                      className="form-control"
                      value={profile.github_url || ''}
                      onChange={(e) => setProfile({...profile, github_url: e.target.value})}
                      placeholder="https://github.com/username"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" style={{ fontWeight: 500 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-2"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      Twitter / X
                    </label>
                    <input 
                      type="url" 
                      name="twitter_url"
                      className="form-control"
                      value={profile.twitter_url || ''}
                      onChange={(e) => setProfile({...profile, twitter_url: e.target.value})}
                      placeholder="https://x.com/username"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" style={{ fontWeight: 500 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      LinkedIn
                    </label>
                    <input 
                      type="url" 
                      name="linkedin_url"
                      className="form-control"
                      value={profile.linkedin_url || ''}
                      onChange={(e) => setProfile({...profile, linkedin_url: e.target.value})}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn mt-2"
                    disabled={loading}
                    style={{ background: '#6366f1', color: 'white', borderRadius: '8px' }}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
