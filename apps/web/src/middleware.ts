import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./libs/server";
import { decodeTokenFetch } from "./libs/fetch/decode";

const dashboardUrl = /^\/dashboard\/.+/;

export async function middleware(req: NextRequest) {
  const token = await getCookie("token");
  const url = req.nextUrl.pathname;

  const isTokenValid = async (token: string | undefined) => {
    if (!token) return false;
    try {
      const res = await decodeTokenFetch(token);

      if (res.status !== 200) return false;
      if (!res.data.user?.id) return false;

      return true;
    } catch (error) {
      return false;
    }
  };

  const tokenValid = await isTokenValid(token?.value);

  if (!tokenValid) {
    if (url === "/dashboard" || dashboardUrl.test(url)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (tokenValid && url == "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!tokenValid && dashboardUrl.test(url)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
