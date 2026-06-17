export function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export function maskPhone(phone: string) {
  const normalized = normalizePhone(phone);
  if (normalized.length < 7) return phone;

  return `${normalized.slice(0, 3)}-****-${normalized.slice(-4)}`;
}
