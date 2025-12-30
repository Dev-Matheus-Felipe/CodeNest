import { TagsContainer } from "@/components/generals/tags";
import { prisma } from "@/lib/prisma";
import { tags } from "@/lib/tagsData";
import { GeneralPostType } from "@/lib/types/generalPost";

export default async function Tags() {
  const posts: GeneralPostType[] = await prisma.post.findMany({
    select: {
        createdAt: true,
        id: true,
        title: true,
        tags: true,
        likedBy: true,

        author: {
            select: {
                image: true,
                name: true
            }
        },

        responses: {
            select: {
                id: true,
                content:true,
                likedBy: true,
                createdAt: true,
            }
        },
    }
    
  });

  const tagMap: Record<string, typeof posts> = {};

  tags.forEach(tag => {
    tagMap[tag.name] = [];
  });

  posts.forEach((post) => {
    post.tags.split(",").forEach(tag => {
      if (tagMap[tag]) {
        tagMap[tag].push(post);
      }
    });
  });

  const result = tags.map((tag: {name: string, description: string}) => ({
    tag: tag.name,
    description: tag.description,
    posts: tagMap[tag.name] ?? [],
}));

  return (
       <TagsContainer result={result} />
  )
}
