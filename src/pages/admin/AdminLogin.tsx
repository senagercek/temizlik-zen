import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setAdminToken } from "@/lib/adminAuth";

type LocationState = { from?: string } | null;

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState)?.from ?? "/admin";

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const disabled = useMemo(() => loading || password.trim().length < 3, [loading, password]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || "Giriş başarısız.");
      }

      const json = (await res.json()) as { token?: string };
      if (!json.token) throw new Error("Token alınamadı.");

      setAdminToken(json.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Giriş başarısız.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-10">
      <div className="mx-auto w-full max-w-md">
        <Card className="p-6 shadow-card border-border/60">
          <h1 className="text-xl font-bold tracking-tight">Yönetim Paneli Girişi</h1>
          <p className="mt-1 text-sm text-muted-foreground">Devam etmek için şifreyi girin.</p>

          <form className="mt-6 space-y-3" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Şifre</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoFocus
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={disabled}>
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

