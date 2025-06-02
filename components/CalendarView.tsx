import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { supabase } from "../lib/supabase";

export default function CalendarView() {
  const [logDates, setLogDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("logtimes")
        .select("timestamp")
        .eq("user_id", user.id);

      if (!error && data) {
        const dates = data.map((entry: any) => new Date(entry.timestamp));
        setLogDates(dates);
      }
    };
    fetchData();
  }, []);

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month" && logDates.find(d => d.toDateString() === date.toDateString())) {
      return "bg-green-500 text-white rounded";
    }
    return null;
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded mt-4">
      <h3 className="text-lg font-bold mb-4">📅 Deine Lernaktivitäten</h3>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={tileClassName}
      />
    </div>
  );
}
