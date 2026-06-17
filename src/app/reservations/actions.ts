"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  createGuestLookupValue,
  getCustomerSessionSecret,
  GUEST_LOOKUP_COOKIE,
  GUEST_LOOKUP_MAX_AGE_SECONDS,
} from "@/lib/customer-session";
import { normalizePhone } from "@/lib/phone";

const lookupSchema = z.object({
  phone: z.string().trim().min(8),
});

export async function lookupReservationsAction(formData: FormData) {
  const parsed = lookupSchema.safeParse({
    phone: formData.get("phone"),
  });
  const secret = getCustomerSessionSecret();

  if (!parsed.success || !secret) {
    redirect("/reservations?error=lookup-failed");
  }

  const phone = normalizePhone(parsed.data.phone);
  const cookieStore = await cookies();
  const value = await createGuestLookupValue({ phone }, secret);
  cookieStore.set(GUEST_LOOKUP_COOKIE, value, {
    httpOnly: true,
    maxAge: GUEST_LOOKUP_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/reservations");
}

export async function clearReservationLookupAction() {
  const cookieStore = await cookies();
  cookieStore.delete(GUEST_LOOKUP_COOKIE);
  redirect("/reservations");
}
