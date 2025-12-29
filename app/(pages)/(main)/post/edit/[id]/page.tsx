import { PostFormComponent } from "@/components/posts/postFormComponent";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

export default async function EditPost({params} : {params: {id: string}}){
    const { id } = await params;
    
    const session = await auth();
    if(!session?.user) redirect("/");

    const post = await prisma.post.findUnique({
        where: {id: id}
    })

    if(!post) return <p className="w-full h-[50%] flex justify-center items-center">Post not foud</p>;


    return (
        <PostFormComponent post={post} />
    )
}