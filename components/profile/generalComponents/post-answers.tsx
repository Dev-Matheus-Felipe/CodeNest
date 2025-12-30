"use client"

import { PostComponent } from "@/components/posts/postComponent"
import { askedTimeAgo } from "@/components/posts/postInfo"
import { DeleteItem } from "@/lib/actions/deleteItem"
import { UserType } from "../functions/getUser"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export function PostAnswers({user} : {user: UserType}){
    if(!user) return null;
    
    const router = useRouter();
    const [state, setState] = useState("posts");

    const data = state === "posts" ? user.posts : user.responses;
    const titleIconsCss = 
    "z-10 w-auto min-w-8 h-auto hover:bg-(--secondary-button-hover) rounded-full p-2 flex justify-center items-center cursor-pointer";

    const colorHandler = (p: string) => `cursor-pointer px-3 py-2  ${state === p && "text-orange-500 bg-(--secondary-button-hover)" }`;

    return (
        <div className="flex flex-col overflow-auto w-full gap-5 flex-1">
            <div className={`flex justify-center gap-3 bg-(--secondary-button) w-43 h-12 items-center text-xs text-(--username-color) 
            rounded-md`}>
                <p  className={colorHandler("posts")} onClick={()=> setState("posts")}>
                    Top Posts
                </p>
                
                <p  className={colorHandler("responses")} onClick={()=> setState("responses")}>
                    Answers
                </p>
            </div>
            <div className="flex flex-col w-full overflow-y-auto flex-1">
                <div className="flex flex-col w-full overflow-y-auto flex-1">
                    {data.length === 0 && (
                        <p className="p-5 text-xs">No content added yet.</p>
                    )}

                    {state === "posts" &&
                        user.posts.map((post, index) => (
                            <PostComponent key={post.id} post={user.posts[index]} user={user} />
                        ))}

                    {state === "responses" &&
                        user.responses.map((response, index) => (
                            <Link key={response.id} className={`flex flex-col w-[99%] py-3 mt-5 rounded-sm cursor-pointer relative gap-2
                            hover:bg-[rgba(255,255,255,0.02)] px-3`}  href={`/post/${user.posts[index].id}`}>
                                <div className="flex justify-between">
                    
                                    {/* TITLE */}
                                    <h1 className="profile:text-lg text-[15px] font-bold pr-13 pb-1">
                                        {user.responses[index].post.title}
                                    </h1>
                    
                                    
                                    <div className="flex gap-1 p-2 absolute left-full -translate-x-full top-1">
                                        <button className={titleIconsCss} onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            DeleteItem({ item: response, itemType: "response" });
                                        }}>

                                            <Image src={`/icons/general/trash.svg`} alt="trash icon" width={15} height={15}/>
                                        </button>
                
                                        <button className={titleIconsCss} onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            router.push(`/responseEdit/${response.id}`)
                                        }}>
                                            <Image src={`/icons/general/edit.svg`} alt="edit icon" width={15} height={15}/>
                                        </button>
                                    </div>
                                    
                                </div>
                    
                                <div className="portfolio:text-sm text-xs">
                                    <p>{response.content} </p>
                                </div>
    
                    
                                {/* AUTHOR INFO */}
                                <div className="pt-4 flex justify-between">
                                    <div className="flex gap-2 items-center">
                                        <Image 
                                            src={user.image ?? "/icons/general/user.svg"} 
                                            alt="Profile Picture" 
                                            width={22} 
                                            height={22} 
                                            className="rounded-full"/>

                                        <p className="profile:text-xs text-[10px] pr-2">
                                            {user.name}
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
                                                Likes {response.likedBy.length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}