import CalendarView from '../../components/CalendarView'
import StatsOverview from '../../components/StatsOverview'

export default function DashboardPage() {
  return (
    <main className="p-8 bg-gray-900 min-h-screen text-white space-y-4">
      <h1 className="text-2xl font-bold">📊 Lern-Tracking Dashboard</h1>
      <StatsOverview />
      <CalendarView />
    </main>
  )
}
