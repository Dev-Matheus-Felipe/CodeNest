import { HomePosts } from "@/components/posts/homePosts";
import { prisma } from "@/lib/prisma";
import { homePostSchema } from "@/lib/schemas/homePostSchema";

export default async function Home() {
  const posts: homePostSchema[] = await prisma.post.findMany({
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
