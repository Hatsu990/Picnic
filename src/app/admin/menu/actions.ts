"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { updateMenuItem } from "@/lib/data";

const menuItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1),
  description: z.string().trim().min(1),
  price: z.coerce.number().int().min(0),
  minimumQuantity: z.coerce.number().int().min(1),
  sortOrder: z.coerce.number().int().min(0),
  isAvailable: z.boolean(),
});

export async function updateMenuItemAction(formData: FormData) {
  const parsed = menuItemSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    minimumQuantity: formData.get("minimumQuantity"),
    sortOrder: formData.get("sortOrder"),
    isAvailable: formData.get("isAvailable") === "on",
  });

  if (!parsed.success) {
    redirect("/admin/menu?error=menu");
  }

  await updateMenuItem(parsed.data);
  revalidatePath("/");
  revalidatePath("/menu");
  revalidatePath("/reserve");
  revalidatePath("/admin/menu");
  redirect("/admin/menu?updated=1");
}
