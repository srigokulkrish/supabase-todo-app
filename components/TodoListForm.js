'use client'

import { useState } from 'react'
import { createList } from '@/app/todos/actions'

export default function TodoListForm() {
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        setLoading(true)
        const formData = new FormData(event.currentTarget)
        await createList(formData)
        event.target.reset()
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="input-group">
                <input 
                    type="text" 
                    name="title" 
                    className="form-control" 
                    placeholder="New list name (e.g. Shopping)..." 
                    required 
                />
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create List'}
                </button>
            </div>
        </form>
    )
}
