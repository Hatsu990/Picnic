# 회고

## 2026-06-12 - MVP 범위와 설계

- 사용자 의도: Picnic을 카페형 도시락 배달 및 케이터링 예약 웹사이트로 만든다. 이후 로그인, 결제, 쿠폰, 리뷰, 마케팅 자동화까지 확장할 수 있어야 한다.
- 진행한 요청: 초기 아이디어를 B+ MVP로 정리했다. 1차는 게스트 예약과 관리자 예약 처리를 먼저 만들고, 이후 C 단계 기능을 붙일 수 있는 구조를 남긴다.
- 확인한 단서: 작업 폴더에는 로컬 `.omx`, `.superpowers` 폴더만 있었고 Git이 초기화되어 있지 않았다. `Hatsu990/Picnic` 원격 저장소는 ref가 비어 있어 아직 커밋이 없는 저장소로 판단했다.
- 결정 사항: Next.js App Router와 Supabase를 사용한다. 1차 MVP에는 실제 결제, 네이버 OAuth, Solapi, 리뷰 작성 기능을 넣지 않는다. 대신 나중에 붙일 수 있도록 DB와 코드 구조에 확장 지점을 남긴다.
- 적용한 변경: Git을 초기화하고 MVP 설계 문서, 최소 `.gitignore`, 회고 로그를 추가했다.
- 검증 결과: Brainstorm companion 클릭 이벤트에서 B+ MVP 방향 승인 선택을 확인했다.

## 2026-06-12 - MVP 1차 구현

- 사용자 의도: 설계 문서를 직접 검토하기보다 실제 결과 화면으로 판단하고 싶어 했다. 회고는 한글로 유지해 달라고 요청했다.
- 진행한 요청: Next.js 기반 Picnic MVP를 구현했다. 홈, 메뉴, 예약 작성, 예약 완료, 관리자 예약 목록, 관리자 예약 상세/상태 변경 화면을 추가했다.
- 확인한 원인과 단서: Supabase 키가 아직 없기 때문에 실제 DB만 바라보면 로컬 결과 확인이 막힌다. 그래서 Supabase 연결 구조를 만들되, 환경변수가 없을 때는 데모 메뉴와 서버 메모리 예약 저장소로 동작하게 했다.
- 적용한 변경 사항: Next.js 16.2.9, React 19.2.7, Supabase JS 2.108.1, Zod 4.4.3을 사용했다. Supabase 테이블 SQL과 `.env.example`을 추가했다. 도시락/케이터링용 로컬 PNG 자산을 만들어 홈과 메뉴 카드에 적용했다.
- 검증 결과: `npm run typecheck`와 `npm run build`가 통과했다. GStack으로 홈, 메뉴, 예약 제출, 예약 완료, 관리자 목록, 관리자 상세, 상태 변경, 상태 필터, 콘솔 오류 없음을 확인했다. 모바일/태블릿/데스크톱 스크린샷에서 텍스트 겹침이나 버튼 잘림은 보이지 않았다.
- 남은 주의사항: 실제 운영 전에는 Supabase 프로젝트 연결, 관리자 인증 강화, RLS 정책, 네이버 OAuth, 결제, Solapi, 리뷰 기능을 별도 단계로 붙여야 한다. `npm audit`은 Next가 의존하는 PostCSS 중간 등급 경고를 보고했지만, npm의 자동 수정 제안은 Next 9로 다운그레이드라 적용하지 않았다.

## 2026-06-12 - 소풍 메뉴 반영

- 사용자 의도: 현재 판매 중인 소풍 메뉴를 먼저 반영하고, 도시락 메뉴는 나중에 별도로 제공하겠다고 했다.
- 진행한 요청: 임시 도시락/케이터링 샘플 메뉴를 실제 소풍 메뉴로 교체했다. 포케, 커피, 블렌딩 티, 허브차, 라떼, 에이드, 디저트 항목을 추가했다.
- 적용한 변경 사항: `picnic` 주문 유형을 추가하고, 메뉴 페이지 필터와 예약 폼을 소풍 메뉴 중심으로 수정했다. 도시락 필터는 남겨두되 아직 등록 메뉴가 없으면 빈 상태를 보여주게 했다.
- 검증 결과: `npm run typecheck`와 `npm run build`가 통과했다. GStack으로 메뉴 페이지에 연어 포케, 목살 포케, 핸드드립 hot, 플레인 스콘 등이 표시되는 것을 확인했다. 예약 폼에서도 새 메뉴들이 선택지로 보였고, 연어 포케 예약 제출과 완료 화면 접수번호 표시를 확인했다.

## 2026-06-12 - Supabase 연결 준비와 관리자 보호

- 사용자 의도: 다음 단계로 Supabase 실제 연결과 관리자 로그인/보안을 모두 진행해 달라고 했다.
- 확인한 단서: 현재 로컬 환경에는 `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` 값이 없었다. Supabase MCP는 사용 가능하지만 현재 read-only 설정이라 DB 마이그레이션 적용 같은 쓰기 작업은 할 수 없었다.
- 진행한 요청: Supabase 실제 연결에 필요한 SQL, seed, 환경변수 안내, 연결 확인 스크립트를 추가했다. 관리자 화면은 `ADMIN_PASSWORD`와 `ADMIN_SESSION_SECRET` 기반 로그인으로 보호하고, httpOnly 서명 쿠키와 Next.js 16 `src/proxy.ts` 프록시로 `/admin` 하위 경로를 막았다.
- 확인한 원인과 단서: 처음에는 `middleware.ts`/루트 `proxy.ts`가 보호를 적용하지 못했다. Next.js 16과 `src/app` 구조에서는 `src/proxy.ts` 위치에서 빌드 출력에 `Proxy (Middleware)`가 잡혔다.
- 검증 결과: Supabase 키가 없어서 `npm run check:supabase`는 키 없음 오류로 실패했다. 이는 현재 환경에서는 정상이다. 테스트용 관리자 환경변수를 넣고 실행했을 때 빈 쿠키 요청은 `/admin/login?next=%2Fadmin`으로 307 리다이렉트되었고, 테스트 비밀번호 입력 후 `/admin` 예약 목록에 접근되는 것을 Playwright로 확인했다. `npm run typecheck`와 `npm run build`도 통과했다.
- 남은 주의사항: 실제 Supabase 프로젝트에 `supabase/schema.sql`과 `supabase/seed.sql`을 적용하고 `.env.local`에 키를 넣은 뒤 `npm run check:supabase`로 실제 DB 연결을 다시 검증해야 한다. 운영 전에는 현재 임시 관리자 비밀번호 방식을 Supabase Auth 기반 관리자 계정으로 교체하는 것이 더 안전하다.

## 2026-06-13 - Supabase SQL 적용과 메뉴 검수

- 사용자 의도: Supabase SQL 편집기에서 어떤 내용을 실행해야 하는지 복붙 가능한 형태로 확인하고, 현재 소풍 메뉴가 빠짐없이 들어갔는지 검수하길 원했다.
- 진행한 요청: `supabase/setup-all.sql` 통합 SQL을 만들어 클립보드에 복사하고, SQL 편집기에 붙여넣어 실행하도록 안내했다.
- 확인한 원인과 단서: 기존 메뉴 검수에서 말차 스콘, 플레인 휘낭시에, 핸드드립 iced가 누락되어 있었다. 홈 화면 카운트도 27종으로 남아 있었다.
- 적용한 변경 사항: `src/lib/demo-data.ts`, `supabase/seed.sql`, `supabase/setup-all.sql`에 소풍 메뉴 30개를 맞추고, 홈 화면 표시를 30종으로 수정했다.
- 검증 결과: 로컬 파일 기준 demo 메뉴 30개, seed SQL 30개, 통합 SQL 30개를 확인했다. 사용자가 Supabase SQL 편집기에서 실행한 결과 화면에 `Success. No rows returned`가 표시되어 테이블 생성과 seed 실행이 성공한 것으로 확인했다.

## 2026-06-13 - Supabase 실제 연결 검증

- 사용자 의도: Supabase에서 복사한 `anon public`과 `service_role` 키를 로컬 앱에 연결해 실제 DB를 읽게 만들고 싶어 했다.
- 진행한 요청: `.env.local`을 생성하고 Supabase URL, anon 키, service role 키, 임시 관리자 비밀번호와 세션 시크릿을 채웠다.
- 확인한 원인과 단서: 처음 `npm run check:supabase`에서 `fetch failed`와 `ENOTFOUND`가 발생했다. 복사한 JWT의 `ref`를 확인한 결과 실제 프로젝트 ref는 `rkctmybesyatvgriwfke`였고, 로컬 URL에는 `rkctmybesyatvgrivvfke`로 잘못 적혀 있었다.
- 적용한 변경 사항: `.env.local`의 Supabase URL을 실제 프로젝트 ref 기준으로 수정했다. 비밀 키 값은 로그와 회고에 남기지 않았다.
- 검증 결과: DNS 확인이 성공했고 `npm run check:supabase`에서 `menu_items: 30`, `reservations: 0`을 확인했다. `npm run dev -- -p 3000`으로 앱을 띄운 뒤 `/menu`에서 연어 포케, 핸드드립 iced, 말차 스콘, 플레인 휘낭시에가 HTML에 포함되는 것을 확인했다.

## 2026-06-16 - 네이버 플레이스 메뉴 이미지 적용

- 사용자 의도: 사용자가 직접 올린 네이버 플레이스의 메뉴 사진을 일일이 내려받지 않고, 현재 소풍 메뉴 30개에 각각 적용하길 원했다.
- 진행한 요청: 네이버 지도 소풍 플레이스 메뉴 탭을 열고, 브라우저 네트워크 요청에서 실제 메뉴 이미지 URL을 추출했다.
- 확인한 원인과 단서: 네이버 메뉴 탭에는 메뉴 이미지 30개와 별도 메뉴판 이미지 3개가 함께 로드되어 있었다. 메뉴판 이미지는 제외하고 메뉴 리스트 노출 순서 기준으로 30개만 매칭했다.
- 적용한 변경 사항: `public/images/menu`에 메뉴별 이미지 30장을 저장하고, `src/lib/demo-data.ts`, `supabase/seed.sql`, `supabase/setup-all.sql`, 실제 Supabase `menu_items.image_url`을 모두 `/images/menu/...` 경로로 갱신했다.
- 검증 결과: `npm run check:supabase`, `npm run typecheck`, `npm run build`가 통과했다. 로컬 `/menu`에서 30개 메뉴 이미지가 모두 `320x320`으로 로드되는 것을 확인했고, 데스크톱/모바일 화면에서 카드 이미지가 정상 표시되는 것을 확인했다.

## 2026-06-16 - 사람 없는 매장 사진으로 홈 보강

- 사용자 의도: 네이버 플레이스 사진 탭의 가게 내부 또는 외부 사진 중 사람이 나오지 않는 사진만 골라 홈페이지 분위기 소스로 활용하길 원했다.
- 진행한 요청: 네이버 플레이스 사진 탭과 직접 플레이스 사진 페이지를 확인하고 후보 이미지를 내려받아 검수용 시트로 사람 포함 여부를 확인했다.
- 확인한 원인과 단서: 사진 탭에는 사람 있는 강의/방문 사진, 메뉴 사진, 내부 사진이 섞여 있었다. 사람 얼굴이나 몸이 보이는 후보는 제외하고, 창가, 좌석, 카운터, 선반 사진만 선택했다.
- 적용한 변경 사항: `public/images/store`에 사람 없는 매장 사진 4장을 저장하고, 홈 화면에 `매장 분위기` 섹션을 추가했다.
- 검증 결과: `npm run typecheck`와 `npm run build`가 통과했다. 로컬 홈에서 매장 사진 4장이 모두 로드되는 것을 확인했고, 데스크톱/모바일 캡처로 이미지와 텍스트가 겹치지 않는 것을 확인했다.

## 2026-06-16 - 포케 옵션과 예약 메뉴 추가

- 사용자 의도: 포케 예약 시 드레싱을 체크박스로 여러 개 고르고, 토핑을 추가 횟수별 금액으로 더할 수 있게 만들고 싶어 했다. 추가로 캡처 이미지의 예약 메뉴 3종을 하루 전 예약 메뉴로 사이트에 반영하길 원했다.
- 진행한 요청: 포케 메뉴 예약 화면에 드레싱 선택, 토핑 추가 수량 입력, 추가금 계산을 붙였다. 화이타, 월남쌈, LA 김밥을 예약 메뉴로 추가하고 메뉴 카드와 예약 화면에 당일 수령 불가 안내를 표시했다.
- 확인한 원인과 단서: 캡처 이미지 기준 예약 메뉴는 2인 가격이지만 사이트 예약 최소 수량은 1개로 두고, 설명과 안내 문구에 2인 기준 및 최소 하루 전 예약을 명시했다. Supabase 실제 DB 갱신 중 PowerShell 인코딩 문제로 한글이 깨질 수 있어 브라우저 렌더링과 DB 조회로 재확인했다.
- 적용한 변경 사항: `src/lib/reservation-options.ts`에 포케 옵션과 하루 전 예약 대상 메뉴를 분리했다. 예약 생성 로직은 옵션 요약과 추가금을 받아 총액과 요청사항에 반영하게 수정했다. 예약 메뉴 이미지 3개를 `public/images/reservation`에 추가하고 demo data, Supabase seed/setup SQL, 실제 Supabase DB를 33개 메뉴로 맞췄다.
- 검증 결과: `/menu?type=catering`에서 예약 메뉴 3개와 경고 문구가 정상 표시됐다. `/reserve?type=picnic&menuItemId=poke-salmon`에서 드레싱 5개와 토핑 5개가 보이는 것을 확인했다. 테스트 예약을 실제로 접수해 총액 26,000원과 포케 옵션 요약 저장을 확인한 뒤 테스트 row를 삭제했다. `npm run typecheck`, `npm run build`, `npm run check:supabase`가 통과했다.

## 2026-06-17 - 네이버 로그인과 예약 조회 범위 조정

- 사용자 의도: 게스트는 로그인 없이 전화번호로 자기 예약을 조회하고, 로그인 기능은 네이버 로그인부터 붙이기로 했다. 결제, 리뷰, Solapi 문자 발송, 마케팅 자동화, 운영자 메뉴 CRUD, 배포 QA는 이번 범위에서 제외하고 후속 작업으로 남기길 원했다.
- 진행한 요청: 네이버 OAuth 직접 연동 route, 고객 세션 쿠키, 마이페이지, 전화번호 기반 게스트 예약 조회 화면을 추가했다. 로그인 상태에서 접수한 예약은 고객 프로필 id와 연결되도록 예약 생성 로직을 확장했다.
- 확인한 원인과 단서: SQL 파일은 DB 구조를 정의하지만 Supabase 실제 DB에는 SQL Editor에서 실행해야 반영된다. 네이버 로그인은 SQL만으로 작동하지 않고 네이버 개발자 Client ID/Secret, 콜백 URL, 앱 route 처리가 함께 필요하다.
- 적용한 변경 사항: `customer_profiles` 테이블과 `reservations.customer_profile_id` 컬럼을 추가하는 SQL을 준비했다. `docs/naver-login-setup.md`에 네이버 개발자 센터와 `.env.local` 설정을 정리했고, `docs/later-work.md`에 Solapi/마케팅 자동화/결제·운영 후속 작업을 기록했다.
- 검증 결과: `/login`, `/reservations`, `/mypage` 화면 렌더링을 확인했다. 네이버 키가 없을 때 `/auth/naver/start`가 로그인 설정 오류 화면으로 안전하게 돌아오는 것을 확인했다. 게스트 전화번호 조회 폼 제출 후 빈 결과 상태가 표시됐다. `npm run typecheck`, `npm run build`, `npm run check:supabase`가 통과했다.
## 2026-06-20 - 결제/문자 준비와 운영자 메뉴 관리

- 사용자 의도: 네이버 로그인/예약/조회/관리자/마이페이지 흐름을 자동으로 확인하고, 네이버페이와 Solapi는 실제 키가 준비되면 붙일 수 있게 코드 기반을 먼저 마련하기를 원했다. 운영자가 직접 메뉴를 수정할 수 있는 화면도 필요했다.
- 진행한 요청: 네이버페이 승인 요청 준비 모듈, 네이버페이 반환 페이지, Solapi 서버 전용 문자 발송 래퍼, 운영자 메뉴 관리 화면을 추가했다.
- 확인한 원인과 단서: 네이버페이는 결제창 완료 후 `paymentId`를 받아 서버에서 승인 API를 호출해야 하며, Client Secret은 브라우저에 노출하면 안 된다. Solapi SDK는 서버 전용 패키지라서 서버 함수에서만 동적 import로 사용하도록 했다.
- 적용한 변경 사항: `/admin/menu`에서 메뉴명, 설명, 가격, 최소 수량, 정렬 순서, 노출 여부를 수정할 수 있게 했다. `.env.example`과 `docs/naver-pay-setup.md`, `docs/solapi-setup.md`에 필요한 환경변수와 남은 운영 작업을 정리했다.
- 검증 결과: `npm run typecheck`, `npm run build`, `npm run check:supabase`가 통과했다. Chrome 자동 QA로 연어 포케 예약 생성, 포케 옵션 금액 DB 저장, 전화번호 예약 조회, 관리자 메뉴 화면 접근, 네이버 고객 프로필에 연결된 예약 DB 조회를 확인했다. 테스트 예약 데이터는 삭제했고 Supabase `reservations: 0` 상태를 재확인했다.
- 다음 주의사항: 실제 네이버페이 결제 노출 전에는 가맹/심사 완료, 운영 API 도메인/키 설정, 승인 성공 시 `payment_status` 갱신, 실패/취소 UX가 필요하다. Solapi 실제 발송 전에는 발신번호 인증과 수신동의/광고문자 정책을 정해야 한다.
