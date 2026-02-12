'use client'

import { useState, useEffect } from 'react'
import { updateList } from '@/app/todos/actions'
import { useRouter } from 'next/navigation'

export default function EditListModal({ list, onClose, onUpdate }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [onClose])

    async function handleSubmit(event) {
        event.preventDefault()
        setLoading(true)
        const formData = new FormData(event.currentTarget)
        const title = formData.get('title')
        const description = formData.get('description')
        
        const result = await updateList(list.id, title, description)
        
        if (result?.error) {
            alert('Failed to update: ' + result.error)
            setLoading(false)
            return
        }
        
        if (onUpdate) {
            onUpdate({ id: list.id, title, description })
        }

        setLoading(false)
        router.refresh()
    }

    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Todo</h5>
                            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body text-start">
                                <div className="mb-3">
                                    <label htmlFor="edit-title" className="form-label">Todo Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control text-capitalize" 
                                        id="edit-title" 
                                        name="title" 
                                        defaultValue={list.title}
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edit-description" className="form-label">Description</label>
                                    <textarea 
                                        className="form-control" 
                                        id="edit-description" 
                                        name="description" 
                                        rows="3"
                                        defaultValue={list.description || ''}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
