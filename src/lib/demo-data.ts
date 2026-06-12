import type { CreateReservationInput, MenuItem, Reservation } from "./types";

export const demoMenuItems: MenuItem[] = [
  {
    id: "poke-salmon",
    type: "picnic",
    category: "포케",
    name: "연어 포케",
    description: "신선한 연어를 올린 소풍 대표 포케",
    price: 15000,
    imageUrl: "/images/lunchbox.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "poke-pork-neck",
    type: "picnic",
    category: "포케",
    name: "목살 포케",
    description: "든든하게 즐기는 목살 포케",
    price: 12000,
    imageUrl: "/images/lunchbox.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "poke-shrimp",
    type: "picnic",
    category: "포케",
    name: "새우 포케",
    description: "탱글한 새우를 담은 산뜻한 포케",
    price: 12000,
    imageUrl: "/images/lunchbox.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "poke-bulgogi",
    type: "picnic",
    category: "포케",
    name: "불고기 포케",
    description: "달콤짭짤한 불고기를 담은 포케",
    price: 12000,
    imageUrl: "/images/lunchbox.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "poke-chicken-breast",
    type: "picnic",
    category: "포케",
    name: "닭가슴살 포케",
    description: "가볍고 균형 잡힌 닭가슴살 포케",
    price: 12000,
    imageUrl: "/images/lunchbox.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "coffee-hand-drip-hot",
    type: "picnic",
    category: "커피",
    name: "핸드드립 hot",
    description: "따뜻하게 즐기는 핸드드립 커피",
    price: 4000,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "coffee-hand-drip-iced",
    type: "picnic",
    category: "커피",
    name: "핸드드립 iced",
    description: "차갑게 즐기는 핸드드립 커피",
    price: 4500,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "coffee-cafe-au-lait-iced",
    type: "picnic",
    category: "커피",
    name: "카페오레",
    description: "아이스 전용 카페오레",
    price: 4800,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "coffee-mixcream-latte-iced",
    type: "picnic",
    category: "커피",
    name: "믹스크림라떼",
    description: "아이스 전용 믹스크림라떼",
    price: 4500,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "tea-orange-icecream",
    type: "picnic",
    category: "블렌딩 티",
    name: "오렌지 아이스크림",
    description:
      "과일이 통째로 들어간 과일 블렌딩 티로 오렌지의 쥬시함이 그대로 느껴지는 과일 허브차",
    price: 4500,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "tea-flower-garden",
    type: "picnic",
    category: "블렌딩 티",
    name: "플라워가든",
    description:
      "봄향기 가득한 정원에서 꽃잎을 정성스레 따온 듯한 향긋한 과일 블렌드티",
    price: 4500,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "tea-pink-grapefruit-blossom",
    type: "picnic",
    category: "블렌딩 티",
    name: "핑크자몽블라썸",
    description:
      "레몬그라스의 은은한 레몬향과 자몽에서 주는 신선함과 상큼함이 블렌딩된 자몽허브티",
    price: 4500,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "tea-chamomile",
    type: "picnic",
    category: "허브차",
    name: "캐모마일",
    description:
      "사과같은 캐모마일 향이 은은하게 풍기면서 캐모마일 자체의 순수한 단맛이 느껴지는 꽃차",
    price: 3500,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "tea-mint",
    type: "picnic",
    category: "허브차",
    name: "민트",
    description:
      "페퍼민트와 레몬그라스의 완벽한 조합, 입안 가득 상쾌함이 느껴지는 허브차",
    price: 3500,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "tea-hibiscus",
    type: "picnic",
    category: "허브차",
    name: "히비스커스",
    description:
      "루비와 같은 붉은 수색에 히비스커스의 강렬한 신맛과 순수 단맛이 느껴지는 허브차",
    price: 3500,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "tea-mix-berry",
    type: "picnic",
    category: "블렌딩 티",
    name: "믹스베리",
    description:
      "상큼한 사우어 라즈베리티에 세 가지 베리청이 어우러진 진하게 즐기는 과일 블렌딩티",
    price: 5000,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "tea-peach-and-lychee",
    type: "picnic",
    category: "블렌딩 티",
    name: "피치 앤 리치",
    description:
      "잘 익은 복숭아의 부드러운 달콤함에 리치의 은은하고 이국적인 향을 더한 과일 블렌딩티",
    price: 5000,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "tea-green-mint",
    type: "picnic",
    category: "블렌딩 티",
    name: "그린민트",
    description:
      "민트티의 깔끔한 향과 청사과의 상큼한 달콤함이 입 안을 산뜻하게 깨워주는 청량 과일티",
    price: 5000,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "latte-matcha-strawberry",
    type: "picnic",
    category: "라떼",
    name: "말차딸기라떼",
    description:
      "슈퍼말차의 은은한 쌉쌀함에 수제 딸기청의 달콤함이 더해져 부드럽게 어우러지는 조화로운 라떼",
    price: 6000,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "latte-matcha",
    type: "picnic",
    category: "라떼",
    name: "말차라떼",
    description:
      "프리미엄 슈퍼말차를 사용해 말차 본연의 은은한 쌉쌀함과 고소한 우유가 조화로운 말차라떼",
    price: 5000,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "latte-strawberry",
    type: "picnic",
    category: "라떼",
    name: "딸기라떼",
    description:
      "정성껏 만든 수제 딸기청을 담아 우유와 부드럽게 어우러진 클래식한 딸기라떼",
    price: 5000,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "latte-chocolate",
    type: "picnic",
    category: "라떼",
    name: "초코라떼",
    description: "부드럽고 달콤하게 즐기는 초코라떼",
    price: 4000,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "ade-grapefruit",
    type: "picnic",
    category: "에이드",
    name: "자몽에이드",
    description: "상큼한 자몽에이드",
    price: 4500,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "ade-lemon",
    type: "picnic",
    category: "에이드",
    name: "레몬에이드",
    description: "청량하게 즐기는 레몬에이드",
    price: 4500,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "ade-green-grape",
    type: "picnic",
    category: "에이드",
    name: "청포도에이드",
    description: "달콤하고 산뜻한 청포도에이드",
    price: 4500,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "ade-plum",
    type: "picnic",
    category: "에이드",
    name: "자두에이드",
    description: "자두의 새콤달콤함을 담은 에이드",
    price: 4500,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "dessert-mochi",
    type: "picnic",
    category: "디저트",
    name: "모찌",
    description: "망고, 딸기요거트, 녹차, 라즈베리, 민트초코",
    price: 4000,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "dessert-plain-scone",
    type: "picnic",
    category: "디저트",
    name: "플레인 스콘",
    description: "담백하게 즐기는 플레인 스콘",
    price: 3500,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "dessert-matcha-scone",
    type: "picnic",
    category: "디저트",
    name: "말차 스콘",
    description: "말차 향을 더한 스콘",
    price: 3800,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
  {
    id: "dessert-plain-financier",
    type: "picnic",
    category: "디저트",
    name: "플레인 휘낭시에",
    description: "고소하고 촉촉한 플레인 휘낭시에",
    price: 2800,
    imageUrl: "/images/catering.png",
    minimumQuantity: 1,
    isAvailable: true,
  },
];

const reservations: Reservation[] = [
  buildDemoReservation({
    orderType: "picnic",
    menuItemId: "poke-salmon",
    quantity: 3,
    customerName: "김민지",
    customerPhone: "010-1234-5678",
    deliveryAddress: "서울시 마포구 월드컵북로 10",
    deliveryDetailAddress: "3층 회의실",
    deliveryDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    deliveryTime: "12:00",
    requestNote: "음료는 따로 상담 부탁드립니다.",
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
