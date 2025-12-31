"use client"

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LeftSideBar } from "../leftSideBar/leftSideBar";
import { useSession } from "next-auth/react";
import { GlobalSearch } from "../generals/globalSearch";
import Link from "next/link";

export function NavBar(){
    const {theme, setTheme} = useTheme();

    const [mounted, setMounted] = useState<boolean>(false);
    const [sidebarOpened, setSidebarOpened] = useState<boolean>(false);

    const { data: session } = useSession();

    useEffect(()=> setMounted(true),[]);
    if(!mounted) return null;

    return (
        <>
            {/* NAVBAR */}
            <div className="col-span-full row-span-1 flex items-center justify-between profile:px-10 px-4">
            
            <Link className="flex gap-2" href="/">
                <Image 
                    src={`/icon.png`} 
                    alt="Dark mode Icon" 
                    width={26} 
                    height={26} 
                    loading="eager"
                    className="w-auto h-auto"/>
                    
                <div className="text-xl">
                    Code<span className="text-[#ff5e00] font-bold">Nest</span>
                </div>
            </Link>

                {/* GLOBAL SEARCH */}
                <GlobalSearch />

                {/*BUTTONS */}
                <div className="flex gap-7 items-center">
                    <button 
                        className="w-9 h-9 cursor-pointer hover:bg-(--secondary-button) rounded-sm flex items-center justify-center" 
                        onClick={()=> setTheme( prev => (prev === "dark" ? "light" : "dark"))}>

                        <Image 
                            src={`/icons/general/${(theme === "dark" ? "moon" : "sun")}.svg`} 
                            alt="Dark mode Icon" 
                            width={26} 
                            height={26} 
                            className="rotate-330 "
                            loading="eager" />
                    </button>

                    { session && session?.user && 
                        <Link href="/profile">
                            <Image src={`${session.user.image!}`} alt="user icon" width={35} height={35} className="rounded-sm" />
                        </Link> }
                    
                    <button onClick={()=> setSidebarOpened(prev => !prev)} className="z-11" aria-label="dark mode bars">
                        <Image 
                            src={`/icons/${(theme === "dark") ? "dark" : "light"}/bars.svg`} 
                            alt="Dark mode bars" 
                            width={30} 
                            height={30} 
                            className="block md:hidden cursor-pointer"/>
                    </button>
                </div>
            </div>

            {/* SIDEBAR */}
            <LeftSideBar sidebar={sidebarOpened} setSidebar={setSidebarOpened} theme={theme ?? "dark"} logged={session}  />
        </>
    )
}