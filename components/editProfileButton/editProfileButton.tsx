"use client"

import { useRouter } from "next/navigation"

export function EditProfileButton(){
    const router = useRouter();
    return (
        <button className={`bg-(--secondary-button) w-30 h-10 rounded-md text-xs cursor-pointer 
        hover:bg-(--secondary-button-hover)`} onClick={()=> router.push("/profile/edit")}>
            Edit Profile
        </button>
    )
}