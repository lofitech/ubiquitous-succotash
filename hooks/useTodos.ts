import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useTodos() {
  const [todos, setTodos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase.from('todo_items').select('*')
      if (!error) setTodos(data || [])
      setLoading(false)
    }

    fetchTodos()
  }, [])

  return { todos, loading }
}
