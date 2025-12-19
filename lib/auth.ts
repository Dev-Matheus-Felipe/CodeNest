import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],

  callbacks: {
    async signIn({user}){
      if(!user.username){
        const FirstName = (user.name) ? user.name.split(" ")[0].toLocaleLowerCase() : "user";
        const SlicedId = (user.id) ? user.id.slice(0,6) : Math.floor(Math.random() * 500);

        const username = `${FirstName}-${SlicedId}`;

        await prisma.user.update({
          where: {id: user.id},
          data: {username},
        });
      }

      return true;
    }
  },

  session: {
    strategy: "database",
    maxAge: 7 * 24 * 60 * 60, // 7 dias
    updateAge: 24 * 60 * 60,  // 1 dia
  }

})