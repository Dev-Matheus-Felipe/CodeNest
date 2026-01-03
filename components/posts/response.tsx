import { CodeEditorResponse } from "../CodeEditor/CodeEditorResponse";
import { ResponseGeneralType } from "@/lib/types/response";
import { askedTimeAgo } from "./postInfo";
import { Like } from "../buttons/like";
import { auth } from "@/lib/auth";
import Image from "next/image";


export async function Response({response} : {response: ResponseGeneralType}){
     const session = await auth();

     const liked: boolean =
        !!session?.user?.id && response.likedBy.includes(session.user.id);

    return (
        <div className={`flex flex-col w-full py-6 mt-5 rounded-sm cursor-pointer relative gap-2
        hover:bg-[rgba(255,255,255,0.02)] px-4`}>



            {/* AUTHOR INFO */}
            <div className="pt-4 flex justify-between">
                <div className="flex gap-2 items-center">
                    <Image 
                        src={response.author.image ?? "/icons/general/user.svg" } 
                        alt="Profile Picture" 
                        width={22} 
                        height={22} 
                        className="rounded-full"/>
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
                        <Like 
                            id={response.id} content="response"                        
                            liked={liked}
                            user={session?.user} /> 

                        <p className="profile:text-xs text-[10px]">
                             {response.likedBy.length}
                        </p>
                    </div>
                </div>
            </div>

             <CodeEditorResponse response={response}  />
        </div>
    )
}