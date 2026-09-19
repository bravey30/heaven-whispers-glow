import { createClient } from "@supabase/supabase-js";
import type { Appointment, AppointmentStatus } from "@/lib/booking-schema";

// Hand-written in place of `supabase gen types` output (no live project to
// generate against yet) — just enough shape for the one table this app uses,
// so queries get real types instead of collapsing to `never`.
type AppointmentInsert = Omit<Appointment, "id" | "created_at" | "status"> & {
  id?: string;
  created_at?: string;
  status?: AppointmentStatus;
};

type Database = {
  public: {
    Tables: {
      appointments: {
        Row: Appointment;
        Insert: AppointmentInsert;
        Update: Partial<Appointment>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

let client: ReturnType<typeof createClient<Database>> | undefined;

// Service-role client — bypasses RLS, so this must never be imported from
// client code. `vite.config.ts`'s tanstackStart.importProtection blocks any
// `**/server/**` file (this one included) from reaching the browser bundle.
export function getSupabaseAdmin() {
  if (client) return client;

  const url = process.env["SUPABASE_URL"];
  const serviceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];

  if (!url || !serviceRoleKey) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set (see .env.example).");
  }

  client = createClient<Database>(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
