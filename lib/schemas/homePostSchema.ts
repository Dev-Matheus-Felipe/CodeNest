import { Prisma } from "@prisma/client";

export type homePostSchema = Prisma.PostGetPayload<{
  include: {
    id: true;
    title: true;
    tags: true;
    createdAt: true;
    likedBy: true;
    
    author: {
      select: {
        name: true;
        image: true;
      };
    };
    responses: {
      select: {
        id: true;
        content: true;
        likedBy: true;
        createdAt: true;
      };
    };
  };
}>;
