
import { useState } from 'react'
import Calendar, { CalendarTileProperties } from 'react-calendar'
import type { Value } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Value>(new Date())

  const tileClassName = ({ date, view }: CalendarTileProperties) => {
    if (
      view === 'month' &&
      selectedDate instanceof Date &&
      date.toDateString() === selectedDate.toDateString()
    ) {
      return 'bg-blue-200 rounded-full'
    }
    return null
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-4">📅 Deine Lernaktivitäten</h3>
      <Calendar
        onChange={(value: Value) => setSelectedDate(value)}
        value={selectedDate}
        tileClassName={tileClassName}
        selectRange={false}
      />
    </div>
  )
}
