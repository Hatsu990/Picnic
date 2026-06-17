# Supabase 연결 안내

이 프로젝트는 Supabase 환경변수가 있으면 실제 Supabase DB를 사용하고, 없으면 로컬 데모 데이터로 동작합니다.

## 1. Supabase SQL 적용

Supabase 대시보드의 SQL Editor에서 아래 순서로 실행합니다.

1. `supabase/schema.sql`
2. `supabase/seed.sql`

이미 기존 테이블이 만들어진 상태에서 네이버 로그인/마이페이지 기능만 추가한다면 `supabase/customer-auth.sql`만 추가로 실행해도 됩니다.

`schema.sql`은 테이블과 RLS 정책을 만들고, `seed.sql`은 현재 소풍 메뉴를 넣습니다.

## 2. `.env.local` 작성

프로젝트 루트에 `.env.local`을 만들고 아래 값을 채웁니다.

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

ADMIN_PASSWORD=change-this-password
ADMIN_SESSION_SECRET=use-a-long-random-secret-at-least-32-chars
```

주의:

- `SUPABASE_SERVICE_ROLE_KEY`는 서버에서만 사용해야 합니다.
- `.env.local`은 Git에 커밋하지 않습니다.
- `ADMIN_PASSWORD`는 운영 전 임시 보호용입니다. 실제 운영에서는 Supabase Auth 기반 관리자 계정으로 교체하는 것이 좋습니다.

## 3. 연결 확인

```powershell
npm run check:supabase
```

성공하면 `menu_items`와 `reservations` 개수가 출력됩니다.

## 4. 로컬 실행

```powershell
npm run dev
```

- `/menu`: Supabase 메뉴 데이터 확인
- `/reserve`: 예약 생성
- `/admin`: 관리자 로그인 후 예약 목록 확인

## 현재 상태

현재 저장소에는 실제 Supabase 키가 없습니다. 따라서 코드와 SQL은 준비되어 있지만, 실제 DB 저장 검증은 `.env.local` 설정 후 진행해야 합니다.
