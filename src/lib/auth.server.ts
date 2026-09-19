import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { adminSession } from "./server/session";

export const adminLogin = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.object({ password: z.string() }).parse(input))
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_PASSWORD"];
    if (!expected) throw new Error("ADMIN_PASSWORD is not configured.");

    if (data.password !== expected) {
      return { ok: false as const };
    }

    const session = await adminSession();
    await session.update({ isAdmin: true });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await adminSession();
  await session.clear();
});

export const checkAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const session = await adminSession();
  return { isAdmin: session.data.isAdmin === true };
});
