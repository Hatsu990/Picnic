import { NextRequest, NextResponse } from "next/server";
import { CUSTOMER_SESSION_COOKIE } from "@/lib/customer-session";

export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.delete(CUSTOMER_SESSION_COOKIE);
  return response;
}
