import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function StatsOverview() {
  const [logStats, setLogStats] = useState({
    total: 0,
    dailyAvg: 0,
    mostActiveDay: "",
  });

  useEffect(() => {
    const loadStats = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("logtimes")
        .select("timestamp")
        .eq("user_id", user.id);

      if (error || !data) return;

      const timestamps = data.map((d: any) => new Date(d.timestamp));
      const groupedByDay: Record<string, number> = {};

      timestamps.forEach(ts => {
        const day = ts.toISOString().split("T")[0];
        groupedByDay[day] = (groupedByDay[day] || 0) + 1;
      });

      const total = timestamps.length;
      const totalDays = Object.keys(groupedByDay).length;
      const dailyAvg = totalDays ? (total / totalDays).toFixed(2) : 0;

      const mostActiveDay = Object.entries(groupedByDay).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

      setLogStats({
        total,
        dailyAvg: Number(dailyAvg),
        mostActiveDay,
      });
    };

    loadStats();
  }, []);

  return (
    <div className="bg-gray-800 text-white p-4 rounded mt-4">
      <h3 className="text-lg font-bold mb-2">📈 Statistikübersicht</h3>
      <ul className="space-y-1">
        <li>Gesamte Einträge: <strong>{logStats.total}</strong></li>
        <li>Durchschnitt pro Tag: <strong>{logStats.dailyAvg}</strong></li>
        <li>Aktivster Tag: <strong>{logStats.mostActiveDay}</strong></li>
      </ul>
    </div>
  );
}
