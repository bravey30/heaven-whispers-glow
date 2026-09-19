import { useMemo } from "react";
import { isThisMonth, isThisWeek, parseISO } from "date-fns";
import type { Appointment } from "@/lib/booking-schema";

export function AnalyticsCards({ appointments }: { appointments: Appointment[] }) {
  const stats = useMemo(() => {
    let thisWeek = 0;
    let thisMonth = 0;
    const serviceCounts = new Map<string, number>();

    for (const a of appointments) {
      const date = parseISO(a.appointment_date);
      if (isThisWeek(date, { weekStartsOn: 1 })) thisWeek++;
      if (isThisMonth(date)) thisMonth++;
      serviceCounts.set(a.service_name, (serviceCounts.get(a.service_name) ?? 0) + 1);
    }

    let topService = "—";
    let topCount = 0;
    for (const [name, count] of serviceCounts) {
      if (count > topCount) {
        topService = name;
        topCount = count;
      }
    }

    return { total: appointments.length, thisWeek, thisMonth, topService };
  }, [appointments]);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Card label="Total Bookings" value={stats.total} />
      <Card label="This Week" value={stats.thisWeek} />
      <Card label="This Month" value={stats.thisMonth} />
      <Card label="Top Service" value={stats.topService} />
    </div>
  );
}

function Card({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border border-border p-5">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="display mt-2 truncate text-2xl">{value}</p>
    </div>
  );
}
