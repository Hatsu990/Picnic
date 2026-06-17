import {
  formatCurrency,
  formatDateTime,
  formatOrderType,
  formatPaymentMethod,
  formatReservationStatus,
} from "@/lib/format";
import type { Reservation } from "@/lib/types";

type ReservationListProps = {
  emptyText: string;
  reservations: Reservation[];
};

export function ReservationList({
  emptyText,
  reservations,
}: ReservationListProps) {
  if (reservations.length === 0) {
    return <div className="panel empty-state">{emptyText}</div>;
  }

  return (
    <div className="reservation-list">
      {reservations.map((reservation) => (
        <article className="panel reservation-card" key={reservation.id}>
          <div className="reservation-card-head">
            <div>
              <p className="eyebrow">{formatOrderType(reservation.orderType)}</p>
              <h2>{reservation.reservationNumber}</h2>
            </div>
            <span className={`status status-${reservation.reservationStatus}`}>
              {formatReservationStatus(reservation.reservationStatus)}
            </span>
          </div>
          <div className="detail-grid">
            <div>
              <strong>예약 일시</strong>
              <p>{formatDateTime(reservation.deliveryDate, reservation.deliveryTime)}</p>
            </div>
            <div>
              <strong>예약자</strong>
              <p>{reservation.customerName}</p>
            </div>
            <div>
              <strong>결제 방식</strong>
              <p>{formatPaymentMethod(reservation.paymentMethod)}</p>
            </div>
            <div>
              <strong>총액</strong>
              <p>{formatCurrency(reservation.totalAmount)}</p>
            </div>
          </div>
          <div className="reservation-items">
            {reservation.items.map((item) => (
              <div key={item.id}>
                <span>{item.menuNameSnapshot}</span>
                <span>
                  {item.quantity}개 · {formatCurrency(item.lineTotal)}
                </span>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
