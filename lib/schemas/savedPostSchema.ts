import { Prisma } from "@prisma/client";

export type SavedPostWithPost = Prisma.SavedPostGetPayload<{
  include: {
    post: {
      select: {
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
    };
  };
}>;


export type homePostSchema = Prisma.PostGetPayload<{
  select: {
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
