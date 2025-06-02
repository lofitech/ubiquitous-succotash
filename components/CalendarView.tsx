import { useState } from "react";
import Calendar, { CalendarTileProperties } from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const tileClassName = ({ date, view }: CalendarTileProperties) => {
    if (
      view === "month" &&
      date.toDateString() === selectedDate.toDateString()
    ) {
      return "bg-indigo-500 text-white rounded-full";
    }
    return null;
  };

  return (
    <div className="bg-neutral-900 p-4 rounded-xl shadow-md w-full max-w-md mx-auto text-white">
      <h3 className="text-lg font-bold mb-4">📅 Deine Lernaktivitäten</h3>
      <Calendar
        onChange={(value) => {
          if (value instanceof Date) {
            setSelectedDate(value);
          } else if (Array.isArray(value)) {
            setSelectedDate(value[0]);
          }
        }}
        value={selectedDate}
        tileClassName={tileClassName}
      />
    </div>
  );
}
