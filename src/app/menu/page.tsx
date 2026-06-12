import Link from "next/link";
import { getMenuItems } from "@/lib/data";
import { formatCurrency, formatOrderType } from "@/lib/format";
import type { OrderType } from "@/lib/types";

type MenuPageProps = {
  searchParams?: Promise<{
    type?: OrderType;
  }>;
};

const filterOptions: Array<{ label: string; href: string }> = [
  { label: "전체", href: "/menu" },
  { label: "소풍 메뉴", href: "/menu?type=picnic" },
  { label: "도시락", href: "/menu?type=lunchbox" },
];

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
        <h1>소풍 메뉴</h1>
        <p>
          포케, 커피, 블렌딩 티, 라떼, 에이드, 디저트 메뉴를 확인하고
          예약 요청을 남겨주세요. 도시락 메뉴는 별도 확정 후 추가됩니다.
        </p>
      </div>

      <div className="filter-row">
        {filterOptions.map((option) => (
          <Link className="button secondary" href={option.href} key={option.href}>
            {option.label}
          </Link>
        ))}
      </div>

      <div className="card-grid">
        {visibleItems.length === 0 ? (
          <div className="panel empty-state">아직 등록된 메뉴가 없습니다.</div>
        ) : null}
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
