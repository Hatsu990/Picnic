import Link from "next/link";
import { getMenuItems } from "@/lib/data";
import { formatCurrency } from "@/lib/format";

export default async function HomePage() {
  const featuredItems = (await getMenuItems()).slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">소풍 카페 메뉴 · 예약 주문</p>
          <h1>Picnic</h1>
          <p>
            포케, 커피, 블렌딩 티, 라떼, 에이드, 디저트를 한눈에 보고
            원하는 날짜에 예약 요청을 남겨주세요.
          </p>
          <div className="action-row">
            <Link className="button primary" href="/reserve">
              예약하기
            </Link>
            <Link className="button secondary" href="/menu">
              메뉴 보기
            </Link>
          </div>
        </div>
        <div className="hero-panel" aria-label="Picnic 대표 예약 정보">
          <img
            className="hero-image"
            src="/images/picnic-hero.png"
            alt="Picnic 소풍 메뉴 이미지"
          />
          <div>
            <span className="metric">30종</span>
            <span>소풍 메뉴 등록</span>
          </div>
          <div>
            <span className="metric">5종</span>
            <span>포케 메뉴</span>
          </div>
          <div>
            <span className="metric">추가 예정</span>
            <span>도시락 메뉴</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">대표 메뉴</p>
          <h2>소풍 메뉴</h2>
        </div>
        <div className="card-grid">
          {featuredItems.map((item) => (
            <article className="menu-card" key={item.id}>
              <img
                className="menu-image"
                src={item.imageUrl}
                alt={`${item.name} 이미지`}
              />
              <div className="menu-card-body">
                <p className="tag">{item.category}</p>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <strong>{formatCurrency(item.price)}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section band">
        <div className="section-heading">
          <p className="eyebrow">운영 흐름</p>
          <h2>예약 접수 후 운영자가 확인합니다</h2>
        </div>
        <div className="steps">
          <div>메뉴 선택</div>
          <div>날짜와 주소 입력</div>
          <div>예약 접수</div>
          <div>운영자 확정</div>
        </div>
      </section>
    </>
  );
}
