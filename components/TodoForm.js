'use client'

import { useState } from 'react'
import { addTodo } from '@/app/todos/actions'

export default function TodoForm({ listId }) {
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        setLoading(true)
        const formData = new FormData(event.currentTarget)
        formData.append('list_id', listId)
        
        await addTodo(formData)
        event.target.reset()
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="card" style={{ border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div className="card-body p-3">
                    <div className="mb-3">
                        <input 
                            type="text" 
                            name="title" 
                            className="form-control" 
                            placeholder="What needs to be done?" 
                            required 
                        />
                    </div>
                    <div className="d-flex gap-2 align-items-center">
                        <input 
                            type="text" 
                            name="description" 
                            className="form-control" 
                            placeholder="Add details (optional)"
                        />
                        <button 
                          type="submit" 
                          className="btn btn-primary px-4" 
                          disabled={loading}
                          style={{ whiteSpace: 'nowrap' }}
                        >
                            {loading ? 'Adding...' : 'Add Todo'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
