import { loginAdminAction } from "./actions";

type AdminLoginPageProps = {
  searchParams?: Promise<{
    error?: string;
    next?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;

  return (
    <div className="page-shell auth-shell">
      <section className="panel auth-panel">
        <p className="eyebrow">관리자 로그인</p>
        <h1>예약 관리 접근</h1>
        <p>
          예약 목록과 상태 변경은 관리자 비밀번호로 보호됩니다. 운영 배포 전에는
          Supabase Auth 기반 계정 보호로 교체하는 것을 권장합니다.
        </p>

        {params?.error ? <div className="error-box">{params.error}</div> : null}

        <form action={loginAdminAction} className="form-grid">
          <input type="hidden" name="next" value={params?.next ?? "/admin"} />
          <div className="field full">
            <label htmlFor="password">관리자 비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          <div className="field full">
            <button className="primary" type="submit">
              로그인
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
