import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminLogout, checkAdminSession } from "@/lib/auth.server";
import { listAppointments } from "@/lib/appointments.server";
import { AnalyticsCards } from "@/components/admin/AnalyticsCards";
import { BookingsChart } from "@/components/admin/BookingsChart";
import { AppointmentsTable } from "@/components/admin/AppointmentsTable";
import { ExportButtons } from "@/components/admin/ExportButtons";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { appointmentStatuses, type AppointmentStatus } from "@/lib/booking-schema";

export const Route = createFileRoute("/admin/")({
  beforeLoad: async () => {
    const { isAdmin } = await checkAdminSession();
    if (!isAdmin) {
      throw redirect({ to: "/admin/login" });
    }
  },
  head: () => ({
    meta: [{ title: "Admin — Heaven Aesthetics" }],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "all">("all");

  const {
    data: appointments = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admin-appointments", statusFilter],
    queryFn: () =>
      listAppointments({ data: statusFilter === "all" ? {} : { status: statusFilter } }),
  });

  async function handleLogout() {
    await adminLogout();
    navigate({ to: "/admin/login" });
  }

  return (
    <main className="min-h-screen bg-background pt-32">
      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Heaven Aesthetics</p>
            <h1 className="display mt-2 text-4xl">Appointments</h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Log out
          </Button>
        </div>

        <div className="mt-10">
          <AnalyticsCards appointments={appointments} />
        </div>

        <div className="mt-6">
          <BookingsChart appointments={appointments} />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as AppointmentStatus | "all")}
          >
            <SelectTrigger className="w-[160px] capitalize">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {appointmentStatuses.map((s) => (
                <SelectItem key={s} value={s} className="capitalize">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <ExportButtons appointments={appointments} />
        </div>

        <div className="mt-4">
          {isLoading ? (
            <p className="py-10 text-center text-sm text-muted-foreground">Loading…</p>
          ) : isError ? (
            <p className="border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
              Couldn't load appointments: {error instanceof Error ? error.message : "Unknown error."}
            </p>
          ) : (
            <AppointmentsTable appointments={appointments} onStatusChanged={() => refetch()} />
          )}
        </div>
      </section>
    </main>
  );
}
