import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    username?: string | null;
    bio?: string | null;
    createdResume?: string | null;
    portfolio?: string | null;
    createdAt: Date
  }

  interface Session {
    user: User;
  }
}
