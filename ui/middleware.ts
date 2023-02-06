import { log } from "console";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

//  check working with redirect method
// export function middleware(req: NextRequest, ev: NextFetchEvent) {
//   return NextResponse.redirect("/underConstraction");
// }

// check working with rewrite method
export function middleware(req: NextRequest, ev: NextFetchEvent) {
  console.log("mddleware", `${process.env.CLIENT_LOCAL_URL}/user/login`, "fff");
  // const url = new URL(`/user/login`, req.nextUrl);
  // return NextResponse.rewrite(new URL(`/user/login`, req.nextUrl));

  // return NextResponse.redirect(`${process.env.CLIENT_LOCAL_URL}/user/login`);
  // return NextResponse.redirect(url, 302);
  const url = req.nextUrl.clone();
  url.pathname = "/user/login";
  return NextResponse.redirect(url, 302);
  //   if (url.pathname === "/") {

  //   }
}

export const config = {
  matcher: ["/"],
};
