import { getLists } from './actions'
import { getProfile } from '../settings/actions'
import AddListModal from '@/components/AddListModal'
import TodoListTable from '@/components/TodoListTable'
import Navbar from '@/components/Navbar'
import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const lists = await getLists()
    const profile = await getProfile()

    return (
        <div className="min-vh-100" style={{ background: '#f8fafc' }}>
            <Navbar user={user} profile={profile} />

            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="fw-bold mb-1">My Lists</h2>
                        <p className="text-muted small mb-0">Manage your tasks efficiently.</p>
                    </div>
                    <AddListModal />
                </div>

                <div className="card" style={{ border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'visible' }}>
                    <TodoListTable lists={lists} />
                </div>
            </div>
        </div>
    )
}
