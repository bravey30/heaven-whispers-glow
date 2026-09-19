import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { Appointment } from "@/lib/booking-schema";

const styles = StyleSheet.create({
  page: { padding: 28, fontSize: 8.5, fontFamily: "Helvetica", color: "#0B0B0B" },
  eyebrow: {
    fontSize: 8,
    color: "#C8A96B",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  title: { fontSize: 16, marginBottom: 14 },
  headerRow: {
    flexDirection: "row",
    borderBottom: "1px solid #C8A96B",
    paddingBottom: 4,
    marginBottom: 2,
  },
  row: { flexDirection: "row", borderBottom: "1px solid #E5E5E5", paddingVertical: 4 },
  cell: { flex: 1, paddingRight: 4 },
  headerCell: { flex: 1, paddingRight: 4, color: "#C8A96B", fontWeight: 700 },
});

export function ReportDocument({ appointments }: { appointments: Appointment[] }) {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Text style={styles.eyebrow}>Heaven Aesthetics</Text>
        <Text style={styles.title}>Appointments Report ({appointments.length})</Text>

        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Date</Text>
          <Text style={styles.headerCell}>Time</Text>
          <Text style={styles.headerCell}>Service</Text>
          <Text style={styles.headerCell}>Client</Text>
          <Text style={styles.headerCell}>Phone</Text>
          <Text style={styles.headerCell}>Status</Text>
          <Text style={styles.headerCell}>Price</Text>
        </View>

        {appointments.map((a) => (
          <View style={styles.row} key={a.id}>
            <Text style={styles.cell}>{a.appointment_date}</Text>
            <Text style={styles.cell}>{a.appointment_time}</Text>
            <Text style={styles.cell}>{a.service_name}</Text>
            <Text style={styles.cell}>{a.full_name}</Text>
            <Text style={styles.cell}>{a.phone}</Text>
            <Text style={styles.cell}>{a.status}</Text>
            <Text style={styles.cell}>{a.service_price}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}
