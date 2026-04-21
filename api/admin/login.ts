import { signAdminToken } from "./_auth.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }

  const password = (req.body as { password?: string } | undefined)?.password ?? "";
  const expected = process.env.ADMIN_PASSWORD ?? "";

  if (!expected) {
    res.status(500).send("Server is not configured.");
    return;
  }

  if (password !== expected) {
    res.status(401).send("Şifre hatalı.");
    return;
  }

  const token = await signAdminToken();
  res.status(200).json({ token });
}

