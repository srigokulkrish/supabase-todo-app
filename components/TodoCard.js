'use client'

import { updateTodoStatus, deleteTodo, updateTodo } from '@/app/todos/actions'
import { useState } from 'react'

export default function TodoCard({ todo, listId }) {
    const [isPending, setIsPending] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(todo.title)
    const [description, setDescription] = useState(todo.description || '')

    async function handleToggle() {
        setIsPending(true)
        await updateTodoStatus(todo.id, !todo.completed, listId)
        setIsPending(false)
    }

    async function handleDelete() {
        if (confirm('Are you sure you want to delete this todo?')) {
            setIsPending(true)
            await deleteTodo(todo.id, listId)
            setIsPending(false)
        }
    }

    async function handleSave(e) {
        e.preventDefault()
        if (title.trim() === '') return

        setIsPending(true)
        await updateTodo(todo.id, title, description, listId)
        setIsPending(false)
        setIsEditing(false)
    }

    function handleCancel() {
        setTitle(todo.title)
        setDescription(todo.description || '')
        setIsEditing(false)
    }

    if (isEditing) {
        return (
            <div 
                className="card mb-3" 
                style={{ border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
            >
                <div className="card-body">
                    <form onSubmit={handleSave}>
                        <div className="mb-3">
                            <input 
                                type="text" 
                                className="form-control mb-2" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                autoFocus
                                disabled={isPending}
                            />
                            <textarea 
                                className="form-control" 
                                rows="2"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description (optional)"
                                disabled={isPending}
                            ></textarea>
                        </div>
                        <div className="d-flex gap-2">
                            <button 
                                type="submit" 
                                className="btn btn-primary btn-sm" 
                                disabled={isPending}
                            >
                                Save
                            </button>
                            <button 
                                type="button" 
                                onClick={handleCancel} 
                                className="btn btn-outline-secondary btn-sm" 
                                disabled={isPending}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div 
            className="card mb-2" 
            style={{ 
                border: 'none', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                opacity: todo.completed ? 0.6 : 1,
            }}
        >
            <div className="card-body p-3">
                <div className="d-flex align-items-center">
                    <div 
                        className="form-check me-3"
                        style={{ cursor: 'pointer' }}
                    >
                        <input 
                            type="checkbox" 
                            className="form-check-input" 
                            checked={todo.completed} 
                            onChange={handleToggle}
                            disabled={isPending}
                            style={{ 
                                cursor: 'pointer', 
                                width: '1.25rem', 
                                height: '1.25rem',
                                borderRadius: '4px'
                            }}
                        />
                    </div>
                    <div 
                        className="flex-grow-1"
                        onClick={() => setIsEditing(true)} 
                        style={{ cursor: 'pointer' }}
                    >
                        <span className={todo.completed ? 'text-decoration-line-through text-muted' : 'fw-medium'}>
                            {todo.title}
                        </span>
                        {todo.description && (
                            <small className="d-block text-muted" style={{ fontSize: '0.8rem' }}>
                                {todo.description}
                            </small>
                        )}
                    </div>
                    <div className="d-flex align-items-center gap-1">
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="btn btn-sm btn-link text-secondary p-1"
                            aria-label="Edit todo"
                            disabled={isPending}
                            style={{ textDecoration: 'none' }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                        </button>
                        <button 
                            onClick={handleDelete} 
                            className="btn btn-sm btn-link text-danger p-1"
                            aria-label="Delete todo"
                            disabled={isPending}
                            style={{ textDecoration: 'none' }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
