import { NextRequest, NextResponse } from "next/server";
import {
  NAVER_NEXT_COOKIE,
  NAVER_STATE_COOKIE,
  NAVER_STATE_MAX_AGE_SECONDS,
} from "@/lib/customer-session";
import {
  getNaverRedirectUri,
  getSafeNextPath,
  hasNaverOAuthConfig,
} from "@/lib/naver-oauth";

export function GET(request: NextRequest) {
  if (!hasNaverOAuthConfig()) {
    return NextResponse.redirect(
      new URL("/login?error=naver-config-missing", request.url),
    );
  }

  const state = crypto.randomUUID();
  const nextPath = getSafeNextPath(request.nextUrl.searchParams.get("next"));
  const authUrl = new URL("https://nid.naver.com/oauth2.0/authorize");
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", process.env.NAVER_CLIENT_ID!);
  authUrl.searchParams.set("redirect_uri", getNaverRedirectUri(request.nextUrl.origin));
  authUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authUrl);
  response.cookies.set(NAVER_STATE_COOKIE, state, {
    httpOnly: true,
    maxAge: NAVER_STATE_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  response.cookies.set(NAVER_NEXT_COOKIE, nextPath, {
    httpOnly: true,
    maxAge: NAVER_STATE_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
