"use client"

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export function NavBar(){
    const {theme, setTheme} = useTheme();

    const [mounted, setMounted] = useState(false);
    useEffect(()=> setMounted(true),[]);

    if(!mounted) return null;

    return (
        <div className="w-full h-28 flex justify-between items-center px-[3%!important]">
            <div className="text-xl">Code<span className="text-[#ff5e00] font-bold">Nest</span></div>
            <form className="bg-(--secondary-button) w-110 h-11 relative rounded-lg hidden md:block">
                <Image 
                src="/icons/general/search.svg" 
                alt="Search Icon" 
                width={16}
                height={16} 
                className="absolute top-1/2 left-5 -translate-y-1/2"/>

                <input 
                    type="text" 
                    placeholder="Search anything globally..." 
                    className="w-full h-full pl-[50px!important] pr-[20px!important] text-xs outline-none" />
            </form>

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

                <div className="w-7 h-7 bg-[#ff5e00] rounded-full cursor-pointer" />
                
                <Image 
                    src={`/icons/${(theme === "dark") ? "dark" : "light"}/bars.svg`} 
                    alt="Dark mode bars" 
                    width={30} 
                    height={30} 
                    className="block md:hidden cursor-pointer"/>
            </div>
        </div>
    )
}