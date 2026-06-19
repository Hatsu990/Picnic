type SendSmsInput = {
  to: string;
  text: string;
};

type SendSmsResult =
  | { ok: true; skipped: false; result: unknown }
  | { ok: false; skipped: true; reason: "disabled" | "missing-config" }
  | { ok: false; skipped: false; error: string };

function getSolapiConfig() {
  const enabled = process.env.SOLAPI_ENABLED === "true";
  const apiKey = process.env.SOLAPI_API_KEY;
  const apiSecret = process.env.SOLAPI_API_SECRET;
  const sender = process.env.SOLAPI_SENDER;

  if (!enabled) {
    return { enabled: false as const };
  }

  if (!apiKey || !apiSecret || !sender) {
    return { enabled: true as const, complete: false as const };
  }

  return {
    enabled: true as const,
    complete: true as const,
    apiKey,
    apiSecret,
    sender,
  };
}

export function isSolapiConfigured() {
  const config = getSolapiConfig();
  return config.enabled && "complete" in config && config.complete;
}

export async function sendSms({ to, text }: SendSmsInput): Promise<SendSmsResult> {
  const config = getSolapiConfig();

  if (!config.enabled) {
    return { ok: false, skipped: true, reason: "disabled" };
  }

  if (!("complete" in config) || !config.complete) {
    return { ok: false, skipped: true, reason: "missing-config" };
  }

  try {
    const { SolapiMessageService } = await import("solapi");
    const service = new SolapiMessageService(config.apiKey, config.apiSecret);
    const result = await service.send([
      {
        to,
        from: config.sender,
        text,
      },
    ]);

    return { ok: true, skipped: false, result };
  } catch (error) {
    return {
      ok: false,
      skipped: false,
      error: error instanceof Error ? error.message : "문자 발송 실패",
    };
  }
}

export function buildReservationReceivedSms(input: {
  customerName: string;
  reservationNumber: string;
}) {
  return `[소풍] ${input.customerName}님, 예약이 접수되었습니다. 예약번호: ${input.reservationNumber}`;
}
