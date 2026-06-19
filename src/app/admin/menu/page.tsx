import Link from "next/link";
import { updateMenuItemAction } from "./actions";
import { getAdminMenuItems } from "@/lib/data";
import { formatCurrency, formatOrderType } from "@/lib/format";

type AdminMenuPageProps = {
  searchParams?: Promise<{
    error?: string;
    updated?: string;
  }>;
};

export default async function AdminMenuPage({
  searchParams,
}: AdminMenuPageProps) {
  const params = await searchParams;
  const menuItems = await getAdminMenuItems();

  return (
    <div className="page-shell">
      <div className="page-title">
        <p className="eyebrow">관리자</p>
        <h1>메뉴 관리</h1>
        <p>홈페이지에 노출되는 메뉴의 가격, 설명, 최소 수량, 노출 여부를 수정합니다.</p>
        <div className="action-row">
          <Link className="button secondary" href="/admin">
            예약 관리
          </Link>
          <a className="button secondary" href="/admin/logout">
            로그아웃
          </a>
        </div>
      </div>

      {params?.error ? (
        <div className="error-box">메뉴 입력값을 다시 확인해주세요.</div>
      ) : null}
      {params?.updated ? (
        <div className="notice-box">메뉴가 저장되었습니다.</div>
      ) : null}

      <div className="admin-menu-list">
        {menuItems.map((item) => (
          <form
            action={updateMenuItemAction}
            className="panel admin-menu-card"
            key={item.id}
          >
            <input name="id" type="hidden" value={item.id} />
            <div>
              <p className="tag">{formatOrderType(item.type)} · {item.category}</p>
              <h2>{item.name}</h2>
              <p>{formatCurrency(item.price)}</p>
            </div>

            <div className="form-grid">
              <label className="field">
                메뉴명
                <input name="name" required defaultValue={item.name} />
              </label>
              <label className="field">
                가격
                <input
                  min="0"
                  name="price"
                  required
                  type="number"
                  defaultValue={item.price}
                />
              </label>
              <label className="field">
                최소 수량
                <input
                  min="1"
                  name="minimumQuantity"
                  required
                  type="number"
                  defaultValue={item.minimumQuantity}
                />
              </label>
              <label className="field">
                정렬 순서
                <input
                  min="0"
                  name="sortOrder"
                  required
                  type="number"
                  defaultValue={item.sortOrder}
                />
              </label>
              <label className="field full">
                설명
                <textarea name="description" required defaultValue={item.description} />
              </label>
              <label className="check-row">
                <input
                  name="isAvailable"
                  type="checkbox"
                  defaultChecked={item.isAvailable}
                />
                홈페이지에 노출
              </label>
            </div>

            <div className="action-row">
              <button className="primary" type="submit">
                저장
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
