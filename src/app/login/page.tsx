import Link from "next/link";
import { getCurrentCustomer } from "@/lib/customer-auth";

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  "naver-config-missing":
    "네이버 로그인 키가 아직 설정되지 않았습니다. NAVER_CLIENT_ID와 NAVER_CLIENT_SECRET을 확인해 주세요.",
  "naver-callback-invalid": "네이버 로그인 응답을 확인하지 못했습니다.",
  "naver-denied": "네이버 로그인이 취소됐습니다.",
  "naver-login-failed": "네이버 로그인 처리 중 오류가 발생했습니다.",
  "naver-profile-invalid": "네이버 프로필 정보를 가져오지 못했습니다.",
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const customer = await getCurrentCustomer();

  if (customer) {
    return (
      <div className="auth-shell">
        <section className="panel auth-panel">
          <p className="eyebrow">로그인</p>
          <h1>이미 로그인되어 있습니다</h1>
          <p>{customer.nickname || customer.name || "네이버 사용자"}님으로 접속 중입니다.</p>
          <div className="action-row">
            <Link className="button primary" href="/mypage">
              마이페이지
            </Link>
            <a className="button secondary" href="/auth/logout">
              로그아웃
            </a>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="auth-shell">
      <section className="panel auth-panel">
        <p className="eyebrow">로그인</p>
        <h1>네이버로 시작하기</h1>
        <p>
          네이버 로그인은 예약 내역을 한곳에서 보기 위한 기능입니다. 게스트 예약은
          로그인 없이도 전화번호로 조회할 수 있습니다.
        </p>
        {params?.error ? (
          <div className="error-box">
            {errorMessages[params.error] ?? "로그인을 다시 시도해 주세요."}
          </div>
        ) : null}
        <div className="action-row">
          <a className="button naver" href="/auth/naver/start">
            네이버 로그인
          </a>
          <Link className="button secondary" href="/reservations">
            게스트 예약 조회
          </Link>
        </div>
      </section>
    </div>
  );
}
