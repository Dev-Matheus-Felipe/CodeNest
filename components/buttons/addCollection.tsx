"use client"

import { ActionCollection } from "@/lib/actions/addCollection";
import Image from "next/image";

export function AddCollection({user, post, saved} : {user: boolean, post: string, saved: boolean}){
    return (
        <button 
            className={`cursor-pointer hover:bg-(--secondary-button) flex items-center justify-center w-5.5 h-5.5 rounded-full
            ${saved && "bg-orange-800"}`}
            disabled={!user}
            onClick={() => {if(user) ActionCollection({post: post})} }>
            <Image src="/icons/general/star.svg" alt="star icon" width={18} height={18} /> 
        </button>
    )
}