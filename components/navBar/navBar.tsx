"use client"

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Navegation = {
    label: string,
    src: string,
    href: string
}


export function NavBar(){
    const {theme, setTheme} = useTheme();
    const pathname = usePathname();

    const [mounted, setMounted] = useState<boolean>(false);
    const [sidebarOpened, setSidebarOpened] = useState<boolean>(false);

    const navegation: Navegation[] = [
        {label: "Home", src: `/icons/${theme === "dark" ? "dark" : "light"}/house.svg`, href: "/"},
        {label: "Community", src: `/icons/${theme === "dark" ? "dark" : "light"}/star.svg`, href: "/community"},
        {label: "Collections", src: `/icons/${theme === "dark" ? "dark" : "light"}/house.svg`, href: "/collections"},
        {label: "Tags", src: `/icons/${theme === "dark" ? "dark" : "light"}/tag.svg`, href: "/tags"},
        {label: "Profile", src: `/icons/${theme === "dark" ? "dark" : "light"}/profile.svg`, href: "/profile"},
        {label: "Ask a question", src: `/icons/${theme === "dark" ? "dark" : "light"}/ask.svg`, href: "/ask_questions"},
    ];

    useEffect(()=> setMounted(true),[]);
    if(!mounted) return null;

    return (
        <>
            {/* NAVBAR */}
            <div className="col-span-full row-span-1 flex items-center justify-between px-10">
            
                {/* LOGO */}
                <div className="text-xl">Code<span className="text-[#ff5e00] font-bold">Nest</span></div>

                {/* GLOBAL SEARCH */}
                <form className="bg-(--secondary-button) w-110 h-11 relative rounded-lg hidden md:block">
                    <Image 
                        src="/icons/general/search.svg" 
                        alt="Search Icon" 
                        width={16}
                        height={16} 
                        className="absolute top-1/2 left-4 -translate-y-1/2"/>

                    <input 
                        type="text" 
                        placeholder="Search anything globally..." 
                        className="w-full h-full px-11 text-xs outline-none" />
                </form>

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

                    {/*<div className="w-7 h-7 bg-[#ff5e00] rounded-full cursor-pointer" /> */}
                    
                    <button onClick={()=> setSidebarOpened(prev => !prev)} className="z-11">
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

            <aside className={`absolute md:relative md:top-0 md:left-0 md:h-auto top-3 ${sidebarOpened ? "left-2 " : "left-[-90%]"}
            col-span-1 row-span-1 flex flex-col items-center justify-between p-4 duration-1000 h-[80%] z-10`}>
                <nav className=" w-full flex flex-col items-center gap-7">
                    {
                        navegation.map((e: Navegation, index:number) => (
                                <Link key={index} href={e.href} className={`cursor-pointer w-45 h-12 flex items-center justify-start
                                px-5 gap-3 border border-transparent hover:border-amber-600 rounded-sm ${(pathname == e.href) && 
                                "text-white bg-linear-to-r from-(--primary-color-button) to-(--secondary-color-button) "}
                                `}>

                                    <Image 
                                        src={e.src} 
                                        alt="Sidebar Icon" 
                                        width={18} 
                                        height={18} />

                                    <p className={`text-[13px] ${pathname !== e.href && "text-(--sidebar-text-color)"}`}>{e.label}</p>
                                </Link>
                        ))
                    }
                </nav>
                
                <button className="bg-(--secondary-button) w-45 h-10 text-[13px] rounded-sm cursor-pointer
                hover:bg-(--secondary-button-hover)">
                    Log in
                </button>
            </aside>
        </>
    )
}