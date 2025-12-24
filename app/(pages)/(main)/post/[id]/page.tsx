import { CodeEditorComponent } from "@/components/CodeEditor/CodeEditorComponent";
import { askedTimeAgo } from "@/components/posts/postInfo";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Post({params}: PageProps){
    const { id } = await params;

    const post = await prisma.post.findUnique({
        where: {id: id},
        include: {author: true}
    })

    if(!post) return <p className="w-full h-[50%] flex justify-center items-center">Post not foud</p>

    return (
        <div className="flex flex-col w-full h-full pt-5 pr-10 gap-3">
            <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                    <Image src={post.author.image!} alt="Author Image" width={30} height={30} className="rounded-full"/> 
                    <p className="text-md">{post.author.name}</p>
                </div>

                <div className="cursor-pointer hover:bg-(--secondary-button) flex items-center justify-center w-7 h-7 rounded-full">
                    <Image src="/icons/general/star.svg" alt="star icon" width={18} height={18} /> 
                </div>
            </div>

            <h1 className="text-2xl">{post.title}</h1>

            <div className="flex gap-5 items-center pb-7">
                <div className="flex gap-1 items-center">
                    <Image src="/icons/general/time.svg" alt="Time icon" width={15} height={15} />
                    <p className="text-[10px]">
                        {askedTimeAgo(post.createdAt)}
                    </p>
                </div>

                <div className="flex gap-1 items-center">
                    <Image src="/icons/general/message.svg" alt="Like icon" width={20} height={20} />

                    <p className="text-[10px]">
                        Answers 1
                    </p>
                </div>
            </div>

            <p className="text-md">{post.description}</p>
            
            {post.code && <CodeEditorComponent post={post} />}
        </div>
    )
}