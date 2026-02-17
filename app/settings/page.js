import { getProfile } from './actions'
import SettingsClient from './SettingsClient'
import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const profile = await getProfile()

  return <SettingsClient profile={profile} />
}
