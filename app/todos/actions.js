'use server'

import { createClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

// --- LIST ACTIONS ---

export async function getLists() {
  const supabase = await createClient()
  const { data: lists } = await supabase
    .from('todo_lists')
    .select('*')
    .order('created_at', { ascending: false })
  
  return lists || []
}

export async function createList(formData) {
  const supabase = await createClient()
  
  const title = formData.get('title')
  const description = formData.get('description')
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase.from('todo_lists').insert({
    title,
    description,
    user_id: user.id,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/todos')
}

export async function deleteList(id) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('todo_lists')
    .delete()
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/todos')
}

export async function updateList(id, title, description) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('todo_lists')
    .update({ title, description })
    .eq('id', id)
    .select()

  if (error) {
    return { error: error.message }
  }

  if (data && data.length === 0) {
    return { error: 'Update failed: Row not found or permission denied (RLS)' }
  }

  revalidatePath('/todos')
}

// --- TODO ACTIONS ---

export async function getTodos(listId) {
  const supabase = await createClient()
  const { data: todos } = await supabase
    .from('todos')
    .select('*')
    .eq('list_id', listId)
    .order('created_at', { ascending: false })
  
  return todos || []
}

export async function addTodo(formData) {
  const supabase = await createClient()
  
  const title = formData.get('title')
  const description = formData.get('description')
  const list_id = formData.get('list_id')

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase.from('todos').insert({
    title,
    description,
    list_id,
    user_id: user.id,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/todos/${list_id}`)
}

export async function updateTodoStatus(id, completed, listId) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('todos')
    .update({ completed })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/todos/${listId}`)
}

export async function deleteTodo(id, listId) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/todos/${listId}`)
}

export async function updateTodo(id, title, description, listId) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('todos')
    .update({ title, description })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/todos/${listId}`)
}
