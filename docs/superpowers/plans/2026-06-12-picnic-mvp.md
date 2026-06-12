# Picnic MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 고객이 도시락/케이터링 메뉴를 보고 게스트 예약을 남기며, 관리자가 예약을 확인하고 상태를 바꿀 수 있는 Picnic 1차 MVP를 만든다.

**Architecture:** Next.js App Router 앱을 만들고, 데이터 접근은 `src/lib/data.ts`에 모은다. Supabase 환경변수가 있으면 Supabase를 쓰고, 없으면 로컬 데모 저장소로 동작해 결과 화면을 바로 확인할 수 있게 한다.

**Tech Stack:** Next.js, React, TypeScript, Supabase JavaScript client, Zod, plain CSS.

---

## 파일 구조

- `package.json`: 앱 실행, 빌드, 린트 스크립트와 의존성.
- `tsconfig.json`: TypeScript 설정.
- `next.config.ts`: Next.js 설정.
- `.env.example`: Supabase, Naver, payment, Solapi 환경변수 이름만 기록.
- `src/app/layout.tsx`: 전체 레이아웃과 공통 메타데이터.
- `src/app/page.tsx`: 홈 화면.
- `src/app/menu/page.tsx`: 메뉴 목록 화면.
- `src/app/reserve/page.tsx`: 예약 작성 화면.
- `src/app/reserve/actions.ts`: 예약 생성 서버 액션.
- `src/app/reserve/complete/page.tsx`: 예약 완료 화면.
- `src/app/admin/page.tsx`: 관리자 예약 목록.
- `src/app/admin/reservations/[id]/page.tsx`: 관리자 예약 상세.
- `src/app/admin/reservations/[id]/actions.ts`: 예약 상태 변경 서버 액션.
- `src/app/globals.css`: 전체 UI 스타일.
- `src/lib/types.ts`: 메뉴, 예약, 상태 타입.
- `src/lib/demo-data.ts`: 로컬 확인용 메뉴와 데모 예약 저장소.
- `src/lib/supabase.ts`: Supabase 클라이언트 생성.
- `src/lib/data.ts`: 메뉴 조회, 예약 생성, 예약 목록/상세 조회, 상태 변경.
- `src/lib/format.ts`: 금액, 날짜, 상태 표시 포맷.
- `supabase/schema.sql`: 실제 Supabase에 적용할 테이블 SQL.

## 작업

### Task 1: Next.js 프로젝트 뼈대 만들기

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Modify: `.gitignore`

- [ ] **Step 1: 패키지와 기본 설정 작성**

`package.json`에는 `dev`, `build`, `start`, `lint`, `typecheck` 스크립트를 둔다.

- [ ] **Step 2: 최소 홈 화면 작성**

`src/app/page.tsx`는 Picnic 브랜드, 메뉴 보기, 예약하기 CTA를 보여준다.

- [ ] **Step 3: 검증**

Run: `npm install`

Expected: 의존성 설치 성공.

Run: `npm run typecheck`

Expected: TypeScript 에러 없음.

- [ ] **Step 4: 커밋**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts src/app/layout.tsx src/app/page.tsx src/app/globals.css .gitignore
git commit -m "feat: scaffold Picnic Next.js app"
```

### Task 2: 타입, 데모 데이터, Supabase 데이터 계층 만들기

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/lib/demo-data.ts`
- Create: `src/lib/supabase.ts`
- Create: `src/lib/data.ts`
- Create: `src/lib/format.ts`
- Create: `.env.example`
- Create: `supabase/schema.sql`

- [ ] **Step 1: 타입 정의**

`OrderType`, `ReservationStatus`, `PaymentMethod`, `MenuItem`, `Reservation`, `ReservationItem` 타입을 정의한다.

- [ ] **Step 2: 데모 데이터 작성**

도시락 4개, 케이터링 3개 메뉴를 만든다. 예약은 서버 메모리에 저장되는 배열로 시작한다.

- [ ] **Step 3: Supabase 클라이언트 작성**

`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`를 읽는다. 값이 없으면 `null`을 반환해 데모 저장소를 사용한다.

- [ ] **Step 4: 데이터 함수 작성**

`getMenuItems`, `createReservation`, `getReservations`, `getReservationById`, `updateReservationStatus`를 만든다.

- [ ] **Step 5: 검증**

Run: `npm run typecheck`

Expected: TypeScript 에러 없음.

- [ ] **Step 6: 커밋**

```bash
git add src/lib .env.example supabase/schema.sql
git commit -m "feat: add Picnic data layer"
```

### Task 3: 고객 메뉴와 예약 흐름 만들기

**Files:**
- Create: `src/app/menu/page.tsx`
- Create: `src/app/reserve/page.tsx`
- Create: `src/app/reserve/actions.ts`
- Create: `src/app/reserve/complete/page.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: 메뉴 화면 작성**

도시락/케이터링 필터와 메뉴 카드 목록을 만든다.

- [ ] **Step 2: 예약 폼 작성**

필수 필드: 주문 유형, 메뉴, 수량, 날짜, 시간, 이름, 연락처, 주소, 결제 방식.

- [ ] **Step 3: 서버 액션 작성**

Zod로 입력을 검증한다. 성공 시 예약을 만들고 `/reserve/complete?reservationNumber=...`로 이동한다.

- [ ] **Step 4: 완료 화면 작성**

접수번호와 운영자 확인 안내를 보여준다.

- [ ] **Step 5: 검증**

Run: `npm run typecheck`

Expected: TypeScript 에러 없음.

Run: `npm run build`

Expected: 빌드 성공.

- [ ] **Step 6: 커밋**

```bash
git add src/app src/lib
git commit -m "feat: add customer reservation flow"
```

### Task 4: 관리자 예약 관리 화면 만들기

**Files:**
- Create: `src/app/admin/page.tsx`
- Create: `src/app/admin/reservations/[id]/page.tsx`
- Create: `src/app/admin/reservations/[id]/actions.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: 예약 목록 작성**

상태 필터와 예약 테이블을 만든다.

- [ ] **Step 2: 예약 상세 작성**

예약자 정보, 배송 정보, 메뉴/수량, 요청사항, 결제 방식, 상태 변경 폼을 보여준다.

- [ ] **Step 3: 상태 변경 서버 액션 작성**

허용 상태만 저장하고 `/admin`과 상세 페이지를 재검증한다.

- [ ] **Step 4: 검증**

Run: `npm run typecheck`

Expected: TypeScript 에러 없음.

Run: `npm run build`

Expected: 빌드 성공.

- [ ] **Step 5: 커밋**

```bash
git add src/app/admin src/app/globals.css src/lib
git commit -m "feat: add admin reservation management"
```

### Task 5: 화면 QA와 최종 push

**Files:**
- Modify: `RETROSPECTIVE.md`

- [ ] **Step 1: 개발 서버 실행**

Run: `npm run dev`

Expected: 로컬 URL에서 앱 접속 가능.

- [ ] **Step 2: 브라우저 확인**

고객 홈, 메뉴, 예약, 완료, 관리자 목록, 관리자 상세를 확인한다.

- [ ] **Step 3: 반응형 확인**

모바일 세로, 좁은 태블릿, 데스크톱에서 텍스트 겹침과 폼 사용성을 확인한다.

- [ ] **Step 4: 회고 업데이트**

구현 내용, 확인한 문제, 검증 결과를 `RETROSPECTIVE.md`에 한글로 추가한다.

- [ ] **Step 5: 최종 검증과 push**

Run: `npm run typecheck`

Expected: TypeScript 에러 없음.

Run: `npm run build`

Expected: 빌드 성공.

```bash
git add RETROSPECTIVE.md
git commit -m "docs: update implementation retrospective"
git push
```

## 자체 검토

- 설계 범위의 고객 예약, 관리자 상태 변경, Supabase 확장 지점, 환경변수 문서화를 모두 작업에 포함했다.
- 실제 결제, 네이버 OAuth, Solapi, 리뷰 작성은 1차 구현 대상에서 제외했다.
- Supabase 키가 없어도 결과 확인이 가능하도록 데모 저장소를 포함했다.
- 관리자 인증은 MVP 최소 보호로 시작하되 운영 전 Supabase Auth 강화가 필요하다.
