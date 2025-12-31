import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { prisma } from "./prisma"
import Discord from "next-auth/providers/discord";
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [ GitHub, Google,  
    Discord({
    clientId: process.env.AUTH_DISCORD_CLIENT_ID!,
    clientSecret: process.env.AUTH_DISCORD_CLIENT_SECRET!,
  }), ],

  callbacks: {
    async signIn({user}){
      if(!user.email) return false;
      
      const userFound = await prisma.user.findUnique({
        where: {id: user.id},
        select: {bannedAt: true}
      })

      if(userFound?.bannedAt) return false;

      return true
    } 
  },

  events: {
    async createUser({user}){
      if(!user.username){
        let FirstName = (user.name) ? user.name.split(" ")[0].toLocaleLowerCase() : "user";
        if(FirstName.length > 13) FirstName = FirstName.slice(0,12);
        
        const SlicedId = (user.id) ? user.id.slice(0,6) : Math.floor(Math.random() * 100000);

        const username = `${FirstName}-${SlicedId}`;

        const userFound = await prisma.user.findUnique({
          where: {id: user.id},
          select: {createdAt: true}
        })

        if(!userFound) return;

        const data = new Date(userFound.createdAt);
        const image = user.image ? user.image : "/icons/general/user.svg";

        const createdResume = data.toLocaleDateString("en-US",{
          month: "long",
          year: "numeric"
        })
        
        await prisma.user.update({
          where: {id: user.id},
          data: {username,createdResume, image},
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