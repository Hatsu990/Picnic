import type { CreateReservationInput, MenuItem, Reservation } from "./types";

export const demoMenuItems: MenuItem[] = [
  {
    id: "lunchbox-balanced",
    type: "lunchbox",
    category: "도시락",
    name: "밸런스 도시락",
    description: "구운 닭가슴살, 계절 채소, 잡곡밥으로 구성한 기본 도시락",
    price: 12000,
    imageUrl: "/images/lunchbox.png",
    minimumQuantity: 5,
    isAvailable: true,
  },
  {
    id: "lunchbox-premium",
    type: "lunchbox",
    category: "도시락",
    name: "프리미엄 도시락",
    description: "불고기, 새우, 반찬 5종을 담은 행사/회의용 도시락",
    price: 18000,
    imageUrl: "/images/lunchbox.png",
    minimumQuantity: 8,
    isAvailable: true,
  },
  {
    id: "lunchbox-veggie",
    type: "lunchbox",
    category: "도시락",
    name: "베지 도시락",
    description: "두부 스테이크와 구운 채소를 중심으로 만든 채식 도시락",
    price: 14000,
    imageUrl: "/images/lunchbox.png",
    minimumQuantity: 5,
    isAvailable: true,
  },
  {
    id: "lunchbox-kids",
    type: "lunchbox",
    category: "도시락",
    name: "키즈 도시락",
    description: "소풍과 체험학습에 맞춘 한입 크기 구성",
    price: 10000,
    imageUrl: "/images/lunchbox.png",
    minimumQuantity: 10,
    isAvailable: true,
  },
  {
    id: "catering-brunch",
    type: "catering",
    category: "케이터링",
    name: "브런치 케이터링",
    description: "샌드위치, 샐러드, 과일, 음료를 포함한 가벼운 행사 구성",
    price: 28000,
    imageUrl: "/images/catering.png",
    minimumQuantity: 15,
    isAvailable: true,
  },
  {
    id: "catering-meeting",
    type: "catering",
    category: "케이터링",
    name: "회의 케이터링",
    description: "회의와 세미나에 맞춘 도시락, 핑거푸드, 음료 패키지",
    price: 35000,
    imageUrl: "/images/catering.png",
    minimumQuantity: 20,
    isAvailable: true,
  },
  {
    id: "catering-premium",
    type: "catering",
    category: "케이터링",
    name: "프리미엄 케이터링",
    description: "브랜드 행사와 VIP 모임을 위한 고급 케이터링 구성",
    price: 52000,
    imageUrl: "/images/catering.png",
    minimumQuantity: 20,
    isAvailable: true,
  },
];

const reservations: Reservation[] = [
  buildDemoReservation({
    orderType: "lunchbox",
    menuItemId: "lunchbox-premium",
    quantity: 12,
    customerName: "김민지",
    customerPhone: "010-1234-5678",
    deliveryAddress: "서울시 마포구 월드컵북로 10",
    deliveryDetailAddress: "3층 회의실",
    deliveryDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    deliveryTime: "12:00",
    requestNote: "고기 메뉴 위주로 부탁드립니다.",
    paymentMethod: "bank_transfer",
  }),
];

export function getDemoMenuItems() {
  return demoMenuItems;
}

export function createDemoReservation(input: CreateReservationInput) {
  const reservation = buildDemoReservation(input);
  reservations.unshift(reservation);
  return reservation;
}

export function getDemoReservations() {
  return reservations;
}

export function getDemoReservationById(id: string) {
  return reservations.find((reservation) => reservation.id === id) ?? null;
}

export function updateDemoReservationStatus(
  id: string,
  status: Reservation["reservationStatus"],
) {
  const reservation = getDemoReservationById(id);
  if (!reservation) return null;

  reservation.reservationStatus = status;
  reservation.updatedAt = new Date().toISOString();
  return reservation;
}

function buildDemoReservation(input: CreateReservationInput): Reservation {
  const menuItem = demoMenuItems.find((item) => item.id === input.menuItemId);
  if (!menuItem) {
    throw new Error("선택한 메뉴를 찾을 수 없습니다.");
  }

  const now = new Date();
  const lineTotal = menuItem.price * input.quantity;
  const id = crypto.randomUUID();

  return {
    id,
    reservationNumber: `PIC-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${id.slice(0, 6).toUpperCase()}`,
    orderType: input.orderType,
    customerName: input.customerName,
    customerPhone: input.customerPhone,
    deliveryAddress: input.deliveryAddress,
    deliveryDetailAddress: input.deliveryDetailAddress,
    deliveryDate: input.deliveryDate,
    deliveryTime: input.deliveryTime,
    requestNote: input.requestNote,
    paymentMethod: input.paymentMethod,
    reservationStatus: "pending",
    paymentStatus: null,
    couponCode: null,
    notificationStatus: null,
    reviewStatus: null,
    totalAmount: lineTotal,
    items: [
      {
        id: crypto.randomUUID(),
        menuItemId: menuItem.id,
        menuNameSnapshot: menuItem.name,
        unitPriceSnapshot: menuItem.price,
        quantity: input.quantity,
        lineTotal,
      },
    ],
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };
}
