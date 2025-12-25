import { auth } from "@/lib/auth";
import Image from "next/image";
import { askedTimeAgo } from "./postInfo";
import { CodeEditorComponent } from "../CodeEditor/CodeEditorComponent";

export type ResponseTpe = {
    id: string;
    content: string;
    code?: string | null;
    language: string;
    createdAt: Date;
    likes: number;
    postId: string,
    authorId: string,

    author: {
        id: string;
        username?: string | null;
        name?: string | null;
        image?: string | null;
    };
};


export async function Response({response} : {response: ResponseTpe}){
    const session = await auth();
    const titleIconsCss = "w-auto min-w-8 h-auto hover:bg-(--secondary-button-hover) rounded-full p-2 flex justify-center items-center";

    return (
        <div className={`flex flex-col w-full py-3 mt-5 rounded-sm cursor-pointer relative gap-2
        hover:bg-[rgba(255,255,255,0.02)] px-3`}>
            <div className="flex justify-between">

                {/* TITLE */}
                <h1 className="profile:text-lg text-[15px] font-bold pr-13 pb-1">
                    {response.author.name}
                </h1>

                
                {   /* TITLE ICONS */
                    (response.authorId === session?.user.id) &&
                    <div className="flex gap-1 p-2 absolute left-full -translate-x-full top-1">
                        <div className={titleIconsCss}>
                            <Image src={`/icons/general/trash.svg`} alt="trash icon" width={15} height={15}/>
                        </div>

                        <div className={titleIconsCss}>
                            <Image src={`/icons/general/edit.svg`} alt="edit icon" width={15} height={15}/>
                        </div>
                    </div>
                }
            </div>

            <div className="portfolio:text-sm text-xs">
                <p>{response.content} </p>
            </div>

            {
                response.code &&
                <div>
                    <CodeEditorComponent post={response} />
                </div>
            }

            {/* AUTHOR INFO */}
            <div className="pt-4 flex justify-between">
                <div className="flex gap-2 items-center">
                    <Image src={response.author.image!} alt="Profile Picture" width={22} height={22} className="rounded-full"/>
                    <p className="profile:text-xs text-[10px] pr-2">
                        {response.author.name}
                    </p>
                    
                    <Image src="/icons/general/time.svg" alt="Time icon" width={15} height={15} />
                    <p className="profile:text-xs text-[10px]">
                        Answered {askedTimeAgo(response.createdAt)}
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="flex gap-2 items-center">
                        <Image src="/icons/general/like.svg" alt="Like icon" width={20} height={20} />

                        <p className="profile:text-xs text-[10px]">
                            Likes {response.likes}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}