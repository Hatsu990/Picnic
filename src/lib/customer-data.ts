import { createSupabaseAdminClient } from "./supabase";
import type { CustomerProfile } from "./types";

type NaverProfileInput = {
  providerUserId: string;
  email: string | null;
  name: string | null;
  nickname: string | null;
  avatarUrl: string | null;
};

export async function upsertNaverCustomerProfile(input: NaverProfileInput) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    throw new Error("Supabase 연결 정보가 필요합니다.");
  }

  const { data, error } = await supabase
    .from("customer_profiles")
    .upsert(
      {
        provider: "naver",
        provider_user_id: input.providerUserId,
        email: input.email,
        name: input.name,
        nickname: input.nickname,
        avatar_url: input.avatarUrl,
        last_login_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "provider,provider_user_id" },
    )
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapCustomerProfileRow(data);
}

export async function getCustomerProfileById(id: string) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("customer_profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return mapCustomerProfileRow(data);
}

function mapCustomerProfileRow(row: any): CustomerProfile {
  return {
    id: row.id,
    provider: row.provider,
    providerUserId: row.provider_user_id,
    email: row.email,
    name: row.name,
    nickname: row.nickname,
    avatarUrl: row.avatar_url,
    marketingConsent: row.marketing_consent,
    lastLoginAt: row.last_login_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
