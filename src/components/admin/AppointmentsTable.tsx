import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AppointmentDetailSheet } from "./AppointmentDetailSheet";
import {
  appointmentStatuses,
  type Appointment,
  type AppointmentStatus,
} from "@/lib/booking-schema";
import { updateAppointmentStatus } from "@/lib/appointments.server";

export function AppointmentsTable({
  appointments,
  onStatusChanged,
}: {
  appointments: Appointment[];
  onStatusChanged: () => void;
}) {
  const [detailId, setDetailId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function handleStatusChange(id: string, status: AppointmentStatus) {
    setUpdatingId(id);
    try {
      await updateAppointmentStatus({ data: { id, status } });
      onStatusChanged();
    } finally {
      setUpdatingId(null);
    }
  }

  const detailAppointment = appointments.find((a) => a.id === detailId) ?? null;

  return (
    <div className="border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((a) => (
            <TableRow key={a.id}>
              <TableCell>{a.appointment_date}</TableCell>
              <TableCell>{a.appointment_time}</TableCell>
              <TableCell>{a.service_name}</TableCell>
              <TableCell>{a.full_name}</TableCell>
              <TableCell>{a.phone}</TableCell>
              <TableCell>
                <Select
                  value={a.status}
                  onValueChange={(status) => handleStatusChange(a.id, status as AppointmentStatus)}
                  disabled={updatingId === a.id}
                >
                  <SelectTrigger className="h-8 w-[130px] capitalize">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentStatuses.map((s) => (
                      <SelectItem key={s} value={s} className="capitalize">
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" onClick={() => setDetailId(a.id)}>
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {appointments.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                No appointments yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <AppointmentDetailSheet
        appointment={detailAppointment}
        onOpenChange={(open) => !open && setDetailId(null)}
      />
    </div>
  );
}
