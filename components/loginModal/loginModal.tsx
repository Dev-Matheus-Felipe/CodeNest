"use client"

import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../providers/loginProvider/loginProvider";
import Image from "next/image";
import { useTheme } from "next-themes";
import { signIn } from "next-auth/react";

export function LoginModal(){

    const ctx = useContext(LoginContext);
    if(!ctx) return null;

    const {login, setLogin} = ctx;


    const {theme} = useTheme();
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(()=> setMounted(true),[]);
    if(!mounted) return null;
    
    return (
        <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.4)] z-100 backdrop-blur-2xlblur-sm">
            <div className="bg-(--login-modal) border border-(--login-modal-border) sm:w-77 h-80 w-[80%] z-999 absolute top-[50%] 
            left-[50%] translate-[-50%] rounded-2xl flex flex-col md:p-[2%] p-[5%] pt-6 items-center">
                <div className="flex flex-col gap-6 w-full h-full">
                    <div className="w-full border-b border-(--text-color) pb-2 flex justify-between">
                        <h1 className="text-lg">Log in</h1>
                        <button 
                            className="text-sm cursor-pointer hover:bg-(--secondary-button-hover)" 
                            onClick={()=> setLogin({state:false, pathname: null})}>

                            <Image 
                                src={`/icons/${theme === "dark" ? "dark" : "light"}/close.svg`} 
                                alt="close icon" 
                                width={25} 
                                height={25}/>
                        </button>
                    </div>

                    <div className="w-full flex gap-3 h-10 border cursor-pointer border-(--text-color) px-3 
                    hover:bg-(--secondary-button-hover) items-center">

                        <Image 
                            src={`/icons/${theme === "dark" ? "dark" : "light"}/github.svg`} 
                            alt="Github"
                            width={22}
                            height={22} 
                            className="w-5.5 h-5.5" />
                        <button 
                            className="cursor-pointer text-sm" 
                            onClick={()=> signIn("github", {callbackUrl: login.pathname ?? "/"})}>
                                Continue with Github
                        </button>
                    </div>

                    <div className="w-full flex gap-3 h-10 border cursor-pointer border-(--text-color) px-3
                     hover:bg-(--secondary-button-hover) items-center">

                        <Image src="/icons/general/google.svg"  alt="Google Icon" width={22} height={22} className="w-5.5 h-5.5"/>
                        <button 
                            className="cursor-pointer text-sm" 
                            onClick={()=> signIn("google", {callbackUrl: login.pathname ?? "/"})}>
                                Continue with Google
                        </button>
                    </div>

                    <div className="w-full flex gap-3 h-10 border cursor-pointer border-(--text-color) px-3 
                    hover:bg-(--secondary-button-hover) items-center">

                        <Image src="/icons/general/instagram.svg" alt="Instagram Icon" width={22} height={22} className="w-5.5 h-5.5" />
                        <button 
                            className="cursor-pointer text-sm" 
                            onClick={()=> signIn("github", {callbackUrl: login.pathname ?? "/"})}>
                                Continue with Instagram
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}