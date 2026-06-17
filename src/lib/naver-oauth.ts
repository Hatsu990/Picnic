export type NaverProfileResponse = {
  resultcode: string;
  message: string;
  response?: {
    id: string;
    email?: string;
    nickname?: string;
    name?: string;
    profile_image?: string;
  };
};

export function getNaverRedirectUri(origin: string) {
  return process.env.NAVER_REDIRECT_URI || `${origin}/auth/naver/callback`;
}

export function getSafeNextPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/mypage";
  }

  return value;
}

export function hasNaverOAuthConfig() {
  return Boolean(process.env.NAVER_CLIENT_ID && process.env.NAVER_CLIENT_SECRET);
}
