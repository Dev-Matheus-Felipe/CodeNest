"use client"

import { EditProfileForm } from "@/lib/actions/editProfileForm";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";

export function Form({session} : {session: Session}){  
    const [state, action, isLoading] = useActionState(EditProfileForm,{
        success: false,
        message: {}
    });

    const [buttonHandler, setButtonHandler] = useState(false);
    
    useEffect(()=>{
        if(state.success){
            state.success = false;
            if(buttonHandler) return;

            setButtonHandler(true);

            setTimeout(()=>{
                setButtonHandler(false);
            },1800)
        }
    },[state.success]);

    const inputStyle = "bg-(--secondary-button) h-11 mt-1 mb-4 w-full rounded-sm outline-0 px-3 text-xs";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        const formData = new FormData(e.currentTarget);
        startTransition(() => {
            action(formData); 
        });

    };

    return( 
        <>
            <div className={`w-45 h-16 bg-green-600 text-white absolute z-999 left-1/2 -translate-x-1/2 rounded-md 
            ${buttonHandler ? "-top-1" : "-top-40"} flex items-center justify-center gap-2 duration-500`}>
                <Image src="/icons/general/sucess.svg" alt="Sucess Icon" width={20} height={20} />
                <h1 className="text-sm">User updated!</h1>
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
            <label>Name<span className="text-orange-500 pl-1 text-lg">*</span></label>
            <input className={inputStyle} type="text" name="name" defaultValue={session.user.name ?? ""} autoComplete="false" />
            {
                (!state.success && state.message["name"]) &&
                    <p className="text-red-600 text-xs pb-3">{state.message["name"]}</p>
            }


            <label>Username<span className="text-orange-500 pl-1 text-lg">*</span></label>
            <input className={inputStyle } name="username" defaultValue={session.user.username ?? ""} autoComplete="false" />
            {
                (!state.success && state.message["username"]) &&
                    <p className="text-red-600 text-xs pb-3">{state.message["username"]}</p>
            }

            <label>Bio</label>
            <input className={inputStyle} name="bio" defaultValue={session.user.description ?? ""} autoComplete="false" />
            {
                (!state.success && state.message["bio"]) &&
                    <p className="text-red-600 text-xs pb-3">{state.message["bio"]}</p>
            }

            <label>Portfolio</label>
            <input className={inputStyle} name="portfolio" defaultValue={session.user.portfolio ?? ""} autoComplete="false" />
            {
                (!state.success && state.message["portfolio"]) &&
                    <p className="text-red-600 text-xs">{state.message["portfolio"]}</p>
            }

            <button className={`bg-(--confirm-button) h-10 w-25  rounded-md text-xs cursor-pointer 
            hover:bg-orange-500 text-white mt-3 `} type="submit">{isLoading ? "Sending..." : "Confirm"}</button>    
        </form>
        </>
    )
}