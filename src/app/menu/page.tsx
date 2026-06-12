import Link from "next/link";
import { getMenuItems } from "@/lib/data";
import { formatCurrency, formatOrderType } from "@/lib/format";
import type { OrderType } from "@/lib/types";

type MenuPageProps = {
  searchParams?: Promise<{
    type?: OrderType;
  }>;
};

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const params = await searchParams;
  const selectedType = params?.type;
  const menuItems = await getMenuItems();
  const visibleItems = selectedType
    ? menuItems.filter((item) => item.type === selectedType)
    : menuItems;

  return (
    <div className="page-shell">
      <div className="page-title">
        <p className="eyebrow">메뉴</p>
        <h1>도시락과 케이터링</h1>
        <p>예약 목적과 인원에 맞는 메뉴를 고르고 예약 요청을 남겨주세요.</p>
      </div>

      <div className="filter-row">
        <Link className="button secondary" href="/menu">
          전체
        </Link>
        <Link className="button secondary" href="/menu?type=lunchbox">
          도시락
        </Link>
        <Link className="button secondary" href="/menu?type=catering">
          케이터링
        </Link>
      </div>

      <div className="card-grid">
        {visibleItems.map((item) => (
          <article className="menu-card" key={item.id}>
            <img
              className="menu-image"
              src={item.imageUrl}
              alt={`${item.name} 이미지`}
            />
            <div className="menu-card-body">
              <p className="tag">{item.category}</p>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>최소 주문 {item.minimumQuantity}개</p>
              <strong>{formatCurrency(item.price)}</strong>
              <div className="action-row">
                <Link
                  className="button primary"
                  href={`/reserve?type=${item.type}&menuItemId=${item.id}`}
                >
                  이 메뉴 예약
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
