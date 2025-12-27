"use client"

import { leaveLike, LikeType } from "@/lib/actions/like";
import Image from "next/image";
import { toast } from "sonner";

export function Like({id, content, liked, user} : LikeType){

    const like = () => {
        if(!user){
            toast.warning("Must be logged!");
            return;
        }

        leaveLike({id: id, content: content});
    }

    return (
        <button className={`cursor-pointer hover:bg-(--secondary-button) flex items-center justify-center w-5.5 h-5.5 rounded-full
        ${liked ? "bg-(--like-color)" : "bg-transparent"}`}>
            <Image 
                src="/icons/general/like.svg" 
                alt="like icon" 
                width={18} 
                height={18} 
                onClick={() => like()} /> 
        </button>
    )
}