# 네이버 로그인 설정

이 프로젝트의 네이버 로그인은 Supabase Auth 내장 provider가 아니라 앱 서버 route에서 네이버 OAuth를 직접 처리합니다.

## 1. Supabase SQL 적용

Supabase SQL Editor에서 아래 파일 내용을 한 번 실행합니다.

```text
supabase/customer-auth.sql
```

이 SQL은 `customer_profiles` 테이블과 `reservations.customer_profile_id` 컬럼만 추가합니다.

## 2. 네이버 개발자 센터 설정

네이버 개발자 센터에서 애플리케이션을 만들고 `네이버 로그인` API를 활성화합니다.

콜백 URL:

```text
http://localhost:3000/auth/naver/callback
```

배포 후에는 운영 도메인도 추가합니다.

```text
https://your-domain.com/auth/naver/callback
```

## 3. `.env.local` 값

```env
NAVER_CLIENT_ID=네이버_애플리케이션_Client_ID
NAVER_CLIENT_SECRET=네이버_애플리케이션_Client_Secret
NAVER_REDIRECT_URI=http://localhost:3000/auth/naver/callback
CUSTOMER_SESSION_SECRET=32자_이상의_랜덤_문자열
```

`CUSTOMER_SESSION_SECRET`이 없으면 `ADMIN_SESSION_SECRET`을 대신 사용합니다. 운영에서는 고객 세션용 secret을 따로 두는 편이 좋습니다.

## 4. 동작 확인

1. `npm run dev`
2. `/login` 접속
3. `네이버 로그인` 클릭
4. 로그인 후 `/mypage`로 돌아오는지 확인
5. 로그인 상태에서 예약을 접수하고 `/mypage`에 예약이 보이는지 확인

게스트 예약은 `/reservations`에서 전화번호로 조회합니다.
