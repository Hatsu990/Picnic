type NaverPayReturnPageProps = {
  searchParams?: Promise<{
    paymentId?: string;
    resultCode?: string;
    resultMessage?: string;
  }>;
};

export default async function NaverPayReturnPage({
  searchParams,
}: NaverPayReturnPageProps) {
  const params = await searchParams;

  return (
    <main className="page-shell">
      <div className="page-title">
        <p className="eyebrow">네이버페이</p>
        <h1>결제 반환 확인</h1>
        <p>
          네이버페이 결제창에서 돌아오는 주소입니다. 실제 운영 전에는 서버에서
          결제 승인 API를 호출하고 예약 결제 상태를 갱신해야 합니다.
        </p>
      </div>

      <div className="panel detail-grid">
        <div className="readonly-field">
          paymentId: {params?.paymentId ?? "아직 전달되지 않았습니다."}
        </div>
        <div className="readonly-field">
          resultCode: {params?.resultCode ?? "아직 전달되지 않았습니다."}
        </div>
        <div className="readonly-field">
          resultMessage: {params?.resultMessage ?? "아직 전달되지 않았습니다."}
        </div>
      </div>
    </main>
  );
}
