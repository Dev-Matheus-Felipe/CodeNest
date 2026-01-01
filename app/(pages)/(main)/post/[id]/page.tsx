import { CodeEditorComponent } from "@/components/CodeEditor/CodeEditorComponent";
import { Response } from "@/components/posts/response";
import { Like } from "@/components/buttons/like";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Image from "next/image";
import { ResponseForm } from "@/components/posts/responseForm";
import { AddCollection } from "@/components/buttons/addCollection";
import { AskedTime } from "@/components/generals/askedTime";
import { UniquePost } from "@/lib/types/uniquePost";
import { ResponseGeneralType } from "@/lib/types/response";

import type { Metadata } from "next";
import { NotFound } from "@/components/generals/notFound";

export const metadata: Metadata = {
  title: "Question – Code Nest",
  description:
    "View a programming question and community answers on Code Nest.",
  openGraph: {
    title: "Question on Code Nest",
    description:
      "Explore a developer question and see answers from the community.",
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default async function Post({params}: { params: {id: string} }){
    
    const { id } =  await params;

    const post: UniquePost | null = await prisma.post.findUnique({
        where: {id: id},
        include: {
            author: true, 
            responses: {
                include: {
                    author: {
                        select: {
                            id: true,
                            image: true,
                            name: true,
                            username: true,
                        }
                    }}
            }
        }
    })


    if(!post) return <NotFound data="Post not found." />
    
    const session = await auth();
    const liked: boolean =  !!session?.user?.id && post.likedBy.includes(session.user.id);

    const saved = (session?.user.id) 
        ? await prisma.savedPost.findUnique({where: {userId_postId: {userId: session.user.id, postId: post.id}}}) ? true : false
        : false;

    return (
        <div className="flex flex-col w-full h-full pt-5 p-[3%] pb-4 gap-3">
            <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                    <Image 
                        src={post.author.image ?? "/icons/general/user.svg"} 
                        alt="Author Image" 
                        width={30} 
                        height={30} 
                        className="rounded-full"/> 
                    <p className="text-md">{post.author.name}</p>
                </div>

                <div className="flex gap-4 text-xs items-center">
                    <div className="flex items-center gap-1">
                        <Like id={post.id} content="post" liked={liked} user={session?.user} /> 

                        {post.likedBy.length}
                    </div>

                    <AddCollection user={session?.user ? true : false} post={post.id} saved={saved} />
                </div>
            </div>

            <h1 className="text-2xl">{post.title}</h1>

            <div className="flex gap-5 items-center pb-7">
                <AskedTime createdAt={post.createdAt} />

                <div className="flex gap-1 items-center">
                    <Image src="/icons/general/message.svg" alt="Like icon" width={20} height={20} />

                    <p className="text-[10px]">
                        Answers {post.responses.length}
                    </p>
                </div>
            </div>

            <p className="text-md w-full px-1">{post.description}</p>
            
            {post.code && <CodeEditorComponent post={post} />}

            {post.responses.length >=0 && post.responses.map((response: ResponseGeneralType) => (
                <Response key={response.id} response={response} />
            ))}

            <ResponseForm user={session?.user} post={post.id} />
        </div>
    )
}