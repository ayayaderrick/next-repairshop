import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export default withAuth(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function middleware(request: NextRequest) {
    // console.log(request);
  },
  {
    isReturnToCurrentPage: true,
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - auth (Kinde auth routes)
     * - favicon.ico (favicon)
     * - robots.txt (robots file)
     * - images (images folder)
     * - login (login page)
     * - homepage (represented by $ after the beginning /)
     */
    "/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|login|$).*)",
  ],
};
