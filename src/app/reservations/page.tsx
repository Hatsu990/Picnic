import { cookies } from "next/headers";
import Link from "next/link";
import { getCurrentCustomer } from "@/lib/customer-auth";
import {
  getCustomerSessionSecret,
  GUEST_LOOKUP_COOKIE,
  verifyGuestLookupValue,
} from "@/lib/customer-session";
import { getReservationsByPhone } from "@/lib/data";
import { maskPhone } from "@/lib/phone";
import {
  clearReservationLookupAction,
  lookupReservationsAction,
} from "./actions";
import { ReservationList } from "./reservation-list";

type ReservationsPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function ReservationsPage({
  searchParams,
}: ReservationsPageProps) {
  const params = await searchParams;
  const customer = await getCurrentCustomer();
  const cookieStore = await cookies();
  const lookup = await verifyGuestLookupValue(
    cookieStore.get(GUEST_LOOKUP_COOKIE)?.value,
    getCustomerSessionSecret(),
  );
  const reservations = lookup ? await getReservationsByPhone(lookup.phone) : [];

  return (
    <div className="page-shell">
      <div className="page-title">
        <p className="eyebrow">예약 조회</p>
        <h1>전화번호로 예약을 확인하세요</h1>
        <p>
          게스트 예약은 로그인 없이 예약 때 입력한 전화번호로 조회할 수 있습니다.
        </p>
        {customer ? (
          <div className="action-row">
            <Link className="button secondary" href="/mypage">
              마이페이지로 이동
            </Link>
          </div>
        ) : null}
      </div>

      {params?.error ? (
        <div className="error-box">전화번호를 다시 확인해 주세요.</div>
      ) : null}

      <form action={lookupReservationsAction} className="panel lookup-form">
        <div className="field">
          <label htmlFor="phone">예약자 전화번호</label>
          <input
            id="phone"
            name="phone"
            placeholder="010-0000-0000"
            type="tel"
            required
          />
        </div>
        <button className="primary" type="submit">
          예약 조회
        </button>
      </form>

      {lookup ? (
        <section className="section flush">
          <div className="section-heading">
            <p className="eyebrow">조회 결과</p>
            <h2>{maskPhone(lookup.phone)} 예약</h2>
          </div>
          <ReservationList
            emptyText="이 전화번호로 접수된 예약이 없습니다."
            reservations={reservations}
          />
          <form action={clearReservationLookupAction} className="action-row">
            <button className="secondary" type="submit">
              조회 초기화
            </button>
          </form>
        </section>
      ) : null}
    </div>
  );
}
