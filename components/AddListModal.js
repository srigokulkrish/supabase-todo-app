'use client'

import { useState } from 'react'
import { createList } from '@/app/todos/actions'
import { motion } from 'motion/react'

export default function AddListModal() {
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        setLoading(true)
        const formData = new FormData(event.currentTarget)
        await createList(formData)
        
        event.target.reset()
        setLoading(false)
        
        const closeBtn = document.getElementById('closeModalBtn')
        if (closeBtn) closeBtn.click()
    }

    return (
        <>
            <motion.button 
                type="button" 
                className="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#addListModal"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                + New Todo
            </motion.button>

            <div className="modal fade" id="addListModal" tabIndex="-1" aria-labelledby="addListModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <motion.div 
                        className="modal-content"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title" id="addListModalLabel">Create Todo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalBtn"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body text-start">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Todo Name</label>
                                    <motion.input 
                                        type="text" 
                                        className="form-control" 
                                        id="title" 
                                        name="title" 
                                        required 
                                        placeholder="e.g. Work Projects"
                                        whileFocus={{ scale: 1.01 }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description (Optional)</label>
                                    <motion.textarea 
                                        className="form-control" 
                                        id="description" 
                                        name="description" 
                                        rows="3"
                                        placeholder="What's this list for?"
                                        whileFocus={{ scale: 1.01 }}
                                    ></motion.textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <motion.button 
                                    type="submit" 
                                    className="btn btn-primary" 
                                    disabled={loading}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {loading ? 'Creating...' : 'Create Todo'}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </>
    )
}
