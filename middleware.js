import { withAuth } from "next-auth/middleware";

export default withAuth({
  // Optional: add callbacks or options here
  // e.g., callbacks: { authorized: ({ token }) => !!token }
});

export const config = {
  matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
};