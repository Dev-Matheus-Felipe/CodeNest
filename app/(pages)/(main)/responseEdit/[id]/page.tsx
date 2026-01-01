import { NotFound } from "@/components/generals/notFound";
import { ResponseForm } from "@/components/posts/responseForm";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ResponseType } from "@/lib/types/response";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Answer – Code Nest",
  description: "Edit your answer before publishing changes.",
  robots: {
    index: false,
    follow: false,
  },
};


export default async function ResponseEdit({params} : {params: {id: string}}){
    const { id } = await params;
    
    const session = await auth();
    if(!session?.user) redirect("/");

    const response: ResponseType | null = await prisma.response.findUnique({
        where: {id: id}
    })

    if(!response) return <NotFound data="Response not found." />;


    return (
        <div className="flex flex-col w-full h-full pt-5 p-[3%] pb-4 gap-3">
            <ResponseForm response={response} user={session?.user} post={response.postId} />
        </div>
    )
}