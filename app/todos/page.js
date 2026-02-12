import { getLists } from './actions'
import AddListModal from '@/components/AddListModal'
import TodoListTable from '@/components/TodoListTable'
import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { signout } from '@/app/auth/actions'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const lists = await getLists()

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h1 className="mb-0">My Lists</h1>
                    <p className="text-muted small mb-0">Manage your tasks efficiently.</p>
                </div>
                <div className="d-flex gap-2">
                    <AddListModal />
                    <form action={signout}>
                        <button type="submit" className="btn btn-outline-secondary">
                            Sign Out
                        </button>
                    </form>
                </div>
            </div>

            <div>
                <TodoListTable lists={lists} />
            </div>
        </div>
    )
}
