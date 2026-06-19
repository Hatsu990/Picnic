export type OrderType = "picnic" | "lunchbox" | "catering";

export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export type PaymentMethod = "onsite" | "bank_transfer" | "consultation";

export type MenuItem = {
  id: string;
  type: OrderType;
  category: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  minimumQuantity: number;
  isAvailable: boolean;
};

export type AdminMenuItem = MenuItem & {
  sortOrder: number;
};

export type ReservationItem = {
  id: string;
  menuItemId: string;
  menuNameSnapshot: string;
  unitPriceSnapshot: number;
  quantity: number;
  lineTotal: number;
};

export type Reservation = {
  id: string;
  reservationNumber: string;
  orderType: OrderType;
  customerProfileId: string | null;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryDetailAddress: string;
  deliveryDate: string;
  deliveryTime: string;
  requestNote: string;
  paymentMethod: PaymentMethod;
  reservationStatus: ReservationStatus;
  paymentStatus: string | null;
  couponCode: string | null;
  notificationStatus: string | null;
  reviewStatus: string | null;
  totalAmount: number;
  items: ReservationItem[];
  createdAt: string;
  updatedAt: string;
};

export type CreateReservationInput = {
  orderType: OrderType;
  menuItemId: string;
  quantity: number;
  customerProfileId?: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryDetailAddress: string;
  deliveryDate: string;
  deliveryTime: string;
  requestNote: string;
  paymentMethod: PaymentMethod;
  optionSummary?: string;
  extraAmount?: number;
};

export type CustomerProfile = {
  id: string;
  provider: "naver";
  providerUserId: string;
  email: string | null;
  name: string | null;
  nickname: string | null;
  avatarUrl: string | null;
  marketingConsent: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
};
