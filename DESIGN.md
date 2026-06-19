# Picnic Design System

## Product Context

- **What this is:** 소풍 카페의 메뉴 탐색, 예약 주문, 예약 조회를 처리하는 웹사이트.
- **Who it's for:** 점심 메뉴를 예약하려는 개인 고객, 소규모 모임/케이터링을 준비하는 고객, 예약을 확인하는 운영자.
- **Project type:** 고객용 예약 사이트와 운영자 관리 도구가 함께 있는 소규모 커머스 MVP.

## Aesthetic Direction

- **Direction:** 따뜻한 카페 오더 데스크.
- **Mood:** 종이 메뉴판처럼 편안하지만, 예약과 연락처 입력은 또렷하고 믿음직해야 한다.
- **Decoration level:** 낮음. 실제 메뉴/매장 사진, 얇은 선, 작은 색 포인트로 충분히 표현한다.

## Typography

- **Display/Hero:** Pretendard, Noto Sans KR, sans-serif.
- **Body/UI:** Pretendard, Noto Sans KR, sans-serif.
- **Data/Tables:** 같은 산세리프에 `font-variant-numeric: tabular-nums`.
- **Scale:** Hero 64px, page H1 52px, H2 32px, H3 20px, body 16px, small 13px.

## Color

- **Primary leaf:** `#2f5d46` - 예약 CTA, 핵심 상태.
- **Ink:** `#231f1a` - 본문과 제목.
- **Paper:** `#fbf7ef` - 전체 배경.
- **Surface:** `#fffdf8` - 카드와 폼.
- **Line:** `#ded2c1` - 경계선.
- **Tomato:** `#b94e3f` - 경고, 작은 강조.
- **Sky:** `#d9e8e8` - 보조 버튼.
- **Sun:** `#e5b857` - 안내성 포인트.

## Layout

- **Max content width:** 1180px.
- **Page padding:** Desktop 56px 32px, mobile 34px 18px.
- **Grid:** 고객 화면은 여유 있는 2-4열, 운영자 화면은 촘촘한 표와 폼.
- **Border radius:** 6px 기본, 10px 큰 이미지, 999px 상태 배지.

## Components

- **Buttons:** Primary는 잎색 채움, secondary는 하늘색 배경. hover/active에서 살짝 눌리는 촉감만 준다.
- **Cards:** 메뉴 카드에만 명확한 프레임을 쓰고, 페이지 섹션은 카드처럼 띄우지 않는다.
- **Forms:** 라벨은 항상 위, 입력칸은 44px 이상, 예약 흐름은 한 화면에서 스캔 가능해야 한다.
- **Admin:** 장식보다 밀도와 구분선 우선. 메뉴 관리와 예약 관리는 같은 버튼/표 규칙을 따른다.

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-20 | 따뜻한 카페 오더 데스크 방향으로 정리 | 실제 카페/예약 서비스 신뢰감을 우선하고 결제 전 MVP에도 어울림 |
