import Link from "next/link";
import { getMenuItems } from "@/lib/data";
import { formatCurrency } from "@/lib/format";

const storePhotos = [
  {
    src: "/images/store/store-window.jpg",
    alt: "소풍 매장 창가와 입구",
    className: "store-photo wide",
  },
  {
    src: "/images/store/store-lounge.jpg",
    alt: "소풍 매장 내부 좌석",
    className: "store-photo",
  },
  {
    src: "/images/store/store-counter.jpg",
    alt: "소풍 매장 카운터",
    className: "store-photo",
  },
  {
    src: "/images/store/store-shelf.jpg",
    alt: "소풍 매장 선반과 테이블",
    className: "store-photo tall",
  },
];

export default async function HomePage() {
  const featuredItems = (await getMenuItems()).slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">소풍 카페 메뉴 · 예약 주문</p>
          <h1>Picnic</h1>
          <p>
            포케와 음료, 예약 메뉴를 한 번에 고르고 원하는 날짜에 받을 수
            있게 준비합니다. 작은 모임부터 케이터링 문의까지 소풍에서
            차분하게 접수해요.
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
          <div>
            <span className="metric">33종</span>
            <span>현재 등록 메뉴</span>
          </div>
          <div>
            <span className="metric">1일 전</span>
            <span>예약 메뉴 접수 기준</span>
          </div>
          <div>
            <span className="metric">네이버</span>
            <span>로그인 예약 조회</span>
          </div>
        </div>
      </section>

      <section className="section section-featured">
        <div className="section-heading">
          <p className="eyebrow">대표 메뉴</p>
          <h2>오늘 고르기 좋은 메뉴</h2>
          <p>실제 사진과 가격이 바로 읽히도록 대표 메뉴를 먼저 정리했습니다.</p>
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
                <div className="card-footer">
                  <strong>{formatCurrency(item.price)}</strong>
                  <Link
                    className="text-link"
                    href={`/reserve?type=${item.type}&menuItemId=${item.id}`}
                  >
                    예약
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section store-story">
        <div className="store-copy">
          <p className="eyebrow">매장 분위기</p>
          <h2>조용히 머물기 좋은 소풍 공간</h2>
          <p>
            예약 주문 전 매장의 분위기를 먼저 볼 수 있도록, 사람 없는 내부 사진만 골라
            담았습니다. 메뉴 준비와 픽업, 상담이 이어지는 실제 공간입니다.
          </p>
        </div>
        <div className="store-gallery" aria-label="소풍 매장 내부 사진">
          {storePhotos.map((photo) => (
            <img
              alt={photo.alt}
              className={photo.className}
              key={photo.src}
              src={photo.src}
            />
          ))}
        </div>
      </section>

      <section className="section band">
        <div className="section-heading">
          <p className="eyebrow">운영 흐름</p>
          <h2>예약 접수 후 운영자가 확인합니다</h2>
          <p>결제 연동 전까지는 예약 내용을 먼저 확인하고 연락드리는 흐름입니다.</p>
        </div>
        <div className="steps">
          <div>
            <span>01</span>
            메뉴 선택
          </div>
          <div>
            <span>02</span>
            날짜와 주소 입력
          </div>
          <div>
            <span>03</span>
            예약 접수
          </div>
          <div>
            <span>04</span>
            운영자 확정
          </div>
        </div>
      </section>
    </>
  );
}
