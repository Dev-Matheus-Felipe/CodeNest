import { ResponseForm } from "@/components/posts/responseForm";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

export default async function ResponseEdit({params} : {params: {id: string}}){
    const { id } =  params;
    
    const session = await auth();
    if(!session?.user) redirect("/");

    const response = await prisma.response.findUnique({
        where: {id: id}
    })

    if(!response) return <p className="w-full h-[50%] flex justify-center items-center">Post not foud</p>;


    return (
        <div className="flex flex-col w-full h-full pt-5 p-[3%] pb-4 gap-3">
            <ResponseForm response={response} user={session?.user} post={response.postId} />
        </div>
    )
}