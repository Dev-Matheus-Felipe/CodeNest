"use client"

import { leaveLike, LikeType } from "@/lib/actions/like";
import Image from "next/image";

export function Like({id, content} : LikeType){
    return (
        <button className="cursor-pointer hover:bg-(--secondary-button) flex items-center justify-center w-7 h-7 rounded-full">
            <Image 
                src="/icons/general/like.svg" 
                alt="star icon" 
                width={18} 
                height={18} 
                onClick={() => leaveLike({id: id, content: content})} /> 


        </button>
    )
}