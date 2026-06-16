import type { OrderType, PaymentMethod, ReservationStatus } from "./types";

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatOrderType(type: OrderType) {
  const labels: Record<OrderType, string> = {
    picnic: "소풍 메뉴",
    lunchbox: "도시락",
    catering: "예약 메뉴",
  };
  return labels[type];
}

export function formatPaymentMethod(method: PaymentMethod) {
  const labels: Record<PaymentMethod, string> = {
    onsite: "현장 결제",
    bank_transfer: "계좌이체 안내",
    consultation: "상담 후 확정",
  };
  return labels[method];
}

export function formatReservationStatus(status: ReservationStatus) {
  const labels: Record<ReservationStatus, string> = {
    pending: "대기",
    confirmed: "확정",
    completed: "완료",
    cancelled: "취소",
  };
  return labels[status];
}

export function formatDateTime(date: string, time: string) {
  return `${date} ${time}`;
}
