'use server'

import { createClient } from '@/lib/supabase'

export async function getProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) return null
  return data
}

export async function updateProfile(formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Not authenticated' }
  }

  const updates = {
    full_name: formData.get('full_name'),
    username: formData.get('username'),
    phone: formData.get('phone'),
    website: formData.get('website'),
    github_url: formData.get('github_url'),
    twitter_url: formData.get('twitter_url'),
    linkedin_url: formData.get('linkedin_url'),
    bio: formData.get('bio'),
    updated_at: new Date().toISOString()
  }

  // First check if profile exists
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .single()

  let error
  if (existingProfile) {
    // Update existing profile
    const result = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
    error = result.error
  } else {
    // Insert new profile
    const result = await supabase
      .from('profiles')
      .insert({ id: user.id, ...updates })
    error = result.error
  }

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function updateAvatar(file) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Not authenticated' }
  }

  const fileExt = file.name.split('.').pop()
  const fileName = `${user.id}-${Math.random()}.${fileExt}`
  const filePath = `avatars/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file)

  if (uploadError) {
    return { error: uploadError.message }
  }

  const { data: urlData } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath)

  const publicUrl = urlData.publicUrl

  // Check if profile exists
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .single()

  let updateError
  if (existingProfile) {
    const result = await supabase
      .from('profiles')
      .update({ avatar_url: publicUrl, updated_at: new Date().toISOString() })
      .eq('id', user.id)
    updateError = result.error
  } else {
    const result = await supabase
      .from('profiles')
      .insert({ id: user.id, avatar_url: publicUrl })
    updateError = result.error
  }

  if (updateError) {
    return { error: updateError.message }
  }

  return { success: true, avatarUrl: publicUrl }
}
