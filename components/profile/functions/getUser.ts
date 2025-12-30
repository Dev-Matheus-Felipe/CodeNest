"use server";

import { prisma } from "@/lib/prisma";
import { FullUserType } from "@/lib/types/fullUser";

export async function GetUser({ username }: { username: string }) {
  const user: FullUserType | null = await prisma.user.findUnique({
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

          responses: { 
            select: { 
              id: true,
              content: true,
              likedBy: true,
              createdAt: true,
            } 
          }
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
