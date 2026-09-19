import { useSession } from "@tanstack/react-start/server";

// Internal only — never imported directly from client code. The client-
// callable admin/appointment server functions (src/lib/auth.server.ts,
// src/lib/appointments.server.ts) call into this from within their own
// createServerFn handlers.

type AdminSessionData = { isAdmin?: boolean };

function sessionSecret() {
  const secret = process.env["SESSION_SECRET"];
  if (!secret || secret.length < 32) {
    throw new Error(
      "SESSION_SECRET must be set to a string of at least 32 characters (see .env.example).",
    );
  }
  return secret;
}

export function adminSession() {
  // Not a React hook — this is TanStack Start's server-side session API,
  // which happens to be named `useSession`.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSession<AdminSessionData>({
    password: sessionSecret(),
    name: "heaven_admin_session",
    maxAge: 60 * 60 * 8, // 8 hours
  });
}

// Guards admin-only server functions directly — a route's `beforeLoad` only
// keeps the page from rendering, it doesn't stop someone calling the
// server function's own endpoint straight from the network.
export async function requireAdminSession() {
  const session = await adminSession();
  if (session.data.isAdmin !== true) {
    throw new Error("Not authorized.");
  }
}
