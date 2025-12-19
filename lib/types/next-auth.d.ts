import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    username?: string | null;
    description?: string | null;
  }

  interface Session {
    user: User;
  }
}
