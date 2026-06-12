"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { updateReservationStatus } from "@/lib/data";

const statusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
});

export async function updateReservationStatusAction(formData: FormData) {
  const parsed = statusSchema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    redirect("/admin?error=상태 값을 확인해 주세요.");
  }

  await updateReservationStatus(parsed.data.id, parsed.data.status);

  revalidatePath("/admin");
  revalidatePath(`/admin/reservations/${parsed.data.id}`);
  redirect(`/admin/reservations/${parsed.data.id}`);
}
