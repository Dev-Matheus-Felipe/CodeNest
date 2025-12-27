import { CodeEditorComponent } from "@/components/CodeEditor/CodeEditorComponent";
import { askedTimeAgo } from "@/components/posts/postInfo";
import { Response } from "@/components/posts/response";
import { Like } from "@/components/buttons/like";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Image from "next/image";
import { ResponseForm } from "@/components/posts/responseForm";
import { AddCollection } from "@/components/buttons/addCollection";

export default async function Post({params}: { params: {id: string} }){
    const { id } = await params;

    const post = await prisma.post.findUnique({
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


    if(!post) return <p className="w-full h-[50%] flex justify-center items-center">Post not foud</p>
    
    const session = await auth();
    const liked =  !!session?.user?.id && post.likedBy.includes(session.user.id);

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

                <div className="flex gap-2 text-xs items-center">
                    <Like id={post.id} content="post" liked={liked} user={session?.user} /> 

                        {post.likedBy.length}

                    <AddCollection user={session?.user ? true : false} post={post.id} saved={saved} />
                </div>
            </div>

            <h1 className="text-2xl">{post.title}</h1>

            <div className="flex gap-5 items-center pb-7">
                <div className="flex gap-1 items-center">
                    <Image src="/icons/general/time.svg" alt="Time icon" width={15} height={15} />
                    <p className="text-[10px]">
                         asked {askedTimeAgo(post.createdAt)}
                    </p>
                </div>

                <div className="flex gap-1 items-center">
                    <Image src="/icons/general/message.svg" alt="Like icon" width={20} height={20} />

                    <p className="text-[10px]">
                        Answers {post.responses.length}
                    </p>
                </div>
            </div>

            <p className="text-md">{post.description}</p>
            
            {post.code && <CodeEditorComponent post={post} />}

            {post.responses.length >=0 && post.responses.map((response) => (
                <Response key={response.id} response={response} />
            ))}

            <ResponseForm user={session?.user} post={post.id} />
        </div>
    )
}