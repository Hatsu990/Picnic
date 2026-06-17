import { NextRequest, NextResponse } from "next/server";
import { upsertNaverCustomerProfile } from "@/lib/customer-data";
import {
  createCustomerSessionValue,
  CUSTOMER_SESSION_COOKIE,
  CUSTOMER_SESSION_MAX_AGE_SECONDS,
  getCustomerSessionSecret,
  NAVER_NEXT_COOKIE,
  NAVER_STATE_COOKIE,
} from "@/lib/customer-session";
import {
  getNaverRedirectUri,
  getSafeNextPath,
  type NaverProfileResponse,
} from "@/lib/naver-oauth";

export async function GET(request: NextRequest) {
  const error = request.nextUrl.searchParams.get("error");
  if (error) {
    return redirectToLogin(request, "naver-denied");
  }

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const savedState = request.cookies.get(NAVER_STATE_COOKIE)?.value;
  const secret = getCustomerSessionSecret();

  if (!code || !state || state !== savedState || !secret) {
    return redirectToLogin(request, "naver-callback-invalid");
  }

  try {
    const token = await fetchNaverToken(
      code,
      state,
      getNaverRedirectUri(request.nextUrl.origin),
    );
    const profile = await fetchNaverProfile(token.access_token);
    const naverUser = profile.response;

    if (!naverUser?.id) {
      return redirectToLogin(request, "naver-profile-invalid");
    }

    const customer = await upsertNaverCustomerProfile({
      providerUserId: naverUser.id,
      email: naverUser.email ?? null,
      name: naverUser.name ?? null,
      nickname: naverUser.nickname ?? null,
      avatarUrl: naverUser.profile_image ?? null,
    });
    const sessionValue = await createCustomerSessionValue(
      {
        customerProfileId: customer.id,
        provider: "naver",
        providerUserId: customer.providerUserId,
      },
      secret,
    );
    const nextPath = getSafeNextPath(
      request.cookies.get(NAVER_NEXT_COOKIE)?.value ?? null,
    );
    const response = NextResponse.redirect(new URL(nextPath, request.url));

    response.cookies.set(CUSTOMER_SESSION_COOKIE, sessionValue, {
      httpOnly: true,
      maxAge: CUSTOMER_SESSION_MAX_AGE_SECONDS,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    response.cookies.delete(NAVER_STATE_COOKIE);
    response.cookies.delete(NAVER_NEXT_COOKIE);

    return response;
  } catch {
    return redirectToLogin(request, "naver-login-failed");
  }
}

async function fetchNaverToken(code: string, state: string, redirectUri: string) {
  const tokenUrl = new URL("https://nid.naver.com/oauth2.0/token");
  tokenUrl.searchParams.set("grant_type", "authorization_code");
  tokenUrl.searchParams.set("client_id", process.env.NAVER_CLIENT_ID!);
  tokenUrl.searchParams.set("client_secret", process.env.NAVER_CLIENT_SECRET!);
  tokenUrl.searchParams.set("code", code);
  tokenUrl.searchParams.set("state", state);
  tokenUrl.searchParams.set("redirect_uri", redirectUri);

  const response = await fetch(tokenUrl, { cache: "no-store" });
  if (!response.ok) throw new Error("Naver token request failed");

  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("Naver token missing");

  return { access_token: data.access_token };
}

async function fetchNaverProfile(accessToken: string) {
  const response = await fetch("https://openapi.naver.com/v1/nid/me", {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) throw new Error("Naver profile request failed");

  return (await response.json()) as NaverProfileResponse;
}

function redirectToLogin(request: NextRequest, code: string) {
  const url = new URL("/login", request.url);
  url.searchParams.set("error", code);
  return NextResponse.redirect(url);
}
