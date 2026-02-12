import { getTodos } from '../actions'
import TodoForm from '@/components/TodoForm'
import TodoCard from '@/components/TodoCard'
import { createClient } from '@/lib/supabase'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ListDetailPage({ params }) {
    // Next.js 15: params is async
    const { id } = await params
    
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // specific check to get list details for title (optional but nice)
    const { data: list } = await supabase
        .from('todo_lists')
        .select('title')
        .eq('id', id)
        .single()
    
    if (!list) {
        return notFound()
    }

    const todos = await getTodos(id)

    return (
        <div className="container py-5">
            <div className="mb-4">
                <Link href="/todos" className="text-decoration-none text-muted small">
                    &larr; Back to Lists
                </Link>
                <h1 className="mt-2">{list.title}</h1>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <TodoForm listId={id} />
                    
                    <div className="mt-4">
                        {todos.length === 0 ? (
                            <div className="text-center text-muted p-5 bg-light rounded">
                                <p className="mb-0">No todos in this list yet. Add one! ✨</p>
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
    )
}
