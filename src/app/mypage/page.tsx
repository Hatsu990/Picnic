import Link from "next/link";
import { getCurrentCustomer } from "@/lib/customer-auth";
import { getReservationsByCustomerProfileId } from "@/lib/data";
import { ReservationList } from "@/app/reservations/reservation-list";

export default async function MyPage() {
  const customer = await getCurrentCustomer();

  if (!customer) {
    return (
      <div className="page-shell">
        <section className="panel auth-panel">
          <p className="eyebrow">마이페이지</p>
          <h1>로그인이 필요합니다</h1>
          <p>
            네이버 로그인 후 접수한 예약은 마이페이지에서 모아볼 수 있습니다.
            게스트 예약은 전화번호로 조회해 주세요.
          </p>
          <div className="action-row">
            <a className="button naver" href="/auth/naver/start?next=/mypage">
              네이버 로그인
            </a>
            <Link className="button secondary" href="/reservations">
              게스트 예약 조회
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const reservations = await getReservationsByCustomerProfileId(customer.id);

  return (
    <div className="page-shell">
      <div className="page-title">
        <p className="eyebrow">마이페이지</p>
        <h1>{customer.nickname || customer.name || "네이버 사용자"}님의 예약</h1>
        <p>
          네이버 로그인 상태에서 접수한 예약을 확인합니다. 기존 게스트 예약은
          전화번호 조회를 사용해 주세요.
        </p>
        <div className="action-row">
          <Link className="button secondary" href="/reservations">
            전화번호로 예약 조회
          </Link>
          <a className="button secondary" href="/auth/logout">
            로그아웃
          </a>
        </div>
      </div>

      <ReservationList
        emptyText="아직 네이버 로그인 상태로 접수한 예약이 없습니다."
        reservations={reservations}
      />
    </div>
  );
}
