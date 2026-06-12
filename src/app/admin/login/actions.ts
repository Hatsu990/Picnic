"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createAdminSessionValue,
} from "@/lib/admin-session";

export async function loginAdminAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const nextPath = String(formData.get("next") ?? "/admin");
  const configuredPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!configuredPassword || !sessionSecret) {
    redirect(
      `/admin/login?error=${encodeURIComponent("관리자 비밀번호 환경변수가 설정되지 않았습니다.")}`,
    );
  }

  if (password !== configuredPassword) {
    redirect(
      `/admin/login?error=${encodeURIComponent("관리자 비밀번호가 올바르지 않습니다.")}`,
    );
  }

  const cookieStore = await cookies();
  cookieStore.set({
    name: ADMIN_SESSION_COOKIE,
    value: await createAdminSessionValue(sessionSecret),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
    path: "/",
  });

  redirect(nextPath.startsWith("/admin") ? nextPath : "/admin");
}
