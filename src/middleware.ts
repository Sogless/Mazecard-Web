export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: ["/cooperative/dashboard/:path*", "/admin/:path*"],
};
