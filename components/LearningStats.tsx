
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { supabase } from "../lib/supabase";

export default function LearningStats() {
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) return;

      const { data, error } = await supabase
        .from("learning_progress")
        .select("*")
        .eq("user_id", user.id);

      if (!error && data) {
        const done = data.filter((entry) => entry.completed).length;
        setCompleted(done);
        setTotal(data.length);
      }
    };

    fetchStats();
  }, []);

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <h2 className="text-xl font-bold">📊 Lernstatistik</h2>
        <p>Erledigte Module: {completed} von {total}</p>
        <div className="w-full bg-gray-700 h-2 rounded">
          <div className="bg-green-500 h-2 rounded" style={{ width: `${completionRate}%` }} />
        </div>
        <p className="text-sm text-gray-400">Fortschritt: {completionRate}%</p>
      </CardContent>
    </Card>
  );
}
