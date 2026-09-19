import { useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format, startOfDay, subDays } from "date-fns";
import type { Appointment } from "@/lib/booking-schema";

export function BookingsChart({ appointments }: { appointments: Appointment[] }) {
  const data = useMemo(() => {
    const days = Array.from({ length: 14 }, (_, i) => {
      const date = startOfDay(subDays(new Date(), 13 - i));
      return { key: format(date, "yyyy-MM-dd"), label: format(date, "MMM d"), count: 0 };
    });
    const byKey = new Map(days.map((d) => [d.key, d]));
    for (const a of appointments) {
      const bucket = byKey.get(a.created_at.slice(0, 10));
      if (bucket) bucket.count++;
    }
    return days;
  }, [appointments]);

  return (
    <div className="h-56 border border-border p-4">
      <p className="mb-4 text-xs uppercase tracking-wide text-muted-foreground">
        Bookings — last 14 days
      </p>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <XAxis dataKey="label" tick={{ fontSize: 10 }} interval={1} />
          <YAxis allowDecimals={false} tick={{ fontSize: 10 }} width={24} />
          <Tooltip />
          <Bar dataKey="count" fill="#C8A96B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
