
export const dynamic = "force-dynamic";

import { HomePosts } from "@/components/posts/homePosts";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const posts = await prisma.post.findMany({
      select: {
          id: true,
          title: true,
          tags: true,
          createdAt: true,
          likedBy: true,

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
                  createdAt: true
              }
          }
      }
  });

  return (
    <HomePosts posts={posts} />
  );
}
