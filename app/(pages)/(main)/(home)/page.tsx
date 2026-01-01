import { GeneralPostType } from "@/lib/types/generalPost";
import { HomePosts } from "@/components/posts/homePosts";
import { GetAllPosts } from "@/lib/actions/getAllPosts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CodeNest – Questions & Answers for Developers",
  description:
    "Ask questions, share answers, and learn from the developer community. A place to grow your programming knowledge.",
  keywords: [
    "programming",
    "developers",
    "questions and answers",
    "stackoverflow alternative",
    "coding",
    "frontend",
    "backend",
  ],
  openGraph: {
    title: "Code Nest",
    description:
      "A community where developers ask questions, share answers, and learn together.",
    type: "website",
  },
};


export default async function Home() {
    const posts: GeneralPostType[] = await GetAllPosts();

    return (
        <HomePosts posts={posts} />
    );
}
