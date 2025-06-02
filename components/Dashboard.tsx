import TodoList from './TodoList'

export default function Dashboard() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">NeoRythm Dashboard</h1>

      {/* Neue ToDo-Liste */}
      <section>
        <h2 className="text-xl font-semibold mb-2">📝 Lernaufgaben</h2>
        <TodoList />
      </section>
    </main>
  )
}