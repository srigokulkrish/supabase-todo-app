'use client'

import Link from 'next/link'
import { deleteList } from '@/app/todos/actions'
import { useState, useEffect } from 'react'
import EditListModal from './EditListModal'

export default function TodoListTable({ lists }) {
    const [localLists, setLocalLists] = useState(lists)
    const [pendingIds, setPendingIds] = useState(new Set())
    const [editingList, setEditingList] = useState(null)

    useEffect(() => {
        setLocalLists(lists)
    }, [lists])

    function handleUpdate(updatedList) {
        setLocalLists(prev => prev.map(list => 
            list.id === updatedList.id ? { ...list, ...updatedList } : list
        ))
        setEditingList(null)
    }

    async function handleDelete(id, title) {
        if (confirm(`Delete list "${title}" and all its todos?`)) {
            setPendingIds(prev => new Set(prev).add(id))
            await deleteList(id)
            setPendingIds(prev => {
                const next = new Set(prev)
                next.delete(id)
                return next
            })
        }
    }

    if (lists.length === 0) {
        return (
            <div className="text-center py-5">
                <div className="mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                </div>
                <p className="text-muted mb-0">No lists yet. Click &quot;Add List&quot; to get started!</p>
            </div>
        )
    }

    return (
        <>
            <div className="table-responsive">
                <table className="table mb-0">
                    <thead>
                        <tr>
                            <th scope="col" style={{width: '5%'}} className="text-center px-4 align-middle">#</th>
                            <th scope="col" style={{width: '25%'}} className="px-4 align-middle">Todo Name</th>
                            <th scope="col" style={{width: '50%'}} className="px-4 align-middle">Description</th>
                            <th scope="col" style={{width: '20%'}} className="text-end px-4 align-middle">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {localLists.map((list, index) => (
                            <tr key={list.id}>
                                <td className="text-center text-muted px-4 align-middle">{index + 1}</td>
                                <td className="fw-medium px-4 align-middle">
                                    <Link 
                                        href={`/todos/${list.id}`} 
                                        className="text-decoration-none text-dark todo-link"
                                    >
                                        {list.title}
                                    </Link>
                                </td>
                                <td className="text-muted px-4 align-middle">
                                    {list.description || <span className="text-secondary opacity-50">No description</span>}
                                </td>
                                <td className="text-end px-4 align-middle">
                                    <div className="d-flex justify-content-end gap-2">
                                        <button 
                                            className="btn btn-sm"
                                            style={{ background: '#f1f5f9', color: '#475569' }}
                                            onClick={() => setEditingList(list)}
                                        >
                                            Edit
                                        </button>
                                        <Link 
                                            href={`/todos/${list.id}`} 
                                            className="btn btn-sm d-inline-block"
                                            style={{ background: '#e0e7ff', color: '#4f46e5' }}
                                        >
                                            View
                                        </Link>
                                        <button 
                                            className="btn btn-sm"
                                            style={{ background: '#fee2e2', color: '#dc2626' }}
                                            onClick={() => handleDelete(list.id, list.title)}
                                            disabled={pendingIds.has(list.id)}
                                        >
                                            {pendingIds.has(list.id) ? '...' : 'Delete'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingList && (
                <EditListModal 
                    list={editingList} 
                    onClose={() => setEditingList(null)} 
                    onUpdate={handleUpdate}
                />
            )}
        </>
    )
}
