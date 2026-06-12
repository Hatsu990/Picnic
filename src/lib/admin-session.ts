export const ADMIN_SESSION_COOKIE = "picnic_admin_session";
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;

export async function createAdminSessionValue(secret: string) {
  const issuedAt = Date.now();
  const signature = await sign(`${issuedAt}`, secret);
  return `${issuedAt}.${signature}`;
}

export async function verifyAdminSessionValue(
  value: string | undefined,
  secret: string | undefined,
) {
  if (!value || !secret) return false;

  const [issuedAtText, signature] = value.split(".");
  const issuedAt = Number(issuedAtText);

  if (!issuedAt || !signature) return false;
  if (Date.now() - issuedAt > ADMIN_SESSION_MAX_AGE_SECONDS * 1000) {
    return false;
  }

  const expectedSignature = await sign(issuedAtText, secret);
  return constantTimeEqual(signature, expectedSignature);
}

async function sign(value: string, secret: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return base64UrlEncode(new Uint8Array(signature));
}

function base64UrlEncode(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function constantTimeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;

  let diff = 0;
  for (let index = 0; index < left.length; index += 1) {
    diff |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return diff === 0;
}
