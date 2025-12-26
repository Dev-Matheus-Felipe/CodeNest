import Image from "next/image";
import { askedTimeAgo } from "./postInfo";
import { CodeEditorComponent } from "../CodeEditor/CodeEditorComponent";
import { Like } from "../buttons/like";

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
    return (
        <div className={`flex flex-col w-full py-6 mt-5 rounded-sm cursor-pointer relative gap-2
        hover:bg-[rgba(255,255,255,0.02)] px-4`}>
        

            <div className="profile:text-[17px] text-xs">
                <h1>{response.content} </h1>
            </div>

            { response.code && <div> <CodeEditorComponent post={response} /> </div> }

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
                        <Like id={response.id} content="response" />
                        <p className="profile:text-xs text-[10px]">
                             {response.likes}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}