import { SignJWT, jwtVerify } from "jose";

const encoder = new TextEncoder();

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export function getJwtSecretKey() {
  return encoder.encode(requireEnv("ADMIN_JWT_SECRET"));
}

export async function signAdminToken() {
  const secret = getJwtSecretKey();
  return await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyAdminToken(token: string) {
  const secret = getJwtSecretKey();
  await jwtVerify(token, secret, { algorithms: ["HS256"] });
}

