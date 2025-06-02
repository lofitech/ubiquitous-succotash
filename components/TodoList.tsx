import { useTodos } from '../hooks/useTodos'
import { supabase } from '../lib/supabase'

export default function TodoList() {
  const { todos, loading } = useTodos()

  const toggleComplete = async (id: string, current: boolean) => {
    await supabase
      .from('todo_items')
      .update({ completed: !current })
      .eq('id', id)
  }

  if (loading) return <p>Loading your tasks...</p>

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">📋 Your Learning Tasks</h2>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`p-3 rounded border flex items-center space-x-3 ${
              todo.completed ? 'bg-green-200' : 'bg-gray-800'
            }`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id, todo.completed)}
              className="h-4 w-4"
            />
            <div>
              <p className="text-white">{todo.title}</p>
              <p className="text-sm text-gray-400">
                {todo.source} — Phase {todo.phase}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
