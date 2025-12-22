import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    username?: string | null;
    description?: string | null;
    createdResume?: string | null;
    portfolio?: string | null;
  }

  interface Session {
    user: User;
  }
}
