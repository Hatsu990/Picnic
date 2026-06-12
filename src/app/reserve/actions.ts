"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createReservation, getMenuItems } from "@/lib/data";

const reservationSchema = z.object({
  orderType: z.enum(["lunchbox", "catering"]),
  menuItemId: z.string().min(1),
  quantity: z.coerce.number().int().positive(),
  customerName: z.string().trim().min(2),
  customerPhone: z.string().trim().min(8),
  deliveryAddress: z.string().trim().min(5),
  deliveryDetailAddress: z.string().trim().optional().default(""),
  deliveryDate: z.string().min(10),
  deliveryTime: z.string().min(4),
  requestNote: z.string().trim().optional().default(""),
  paymentMethod: z.enum(["onsite", "bank_transfer", "consultation"]),
});

export async function createReservationAction(formData: FormData) {
  const parsed = reservationSchema.safeParse({
    orderType: formData.get("orderType"),
    menuItemId: formData.get("menuItemId"),
    quantity: formData.get("quantity"),
    customerName: formData.get("customerName"),
    customerPhone: formData.get("customerPhone"),
    deliveryAddress: formData.get("deliveryAddress"),
    deliveryDetailAddress: formData.get("deliveryDetailAddress"),
    deliveryDate: formData.get("deliveryDate"),
    deliveryTime: formData.get("deliveryTime"),
    requestNote: formData.get("requestNote"),
    paymentMethod: formData.get("paymentMethod"),
  });

  if (!parsed.success) {
    redirect("/reserve?error=필수 정보를 확인해 주세요.");
  }

  const menuItems = await getMenuItems();
  const menuItem = menuItems.find((item) => item.id === parsed.data.menuItemId);

  if (!menuItem || menuItem.type !== parsed.data.orderType) {
    redirect("/reserve?error=선택한 메뉴를 확인해 주세요.");
  }

  if (parsed.data.quantity < menuItem.minimumQuantity) {
    redirect(
      `/reserve?type=${menuItem.type}&menuItemId=${menuItem.id}&error=최소 주문 수량은 ${menuItem.minimumQuantity}개입니다.`,
    );
  }

  const reservation = await createReservation(parsed.data);

  revalidatePath("/admin");
  redirect(
    `/reserve/complete?reservationNumber=${encodeURIComponent(
      reservation.reservationNumber,
    )}`,
  );
}
