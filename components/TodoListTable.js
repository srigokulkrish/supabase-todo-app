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
            <div className="text-center text-muted p-5 bg-light rounded">
                <p className="mb-0">No lists yet. Click "Add List" to get started! 📝</p>
            </div>
        )
    }

    return (
        <>
            <div className="table-responsive">
                <table className="table table-bordered align-middle">
                    <thead>
                        <tr>
                            <th scope="col" style={{width: '5%'}} className="text-center">S.NO</th>
                            <th scope="col" style={{width: '25%'}}>Todo Name</th>
                            <th scope="col" style={{width: '50%'}}>Description</th>
                            <th scope="col" style={{width: '20%'}} className="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {localLists.map((list, index) => (
                            <tr key={list.id}>
                                <td className="text-center text-muted">{index + 1}</td>
                                <td className="fw-medium">
                                    <Link 
                                        href={`/todos/${list.id}`} 
                                        className="text-decoration-none text-dark d-block text-capitalize"
                                    >
                                        {list.title}
                                    </Link>
                                </td>
                                <td className="text-muted small">
                                    {list.description || <span className="text-secondary opacity-50">No description</span>}
                                </td>
                                <td className="text-end">
                                    <div className="d-flex justify-content-end gap-2">
                                        <button 
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => setEditingList(list)}
                                        >
                                            Edit
                                        </button>
                                        <Link 
                                            href={`/todos/${list.id}`} 
                                            className="btn btn-sm btn-outline-primary"
                                        >
                                            View
                                        </Link>
                                        <button 
                                            className="btn btn-sm btn-outline-danger"
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
