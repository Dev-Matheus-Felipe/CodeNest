"use server";

import { prisma } from "@/lib/prisma";

export async function GetUser({ username }: { username: string }) {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      posts: {
        include: {
          author: {
            select: {
              name: true,
              image: true
            }
          },

          responses: { select: { id: true } }
        }
      },

      responses: {
        include: {
          post: { select: { title: true } },

          author: {
            select: {
              name: true,
              image: true,
            }
          }
        }
      }
    }
  });

  return user;
}


// Tipo do retorno da função GetUser
export type UserType = Awaited<ReturnType<typeof GetUser>>;
