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
      if(!user.email) return false;
      
      const userFound = await prisma.user.findUnique({
        where: {id: user.id},
        select: {bannedAt: true}
      })

      if(userFound) return false;

      return true
    } 
  },

  events: {
    async createUser({user}){
      if(!user.username){
        const FirstName = (user.name) ? user.name.split(" ")[0].toLocaleLowerCase() : "user";
        const SlicedId = (user.id) ? user.id.slice(0,6) : Math.floor(Math.random() * 500);

        const username = `${FirstName}-${SlicedId}`;

        const userFound = await prisma.user.findUnique({
          where: {id: user.id},
          select: {createdAt: true}
        })

        if(!userFound) return;

        const data = new Date(userFound?.createdAt);

        const createdResume = data.toLocaleDateString("en-US",{
          month: "long",
          year: "numeric"
        })

        await prisma.user.update({
          where: {id: user.id},
          data: {username,createdResume},
        });
      }
    }
  },

  session: {
    strategy: "database",
    maxAge: 7 * 24 * 60 * 60, // 7 dias
    updateAge: 24 * 60 * 60,  // 1 dia
  }

})