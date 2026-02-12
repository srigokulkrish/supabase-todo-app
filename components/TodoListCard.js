'use client'

import Link from 'next/link'
import { deleteList, updateList } from '@/app/todos/actions'
import { useState } from 'react'

export default function TodoListCard({ list }) {
    const [isPending, setIsPending] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(list.title)

    async function handleDelete(e) {
        e.preventDefault() // Prevent navigation
        if (confirm(`Delete list "${list.title}" and all its todos?`)) {
            setIsPending(true)
            await deleteList(list.id)
            setIsPending(false)
        }
    }

    async function handleSave(e) {
        e.preventDefault()
        if (title.trim() === list.title) {
            setIsEditing(false)
            return
        }
        
        setIsPending(true)
        await updateList(list.id, title)
        setIsPending(false)
        setIsEditing(false)
    }

    function handleCancel(e) {
        e.preventDefault()
        setTitle(list.title)
        setIsEditing(false)
    }

    return (
        <div className="col-md-4 mb-3">
            {/* If editing, we don't wrap in Link so clicks don't navigate */}
            {isEditing ? (
                <div className="card h-100 shadow-sm">
                    <div className="card-body">
                         <form onSubmit={handleSave} className="d-flex gap-2">
                            <input 
                                type="text" 
                                className="form-control form-control-sm" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                autoFocus
                                disabled={isPending}
                            />
                            <button 
                                type="submit" 
                                className="btn btn-success btn-sm"
                                disabled={isPending}
                            >
                                ✓
                            </button>
                            <button 
                                onClick={handleCancel}
                                className="btn btn-secondary btn-sm"
                                disabled={isPending}
                                type="button"
                            >
                                ✕
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="card h-100 shadow-sm position-relative">
                    <Link href={`/todos/${list.id}`} className="text-decoration-none text-dark d-block h-100">
                        <div className="card-body">
                            <h5 className="card-title mb-0 text-truncate pe-4">{list.title}</h5>
                        </div>
                        <div className="card-footer bg-transparent border-top-0 pt-0 text-muted small">
                            View Todos &rarr;
                        </div>
                    </Link>
                    
                    {/* Action Buttons styled to float top-right */}
                    <div className="position-absolute top-0 end-0 p-2 d-flex gap-1" style={{zIndex: 10}}>
                         <button 
                            onClick={(e) => {
                                e.preventDefault();
                                setIsEditing(true);
                            }}
                            className="btn btn-outline-primary btn-sm rounded-circle"
                            aria-label="Edit list"
                            disabled={isPending}
                            style={{width: '32px', height: '32px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                        >
                            ✎
                        </button>
                        <button 
                            onClick={handleDelete} 
                            className="btn btn-outline-danger btn-sm rounded-circle"
                            aria-label="Delete list"
                            disabled={isPending}
                            style={{width: '32px', height: '32px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
