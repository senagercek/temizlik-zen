import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAdminToken, verifyAdminToken } from "@/lib/adminAuth";

export default function AdminGuard() {
  const location = useLocation();
  const [status, setStatus] = useState<"checking" | "authed" | "unauth">("checking");

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      setStatus("unauth");
      return;
    }

    let cancelled = false;
    verifyAdminToken(token)
      .then((ok) => {
        if (cancelled) return;
        setStatus(ok ? "authed" : "unauth");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("unauth");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "checking") return null;

  if (status === "unauth") {
    return (
      <Navigate
        to="/admin/giris"
        replace
        state={{ from: location.pathname + location.search + location.hash }}
      />
    );
  }

  return <Outlet />;
}

