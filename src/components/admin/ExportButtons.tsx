import { pdf } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { appointmentsToCsv, downloadTextFile } from "@/lib/csv";
import { ReportDocument } from "./ReportDocument";
import type { Appointment } from "@/lib/booking-schema";

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

export function ExportButtons({ appointments }: { appointments: Appointment[] }) {
  async function exportPdf() {
    const blob = await pdf(<ReportDocument appointments={appointments} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `appointments-${todayStamp()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function exportCsv() {
    downloadTextFile(
      `appointments-${todayStamp()}.csv`,
      appointmentsToCsv(appointments),
      "text/csv;charset=utf-8;",
    );
  }

  return (
    <div className="flex gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={exportCsv}
        disabled={appointments.length === 0}
      >
        Export CSV
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={exportPdf}
        disabled={appointments.length === 0}
      >
        Export PDF
      </Button>
    </div>
  );
}
