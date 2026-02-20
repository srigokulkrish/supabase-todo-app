import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import LandingClient from '@/components/LandingClient'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/todos')
  }

  return <LandingClient />;
}
