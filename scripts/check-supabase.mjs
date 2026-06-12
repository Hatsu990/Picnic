import { existsSync, readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

loadEnvFile(".env.local");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error(
    "Supabase 연결 확인 실패: NEXT_PUBLIC_SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY가 없습니다.",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const { count: menuCount, error: menuError } = await supabase
  .from("menu_items")
  .select("*", { count: "exact", head: true });

if (menuError) {
  console.error(`menu_items 확인 실패: ${menuError.message}`);
  process.exit(1);
}

const { count: reservationCount, error: reservationError } = await supabase
  .from("reservations")
  .select("*", { count: "exact", head: true });

if (reservationError) {
  console.error(`reservations 확인 실패: ${reservationError.message}`);
  process.exit(1);
}

console.log(`Supabase 연결 확인 성공`);
console.log(`menu_items: ${menuCount ?? 0}`);
console.log(`reservations: ${reservationCount ?? 0}`);

function loadEnvFile(path) {
  if (!existsSync(path)) return;

  const lines = readFileSync(path, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^['"]|['"]$/g, "");

    process.env[key] ??= value;
  }
}
