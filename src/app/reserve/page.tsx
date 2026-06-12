import { createReservationAction } from "./actions";
import { getMenuItems } from "@/lib/data";
import { formatCurrency, formatOrderType } from "@/lib/format";
import type { OrderType } from "@/lib/types";

type ReservePageProps = {
  searchParams?: Promise<{
    type?: OrderType;
    menuItemId?: string;
    error?: string;
  }>;
};

export default async function ReservePage({ searchParams }: ReservePageProps) {
  const params = await searchParams;
  const menuItems = await getMenuItems();
  const selectedType = params?.type ?? "lunchbox";
  const visibleItems = menuItems.filter((item) => item.type === selectedType);
  const selectedItem =
    visibleItems.find((item) => item.id === params?.menuItemId) ?? visibleItems[0];

  return (
    <div className="page-shell">
      <div className="page-title">
        <p className="eyebrow">예약</p>
        <h1>예약 요청하기</h1>
        <p>실제 결제는 아직 진행하지 않습니다. 운영자가 예약 내용을 확인한 뒤 연락합니다.</p>
      </div>

      {params?.error ? <div className="error-box">{params.error}</div> : null}

      <form action={createReservationAction} className="panel form-grid">
        <div className="field">
          <label htmlFor="orderType">주문 유형</label>
          <select id="orderType" name="orderType" defaultValue={selectedType}>
            <option value="lunchbox">도시락</option>
            <option value="catering">케이터링</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="menuItemId">메뉴</label>
          <select id="menuItemId" name="menuItemId" defaultValue={selectedItem?.id}>
            {menuItems.map((item) => (
              <option key={item.id} value={item.id}>
                {formatOrderType(item.type)} · {item.name} ·{" "}
                {formatCurrency(item.price)}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="quantity">수량</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min={selectedItem?.minimumQuantity ?? 1}
            defaultValue={selectedItem?.minimumQuantity ?? 1}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="deliveryDate">예약 날짜</label>
          <input id="deliveryDate" name="deliveryDate" type="date" required />
        </div>

        <div className="field">
          <label htmlFor="deliveryTime">예약 시간</label>
          <input id="deliveryTime" name="deliveryTime" type="time" required />
        </div>

        <div className="field">
          <label htmlFor="paymentMethod">결제 방식</label>
          <select id="paymentMethod" name="paymentMethod" defaultValue="consultation">
            <option value="onsite">현장 결제</option>
            <option value="bank_transfer">계좌이체 안내</option>
            <option value="consultation">상담 후 확정</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="customerName">예약자명</label>
          <input id="customerName" name="customerName" required />
        </div>

        <div className="field">
          <label htmlFor="customerPhone">연락처</label>
          <input id="customerPhone" name="customerPhone" required />
        </div>

        <div className="field full">
          <label htmlFor="deliveryAddress">배송 주소</label>
          <input id="deliveryAddress" name="deliveryAddress" required />
        </div>

        <div className="field full">
          <label htmlFor="deliveryDetailAddress">상세 주소</label>
          <input id="deliveryDetailAddress" name="deliveryDetailAddress" />
        </div>

        <div className="field full">
          <label htmlFor="requestNote">요청사항</label>
          <textarea id="requestNote" name="requestNote" />
        </div>

        <div className="field full">
          <button className="primary" type="submit">
            예약 접수하기
          </button>
        </div>
      </form>
    </div>
  );
}
