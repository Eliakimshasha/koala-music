import crypto from "node:crypto";

const TEMP_ADMIN_EMAIL = process.env.TEMP_ADMIN_EMAIL || "";
const TEMP_ADMIN_PASSWORD = process.env.TEMP_ADMIN_PASSWORD || "";
const ADMIN_SETUP_SECRET =
  process.env.ADMIN_SETUP_SECRET || TEMP_ADMIN_PASSWORD || "koala-admin-secret";

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function sign(value) {
  return crypto
    .createHmac("sha256", ADMIN_SETUP_SECRET)
    .update(value)
    .digest("hex");
}

export function hasTemporaryAdminCredentials() {
  return Boolean(TEMP_ADMIN_EMAIL && TEMP_ADMIN_PASSWORD);
}

export function verifyTemporaryAdminCredentials(email, password) {
  return (
    normalizeEmail(email) === normalizeEmail(TEMP_ADMIN_EMAIL) &&
    String(password || "") === TEMP_ADMIN_PASSWORD
  );
}

export function createSetupToken(email) {
  const payload = {
    email: normalizeEmail(email),
    exp: Date.now() + 15 * 60 * 1000,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifySetupToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");
  const expectedSignature = sign(encodedPayload);

  if (
    !signature ||
    signature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    );

    if (!payload?.exp || payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
