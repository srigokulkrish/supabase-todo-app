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
            <div className="border-bottom py-3">
                <form onSubmit={handleSave}>
                    <div className="mb-2">
                        <input 
                            type="text" 
                            className="form-control form-control-sm mb-1" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                            disabled={isPending}
                        />
                        <textarea 
                            className="form-control form-control-sm" 
                            rows="2"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description (optional)"
                            disabled={isPending}
                        ></textarea>
                    </div>
                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-sm btn-success" disabled={isPending}>Save</button>
                        <button type="button" onClick={handleCancel} className="btn btn-sm btn-secondary" disabled={isPending}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className={`d-flex justify-content-between align-items-center border-bottom py-3 ${todo.completed ? 'opacity-50' : ''} group`}>
            <div className="d-flex align-items-center flex-grow-1">
                <input 
                    type="checkbox" 
                    className="form-check-input me-3 rounded-circle" 
                    checked={todo.completed} 
                    onChange={handleToggle}
                    disabled={isPending}
                    style={{cursor: 'pointer', width: '1.2em', height: '1.2em'}}
                />
                <div 
                    onClick={() => setIsEditing(true)} 
                    style={{cursor: 'pointer', flexGrow: 1}}
                    title="Click to edit"
                >
                    <span className={`d-block ${todo.completed ? 'text-decoration-line-through' : 'fw-medium'}`}>
                        {todo.title}
                    </span>
                    {todo.description && (
                        <small className="text-muted d-block">
                            {todo.description}
                        </small>
                    )}
                </div>
            </div>
            <div className="d-flex align-items-center gap-2">
                 <button 
                    onClick={() => setIsEditing(true)}
                    className="btn btn-link text-secondary p-0 text-decoration-none fs-6 opacity-0 focus-opacity-100"
                    aria-label="Edit todo"
                    disabled={isPending}
                    style={{transition: 'opacity 0.2s', opacity: 0.5}}
                >
                    ✎
                </button>
                <button 
                    onClick={handleDelete} 
                    className="btn btn-link text-danger p-0 text-decoration-none fs-5 opacity-50 hover-opacity-100"
                    aria-label="Delete todo"
                    disabled={isPending}
                >
                    &times;
                </button>
            </div>
        </div>
    )
}
