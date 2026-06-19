import type { Reservation } from "./types";

type NaverPayConfig = {
  clientId: string;
  clientSecret: string;
  chainId: string;
  mode: "development" | "production";
  apiBaseUrl: string;
  siteUrl: string;
};

export type NaverPayPaymentRequest = {
  merchantPayKey: string;
  productName: string;
  totalPayAmount: number;
  taxScopeAmount: number;
  taxExScopeAmount: number;
  returnUrl: string;
};

export function getNaverPayConfig(): NaverPayConfig | null {
  const clientId = process.env.NAVER_PAY_CLIENT_ID;
  const clientSecret = process.env.NAVER_PAY_CLIENT_SECRET;
  const chainId = process.env.NAVER_PAY_CHAIN_ID;

  if (!clientId || !clientSecret || !chainId) {
    return null;
  }

  return {
    clientId,
    clientSecret,
    chainId,
    mode: process.env.NAVER_PAY_MODE === "production" ? "production" : "development",
    apiBaseUrl:
      process.env.NAVER_PAY_API_BASE_URL ?? "https://dev-pay.paygate.naver.com",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  };
}

export function isNaverPayConfigured() {
  return getNaverPayConfig() !== null;
}

export function buildNaverPayPaymentRequest(
  reservation: Reservation,
): NaverPayPaymentRequest {
  const config = getNaverPayConfig();
  const firstItem = reservation.items[0];
  const productName =
    reservation.items.length > 1
      ? `${firstItem?.menuNameSnapshot ?? "소풍 예약"} 외 ${reservation.items.length - 1}건`
      : firstItem?.menuNameSnapshot ?? "소풍 예약";

  return {
    merchantPayKey: reservation.reservationNumber,
    productName,
    totalPayAmount: reservation.totalAmount,
    taxScopeAmount: reservation.totalAmount,
    taxExScopeAmount: 0,
    returnUrl: `${config?.siteUrl ?? "http://localhost:3000"}/payments/naver/return`,
  };
}

export async function applyNaverPayPayment(paymentId: string) {
  const config = getNaverPayConfig();
  if (!config) {
    throw new Error("NAVER_PAY 환경변수가 설정되지 않았습니다.");
  }

  const body = new URLSearchParams({ paymentId });
  const response = await fetch(
    `${config.apiBaseUrl}/naverpay-partner/naverpay/payments/v2.2/apply/payment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Naver-Client-Id": config.clientId,
        "X-Naver-Client-Secret": config.clientSecret,
        "X-NaverPay-Chain-Id": config.chainId,
        "X-NaverPay-Idempotency-Key": crypto.randomUUID(),
      },
      body,
    },
  );

  if (!response.ok) {
    throw new Error(`네이버페이 승인 요청 실패: ${response.status}`);
  }

  return response.json();
}
