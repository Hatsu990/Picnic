# 네이버페이 연동 준비

현재 코드는 실결제를 바로 노출하지 않고, 네이버페이 결제창 반환과 승인 API 호출 준비만 포함합니다.

## 필요한 값

`.env.local`에 아래 값을 추가합니다.

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NAVER_PAY_CLIENT_ID=
NAVER_PAY_CLIENT_SECRET=
NAVER_PAY_CHAIN_ID=
NAVER_PAY_MODE=development
NAVER_PAY_API_BASE_URL=https://dev-pay.paygate.naver.com
```

운영 배포 후에는 `NEXT_PUBLIC_SITE_URL`을 실제 도메인으로 바꾸고, 네이버페이 운영 심사에서 받은 운영 API 도메인과 키로 교체합니다.

## 구현 위치

- `src/lib/naver-pay.ts`: 결제 요청 데이터 생성, 결제 승인 API 호출 준비
- `src/app/payments/naver/return/page.tsx`: 네이버페이 결제창 반환 URL

## 남은 작업

1. 네이버페이 가맹/심사 완료
2. 결제 버튼 UI 노출
3. 반환 URL에서 `paymentId` 수신 후 승인 API 호출
4. 승인 성공 시 예약의 `payment_status` 갱신
5. 실패/취소 응답 UX 정리
