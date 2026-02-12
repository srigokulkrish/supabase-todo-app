'use client'

import { useState } from 'react'
import { addTodo } from '@/app/todos/actions'

export default function TodoForm({ listId }) {
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        setLoading(true)
        const formData = new FormData(event.currentTarget)
        // Add listId to formData since it's not an input field
        formData.append('list_id', listId)
        
        await addTodo(formData)
        event.target.reset()
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="input-group mb-2">
                <input 
                    type="text" 
                    name="title" 
                    className="form-control" 
                    placeholder="New todo..." 
                    required 
                />
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add'}
                </button>
            </div>
             <input 
                type="text" 
                name="description" 
                className="form-control form-control-sm" 
                placeholder="Optional description" 
            />
        </form>
    )
}
