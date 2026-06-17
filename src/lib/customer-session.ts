export const CUSTOMER_SESSION_COOKIE = "picnic_customer_session";
export const GUEST_LOOKUP_COOKIE = "picnic_guest_lookup";
export const NAVER_STATE_COOKIE = "picnic_naver_oauth_state";
export const NAVER_NEXT_COOKIE = "picnic_naver_next";

export const CUSTOMER_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
export const GUEST_LOOKUP_MAX_AGE_SECONDS = 60 * 15;
export const NAVER_STATE_MAX_AGE_SECONDS = 60 * 10;

export type CustomerSessionPayload = {
  customerProfileId: string;
  provider: "naver";
  providerUserId: string;
};

export type GuestLookupPayload = {
  phone: string;
};

export function getCustomerSessionSecret() {
  return process.env.CUSTOMER_SESSION_SECRET ?? process.env.ADMIN_SESSION_SECRET;
}

export async function createCustomerSessionValue(
  payload: CustomerSessionPayload,
  secret: string,
) {
  return createSignedValue(payload, secret);
}

export async function verifyCustomerSessionValue(
  value: string | undefined,
  secret: string | undefined,
) {
  return verifySignedValue<CustomerSessionPayload>(
    value,
    secret,
    CUSTOMER_SESSION_MAX_AGE_SECONDS,
  );
}

export async function createGuestLookupValue(
  payload: GuestLookupPayload,
  secret: string,
) {
  return createSignedValue(payload, secret);
}

export async function verifyGuestLookupValue(
  value: string | undefined,
  secret: string | undefined,
) {
  return verifySignedValue<GuestLookupPayload>(
    value,
    secret,
    GUEST_LOOKUP_MAX_AGE_SECONDS,
  );
}

async function createSignedValue<TPayload extends object>(
  payload: TPayload,
  secret: string,
) {
  const issuedAt = Date.now();
  const body = base64UrlEncode(
    new TextEncoder().encode(JSON.stringify({ ...payload, issuedAt })),
  );
  const signature = await sign(body, secret);

  return `${body}.${signature}`;
}

async function verifySignedValue<TPayload>(
  value: string | undefined,
  secret: string | undefined,
  maxAgeSeconds: number,
) {
  if (!value || !secret) return null;

  const [body, signature] = value.split(".");
  if (!body || !signature) return null;

  const expectedSignature = await sign(body, secret);
  if (!constantTimeEqual(signature, expectedSignature)) return null;

  try {
    const decoded = JSON.parse(new TextDecoder().decode(base64UrlDecode(body)));
    if (!decoded.issuedAt || Date.now() - decoded.issuedAt > maxAgeSeconds * 1000) {
      return null;
    }

    delete decoded.issuedAt;
    return decoded as TPayload;
  } catch {
    return null;
  }
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

function base64UrlDecode(value: string) {
  const padded = value.padEnd(value.length + ((4 - (value.length % 4)) % 4), "=");
  const binary = atob(padded.replaceAll("-", "+").replaceAll("_", "/"));
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function constantTimeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;

  let diff = 0;
  for (let index = 0; index < left.length; index += 1) {
    diff |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return diff === 0;
}
