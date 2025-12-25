"use client"

import { useRouter } from "next/navigation"

export function BackProfileButton(){
    const router = useRouter();
    return (
        <button className={`bg-(--confirm-button) h-10 w-10  rounded-md text-sm cursor-pointer 
        hover:bg-orange-500 text-white `} onClick={()=> router.back()}>x</button> 
    )
}