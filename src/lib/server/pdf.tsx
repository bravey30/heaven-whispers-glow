import { Document, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer";
import type { Appointment } from "@/lib/booking-schema";

// Standard PDF fonts only (Helvetica) — no custom font files to embed. Google
// Fonts' CSS endpoint doesn't serve raw font files, so matching the site's
// display font here isn't worth the extra bundling/cold-start risk; brand
// colors on a clean standard font read fine for an internal/attachment PDF.
const styles = StyleSheet.create({
  page: { padding: 36, fontSize: 10.5, fontFamily: "Helvetica", color: "#0B0B0B" },
  eyebrow: {
    fontSize: 9,
    color: "#C8A96B",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  title: { fontSize: 20, marginBottom: 20 },
  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 10,
    color: "#C8A96B",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottom: "1px solid #C8A96B",
    paddingBottom: 4,
  },
  row: { flexDirection: "row", marginBottom: 4 },
  label: { width: 160, color: "#666666" },
  value: { flex: 1 },
});

function Row({ label, value }: { label: string; value?: string | number | null }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{String(value)}</Text>
    </View>
  );
}

function AppointmentDocument({ appt }: { appt: Appointment }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.eyebrow}>Heaven Aesthetics</Text>
        <Text style={styles.title}>Appointment Summary</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service</Text>
          <Row label="Treatment" value={appt.service_name} />
          <Row label="Price" value={appt.service_price} />
          <Row label="Date" value={appt.appointment_date} />
          <Row label="Time" value={appt.appointment_time} />
          <Row label="Status" value={appt.status} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Client</Text>
          <Row label="Full name" value={appt.full_name} />
          <Row label="Phone" value={appt.phone} />
          <Row label="Email" value={appt.email} />
          <Row label="Age" value={appt.age} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skin Profile</Text>
          <Row label="Skin type" value={appt.skin_type} />
          <Row label="Main concern" value={appt.main_concern} />
          <Row label="Skin goals" value={appt.skin_goals} />
          <Row label="Current products" value={appt.current_products} />
          <Row label="Last facial treatment" value={appt.last_facial_date} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health &amp; Safety</Text>
          <Row label="Allergies / reactions" value={appt.allergies} />
          <Row label="Current medication" value={appt.current_medication} />
          <Row label="Pregnant / breastfeeding" value={appt.pregnancy_status} />
        </View>

        {appt.payment_account || appt.payment_sender_name ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment</Text>
            <Row label="Paid to" value={appt.payment_account} />
            <Row label="Sender name" value={appt.payment_sender_name} />
          </View>
        ) : null}

        {appt.notes ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text>{appt.notes}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}

export async function renderAppointmentPdf(appt: Appointment): Promise<Buffer> {
  const stream = await pdf(<AppointmentDocument appt={appt} />).toBuffer();
  const chunks: Buffer[] = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}
