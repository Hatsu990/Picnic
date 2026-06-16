"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createReservation, getMenuItems } from "@/lib/data";
import {
  getKoreaDateValue,
  isPokeMenu,
  pokeDressings,
  pokeToppings,
  requiresAdvanceReservation,
} from "@/lib/reservation-options";

const reservationSchema = z.object({
  orderType: z.enum(["picnic", "lunchbox", "catering"]),
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

  if (requiresAdvanceReservation(menuItem.id)) {
    if (parsed.data.deliveryDate < getKoreaDateValue(1)) {
      redirect(
        `/reserve?type=${menuItem.type}&menuItemId=${menuItem.id}&error=예약 메뉴는 최소 하루 전 예약만 가능합니다.`,
      );
    }
  }

  let optionSummary = "";
  let extraAmount = 0;

  if (isPokeMenu(menuItem.id)) {
    const selectedDressings = formData
      .getAll("pokeDressings")
      .map(String)
      .filter((dressing) =>
        (pokeDressings as readonly string[]).includes(dressing),
      );

    const selectedToppings = pokeToppings
      .map((topping) => {
        const quantity = Number(formData.get(`topping-${topping.id}`) ?? 0);
        return {
          ...topping,
          quantity: Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 0,
        };
      })
      .filter((topping) => topping.quantity > 0);

    extraAmount = selectedToppings.reduce(
      (sum, topping) => sum + topping.price * topping.quantity,
      0,
    );

    const dressingText =
      selectedDressings.length > 0 ? selectedDressings.join(", ") : "선택 없음";
    const toppingText =
      selectedToppings.length > 0
        ? selectedToppings
            .map(
              (topping) =>
                `${topping.name} ${topping.quantity}회 (+${(
                  topping.price * topping.quantity
                ).toLocaleString("ko-KR")}원)`,
            )
            .join(", ")
        : "추가 없음";

    optionSummary = [
      "[포케 옵션]",
      `드레싱: ${dressingText}`,
      `토핑: ${toppingText}`,
      `추가금: ${extraAmount.toLocaleString("ko-KR")}원`,
    ].join("\n");
  }

  const reservation = await createReservation({
    ...parsed.data,
    optionSummary,
    extraAmount,
  });

  revalidatePath("/admin");
  redirect(
    `/reserve/complete?reservationNumber=${encodeURIComponent(
      reservation.reservationNumber,
    )}`,
  );
}
