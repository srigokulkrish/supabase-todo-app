'use client'

import { useState } from 'react'
import { createList } from '@/app/todos/actions'

export default function AddListModal() {
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        setLoading(true)
        const formData = new FormData(event.currentTarget)
        await createList(formData)
        
        // Reset form and close modal
        event.target.reset()
        setLoading(false)
        
        // Close modal programmatically (Bootstrap way without jQuery)
        const closeBtn = document.getElementById('closeModalBtn')
        if (closeBtn) closeBtn.click()
    }

    return (
        <>
            <button 
                type="button" 
                className="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#addListModal"
            >
                + New Todo
            </button>

            <div className="modal fade" id="addListModal" tabIndex="-1" aria-labelledby="addListModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addListModalLabel">Create Todo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalBtn"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body text-start">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Todo Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="title" 
                                        name="title" 
                                        required 
                                        placeholder="e.g. Work Projects"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description (Optional)</label>
                                    <textarea 
                                        className="form-control" 
                                        id="description" 
                                        name="description" 
                                        rows="3"
                                        placeholder="What's this list for?"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Creating...' : 'Create Todo'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
