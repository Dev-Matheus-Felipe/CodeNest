import { NotFound } from "@/components/generals/notFound";
import { PostFormComponent } from "@/components/posts/postFormComponent";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UniquePostEdit } from "@/lib/types/uniquePost";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Question – Code Nest",
  description: "Edit your question details, tags, and content.",
  robots: {
    index: false,
    follow: false,
  },
};


export default async function EditPost({params} : {params: {id: string}}){
    const { id } = await params;
    
    const session = await auth();
    if(!session?.user) redirect("/");

    const post: UniquePostEdit | null = await prisma.post.findUnique({
        where: {id: id}
    })

    if(!post) return <NotFound data="Post not found." />;


    return (
        <PostFormComponent post={post} />
    )
}