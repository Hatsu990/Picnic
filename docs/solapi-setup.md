# Solapi 문자 발송 준비

현재 코드는 문자 발송 준비만 되어 있고, 기본값은 발송 비활성화입니다.

## 필요한 값

```env
SOLAPI_ENABLED=false
SOLAPI_API_KEY=
SOLAPI_API_SECRET=
SOLAPI_SENDER=
```

실제 발송을 켤 때만 `SOLAPI_ENABLED=true`로 바꿉니다. `SOLAPI_SENDER`는 Solapi에서 등록/인증된 발신번호여야 합니다.

## 구현 위치

- `src/lib/solapi.ts`: 서버 전용 문자 발송 래퍼
- `buildReservationReceivedSms`: 예약 접수 안내 문자 문구 생성

## 남은 작업

1. Solapi API Key/Secret 발급
2. 발신번호 등록 및 인증
3. 예약 접수/확정/취소 중 어느 시점에 문자를 보낼지 확정
4. 관리자 화면에서 수동 발송 또는 상태 변경 시 자동 발송 연결
5. 광고성 문자 발송 전 수신동의/080 수신거부 정책 정리
