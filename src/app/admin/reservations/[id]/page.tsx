import Link from "next/link";
import { notFound } from "next/navigation";
import { updateReservationStatusAction } from "./actions";
import { getReservationById } from "@/lib/data";
import {
  formatCurrency,
  formatDateTime,
  formatOrderType,
  formatPaymentMethod,
  formatReservationStatus,
} from "@/lib/format";

type ReservationDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ReservationDetailPage({
  params,
}: ReservationDetailPageProps) {
  const { id } = await params;
  const reservation = await getReservationById(id);

  if (!reservation) {
    notFound();
  }

  return (
    <div className="page-shell">
      <div className="page-title">
        <p className="eyebrow">예약 상세</p>
        <h1>{reservation.reservationNumber}</h1>
        <p>
          {formatOrderType(reservation.orderType)} ·{" "}
          {formatDateTime(reservation.deliveryDate, reservation.deliveryTime)}
        </p>
      </div>

      <div className="detail-grid">
        <section className="panel">
          <h2>고객 정보</h2>
          <p>예약자: {reservation.customerName}</p>
          <p>연락처: {reservation.customerPhone}</p>
          <p>
            주소: {reservation.deliveryAddress}{" "}
            {reservation.deliveryDetailAddress}
          </p>
          <p>요청사항: {reservation.requestNote || "없음"}</p>
        </section>

        <section className="panel">
          <h2>주문 정보</h2>
          {reservation.items.map((item) => (
            <div className="summary-row" key={item.id}>
              <strong>{item.menuNameSnapshot}</strong>
              <span>
                {item.quantity}개 · {formatCurrency(item.lineTotal)}
              </span>
            </div>
          ))}
          <p>결제 방식: {formatPaymentMethod(reservation.paymentMethod)}</p>
          <p>총액: {formatCurrency(reservation.totalAmount)}</p>
        </section>

        <section className="panel">
          <h2>상태 변경</h2>
          <p>
            현재 상태:{" "}
            <span className={`status status-${reservation.reservationStatus}`}>
              {formatReservationStatus(reservation.reservationStatus)}
            </span>
          </p>
          <form action={updateReservationStatusAction} className="form-grid">
            <input type="hidden" name="id" value={reservation.id} />
            <div className="field">
              <label htmlFor="status">상태</label>
              <select
                id="status"
                name="status"
                defaultValue={reservation.reservationStatus}
              >
                <option value="pending">대기</option>
                <option value="confirmed">확정</option>
                <option value="completed">완료</option>
                <option value="cancelled">취소</option>
              </select>
            </div>
            <div className="field">
              <label>&nbsp;</label>
              <button className="primary" type="submit">
                상태 저장
              </button>
            </div>
          </form>
        </section>
      </div>

      <div className="action-row">
        <Link className="button secondary" href="/admin">
          목록으로
        </Link>
        <a className="button secondary" href="/admin/logout">
          로그아웃
        </a>
      </div>
    </div>
  );
}
