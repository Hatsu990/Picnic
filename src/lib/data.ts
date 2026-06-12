import {
  createDemoReservation,
  getDemoMenuItems,
  getDemoReservationById,
  getDemoReservations,
  updateDemoReservationStatus,
} from "./demo-data";
import { createSupabaseAdminClient } from "./supabase";
import type {
  CreateReservationInput,
  MenuItem,
  Reservation,
  ReservationStatus,
} from "./types";

export async function getMenuItems(): Promise<MenuItem[]> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return getDemoMenuItems();

  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("is_available", true)
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);

  return data.map((item) => ({
    id: item.id,
    type: item.type,
    category: item.category ?? item.type,
    name: item.name,
    description: item.description,
    price: item.price,
    imageUrl: item.image_url ?? (item.type === "lunchbox" ? "/images/lunchbox.png" : "/images/catering.png"),
    minimumQuantity: item.minimum_quantity,
    isAvailable: item.is_available,
  }));
}

export async function createReservation(
  input: CreateReservationInput,
): Promise<Reservation> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return createDemoReservation(input);

  const menuItems = await getMenuItems();
  const menuItem = menuItems.find((item) => item.id === input.menuItemId);
  if (!menuItem) throw new Error("선택한 메뉴를 찾을 수 없습니다.");

  const now = new Date();
  const reservationId = crypto.randomUUID();
  const reservationNumber = `PIC-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${reservationId.slice(0, 6).toUpperCase()}`;
  const totalAmount = menuItem.price * input.quantity;

  const { data: reservation, error: reservationError } = await supabase
    .from("reservations")
    .insert({
      id: reservationId,
      reservation_number: reservationNumber,
      order_type: input.orderType,
      customer_name: input.customerName,
      customer_phone: input.customerPhone,
      delivery_address: input.deliveryAddress,
      delivery_detail_address: input.deliveryDetailAddress,
      delivery_date: input.deliveryDate,
      delivery_time: input.deliveryTime,
      request_note: input.requestNote,
      payment_method: input.paymentMethod,
      reservation_status: "pending",
      total_amount: totalAmount,
    })
    .select()
    .single();

  if (reservationError) throw new Error(reservationError.message);

  const { error: itemError } = await supabase.from("reservation_items").insert({
    reservation_id: reservationId,
    menu_item_id: menuItem.id,
    menu_name_snapshot: menuItem.name,
    unit_price_snapshot: menuItem.price,
    quantity: input.quantity,
    line_total: totalAmount,
  });

  if (itemError) throw new Error(itemError.message);

  return {
    id: reservation.id,
    reservationNumber: reservation.reservation_number,
    orderType: reservation.order_type,
    customerName: reservation.customer_name,
    customerPhone: reservation.customer_phone,
    deliveryAddress: reservation.delivery_address,
    deliveryDetailAddress: reservation.delivery_detail_address ?? "",
    deliveryDate: reservation.delivery_date,
    deliveryTime: reservation.delivery_time,
    requestNote: reservation.request_note ?? "",
    paymentMethod: reservation.payment_method,
    reservationStatus: reservation.reservation_status,
    paymentStatus: reservation.payment_status,
    couponCode: reservation.coupon_code,
    notificationStatus: reservation.notification_status,
    reviewStatus: reservation.review_status,
    totalAmount: reservation.total_amount,
    items: [
      {
        id: crypto.randomUUID(),
        menuItemId: menuItem.id,
        menuNameSnapshot: menuItem.name,
        unitPriceSnapshot: menuItem.price,
        quantity: input.quantity,
        lineTotal: totalAmount,
      },
    ],
    createdAt: reservation.created_at,
    updatedAt: reservation.updated_at,
  };
}

export async function getReservations(status?: ReservationStatus) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    const reservations = getDemoReservations();
    return status
      ? reservations.filter((reservation) => reservation.reservationStatus === status)
      : reservations;
  }

  let query = supabase
    .from("reservations")
    .select("*, reservation_items(*)")
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("reservation_status", status);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  return data.map(mapReservationRow);
}

export async function getReservationById(id: string) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return getDemoReservationById(id);

  const { data, error } = await supabase
    .from("reservations")
    .select("*, reservation_items(*)")
    .eq("id", id)
    .single();

  if (error) return null;
  return mapReservationRow(data);
}

export async function updateReservationStatus(
  id: string,
  status: ReservationStatus,
) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return updateDemoReservationStatus(id, status);

  const { data, error } = await supabase
    .from("reservations")
    .update({ reservation_status: status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*, reservation_items(*)")
    .single();

  if (error) throw new Error(error.message);
  return mapReservationRow(data);
}

function mapReservationRow(row: any): Reservation {
  const items = row.reservation_items ?? [];

  return {
    id: row.id,
    reservationNumber: row.reservation_number,
    orderType: row.order_type,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    deliveryAddress: row.delivery_address,
    deliveryDetailAddress: row.delivery_detail_address ?? "",
    deliveryDate: row.delivery_date,
    deliveryTime: row.delivery_time,
    requestNote: row.request_note ?? "",
    paymentMethod: row.payment_method,
    reservationStatus: row.reservation_status,
    paymentStatus: row.payment_status,
    couponCode: row.coupon_code,
    notificationStatus: row.notification_status,
    reviewStatus: row.review_status,
    totalAmount: row.total_amount,
    items: items.map((item: any) => ({
      id: item.id,
      menuItemId: item.menu_item_id,
      menuNameSnapshot: item.menu_name_snapshot,
      unitPriceSnapshot: item.unit_price_snapshot,
      quantity: item.quantity,
      lineTotal: item.line_total,
    })),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
