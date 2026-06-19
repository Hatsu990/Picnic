import Link from "next/link";
import { getReservations } from "@/lib/data";
import {
  formatCurrency,
  formatDateTime,
  formatOrderType,
  formatPaymentMethod,
  formatReservationStatus,
} from "@/lib/format";
import type { ReservationStatus } from "@/lib/types";

const statusOptions: Array<{ value: ReservationStatus | ""; label: string }> = [
  { value: "", label: "전체" },
  { value: "pending", label: "대기" },
  { value: "confirmed", label: "확정" },
  { value: "completed", label: "완료" },
  { value: "cancelled", label: "취소" },
];

type AdminPageProps = {
  searchParams?: Promise<{
    status?: ReservationStatus;
  }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const status = params?.status;
  const reservations = await getReservations(status);

  return (
    <div className="page-shell">
      <div className="page-title">
        <p className="eyebrow">관리자</p>
        <h1>예약 관리</h1>
        <p>접수된 예약을 확인하고 상태를 변경합니다.</p>
        <div className="action-row">
          <Link className="button secondary" href="/admin/menu">
            메뉴 관리
          </Link>
          <a className="button secondary" href="/admin/logout">
            로그아웃
          </a>
        </div>
      </div>

      <div className="filter-row">
        {statusOptions.map((option) => (
          <Link
            className="button secondary"
            href={option.value ? `/admin?status=${option.value}` : "/admin"}
            key={option.value || "all"}
          >
            {option.label}
          </Link>
        ))}
      </div>

      <div className="panel table-wrap">
        <table>
          <thead>
            <tr>
              <th>접수번호</th>
              <th>일시</th>
              <th>고객</th>
              <th>유형</th>
              <th>결제</th>
              <th>금액</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={7}>조건에 맞는 예약이 없습니다.</td>
              </tr>
            ) : null}
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>
                  <Link href={`/admin/reservations/${reservation.id}`}>
                    {reservation.reservationNumber}
                  </Link>
                </td>
                <td>
                  {formatDateTime(
                    reservation.deliveryDate,
                    reservation.deliveryTime,
                  )}
                </td>
                <td>{reservation.customerName}</td>
                <td>{formatOrderType(reservation.orderType)}</td>
                <td>{formatPaymentMethod(reservation.paymentMethod)}</td>
                <td>{formatCurrency(reservation.totalAmount)}</td>
                <td>
                  <span className={`status status-${reservation.reservationStatus}`}>
                    {formatReservationStatus(reservation.reservationStatus)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
