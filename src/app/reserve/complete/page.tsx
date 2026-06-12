import Link from "next/link";

type CompletePageProps = {
  searchParams?: Promise<{
    reservationNumber?: string;
  }>;
};

export default async function ReserveCompletePage({
  searchParams,
}: CompletePageProps) {
  const params = await searchParams;

  return (
    <div className="page-shell">
      <section className="panel">
        <p className="eyebrow">예약 접수 완료</p>
        <h1>예약 요청이 접수됐습니다</h1>
        <p>운영자가 내용을 확인한 뒤 연락드릴 예정입니다.</p>
        <div className="summary-row">
          <strong>접수번호</strong>
          <span>{params?.reservationNumber ?? "접수번호 확인 중"}</span>
        </div>
        <div className="action-row">
          <Link className="button primary" href="/menu">
            메뉴 더 보기
          </Link>
          <Link className="button secondary" href="/">
            홈으로
          </Link>
        </div>
      </section>
    </div>
  );
}
