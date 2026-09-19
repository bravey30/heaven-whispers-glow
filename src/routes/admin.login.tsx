import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { adminLogin } from "@/lib/auth.server";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{ title: "Admin Sign In — Heaven Aesthetics" }],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await adminLogin({ data: { password } });
      if (!result.ok) {
        setError("Incorrect password.");
        return;
      }
      navigate({ to: "/admin" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm border border-border p-10">
        <p className="eyebrow">Heaven Aesthetics</p>
        <h1 className="display mt-3 text-3xl">Admin Sign In</h1>

        <label className="mt-8 block">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-3 w-full border-b border-border-gold bg-transparent pb-3 text-sm outline-none focus:border-gold"
            autoFocus
          />
        </label>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        <button type="submit" disabled={loading} className="btn-gold mt-8 w-full justify-center">
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </main>
  );
}
