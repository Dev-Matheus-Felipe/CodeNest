"use server";

import { Prisma } from "@/src/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export type UserType = Prisma.UserGetPayload<{
  include: {
    posts: {
      include: {
        author: {
          select: {
            name: true;
            image: true;
          }
        }

        responses: { select: { id: true } }
      }
    };

    responses: {
      include: {
        post: { select: { title: true } }
        
        author: {
          select: {
            name: true;
            image: true;
          }
        }
      }
    };
  }
}>;

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
