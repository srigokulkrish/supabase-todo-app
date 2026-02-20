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

    const [lists, profile] = await Promise.all([
        getLists(),
        getProfile()
    ])

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

                <div className='border border-radius-lg'>
                    <TodoListTable lists={lists} />
                </div>
            </div>
        </div>
    )
}
