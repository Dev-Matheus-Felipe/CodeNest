import { TagsContainer } from "@/components/generals/tags";
import { prisma } from "@/lib/prisma";
import { tags } from "@/lib/tagsData";
import { GeneralPostType } from "@/lib/types/generalPost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags – Code Nest",
  description:
    "Browse questions by programming tags and discover topics you care about.",
  keywords: [
    "programming tags",
    "topics",
    "questions by tag",
    "javascript",
    "react",
    "nextjs",
  ],
};


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
