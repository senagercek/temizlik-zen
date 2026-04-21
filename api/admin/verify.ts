import { verifyAdminToken } from "./_auth.js";

export default async function handler(req: any, res: any) {
  const auth = req.headers.authorization ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice("Bearer ".length) : "";

  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }

  try {
    await verifyAdminToken(token);
    res.status(200).json({ ok: true });
  } catch {
    res.status(401).send("Unauthorized");
  }
}

