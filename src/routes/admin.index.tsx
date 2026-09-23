import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminLogout, checkAdminSession } from "@/lib/auth.server";
import { listAppointments, type AppointmentSortField } from "@/lib/appointments.server";
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

const PAGE_SIZE = 10;

const sortOptions = [
  {
    value: "appointment_date-desc",
    label: "Appointment date (newest)",
    sortBy: "appointment_date",
    sortDir: "desc",
  },
  {
    value: "appointment_date-asc",
    label: "Appointment date (oldest)",
    sortBy: "appointment_date",
    sortDir: "asc",
  },
  {
    value: "created_at-desc",
    label: "Booked (newest first)",
    sortBy: "created_at",
    sortDir: "desc",
  },
  { value: "created_at-asc", label: "Booked (oldest first)", sortBy: "created_at", sortDir: "asc" },
  { value: "full_name-asc", label: "Client name (A–Z)", sortBy: "full_name", sortDir: "asc" },
  { value: "full_name-desc", label: "Client name (Z–A)", sortBy: "full_name", sortDir: "desc" },
  { value: "status-asc", label: "Status (A–Z)", sortBy: "status", sortDir: "asc" },
] as const satisfies ReadonlyArray<{
  value: string;
  label: string;
  sortBy: AppointmentSortField;
  sortDir: "asc" | "desc";
}>;

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
  const [sortValue, setSortValue] =
    useState<(typeof sortOptions)[number]["value"]>("appointment_date-desc");
  const [page, setPage] = useState(1);

  const sort = sortOptions.find((o) => o.value === sortValue) ?? sortOptions[0];

  const {
    data: appointments = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admin-appointments", statusFilter, sort.sortBy, sort.sortDir],
    queryFn: () =>
      listAppointments({
        data: {
          ...(statusFilter === "all" ? {} : { status: statusFilter }),
          sortBy: sort.sortBy,
          sortDir: sort.sortDir,
        },
      }),
  });

  // Filter/sort changes reshuffle the result set, so the current page no
  // longer means the same thing — jump back to the top rather than showing
  // a stale slice.
  useEffect(() => {
    setPage(1);
  }, [statusFilter, sort.sortBy, sort.sortDir]);

  const totalPages = Math.max(1, Math.ceil(appointments.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedAppointments = appointments.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

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
          <div className="flex flex-wrap items-center gap-3">
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

            <Select
              value={sortValue}
              onValueChange={(v) => setSortValue(v as (typeof sortOptions)[number]["value"])}
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ExportButtons appointments={appointments} />
        </div>

        <div className="mt-4">
          {isLoading ? (
            <p className="py-10 text-center text-sm text-muted-foreground">Loading…</p>
          ) : isError ? (
            <p className="border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
              Couldn't load appointments:{" "}
              {error instanceof Error ? error.message : "Unknown error."}
            </p>
          ) : (
            <>
              <AppointmentsTable
                appointments={pagedAppointments}
                onStatusChanged={() => refetch()}
              />
              {appointments.length > 0 && (
                <div className="mt-4 flex items-center justify-between gap-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * PAGE_SIZE + 1}–
                    {Math.min(currentPage * PAGE_SIZE, appointments.length)} of{" "}
                    {appointments.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      Previous
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage >= totalPages}
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
