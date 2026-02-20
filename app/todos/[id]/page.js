import { getTodos } from '../actions'
import TodoForm from '@/components/TodoForm'
import TodoCard from '@/components/TodoCard'
import { createClient } from '@/lib/supabase'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import BackButton from '@/components/BackButton'

export const dynamic = 'force-dynamic'

export default async function ListDetailPage({ params }) {
    const { id } = await params
    
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const [listResult, todos] = await Promise.all([
        supabase.from('todo_lists').select('title').eq('id', id).single(),
        getTodos(id)
    ])
    
    const list = listResult.data
    
    if (!list) {
        return notFound()
    }

    return (
        <div className="min-vh-100" style={{ background: '#f8fafc' }}>
            <nav className="navbar navbar-expand-lg border-bottom bg-white">
                <div className="container py-3">
                    <Link href="/" className="navbar-brand fw-bold d-flex align-items-center" style={{ color: '#6366f1', textDecoration: 'none' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                        Supabase Todo
                    </Link>
                </div>
            </nav>

            <div className="container py-5">
                <div className="mb-4 d-flex align-items-center">
                    <BackButton href="/todos" />
                    <h2 className="fw-bold mb-0">{list.title}</h2>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <TodoForm listId={id} />
                        
                        <div className="mt-4">
                            {todos.length === 0 ? (
                                <div className="text-center py-5 bg-white rounded" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                                    <div className="mb-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                                    </div>
                                    <p className="text-muted mb-0">No todos in this list yet. Add one!</p>
                                </div>
                            ) : (
                                todos.map(todo => (
                                    <TodoCard key={todo.id} todo={todo} listId={id} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
