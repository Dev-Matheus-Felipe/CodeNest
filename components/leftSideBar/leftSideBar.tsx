import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

type Logged = {
  expires: string
  user?: {
    id?: string | null
    name?: string | null  
    email?: string | null  
    image?: string | null 
  }
}

export function LeftSideBar({sidebarOpened, theme, logged} : {sidebarOpened: boolean, theme: string, logged: Logged | null}){

    const pathname = usePathname();

    const [buttonHandler, setButtonHandler] = useState(false);

    const linkStyles = `cursor-pointer w-45 h-12 flex items-center justify-start px-5 gap-3 border border-transparent
    hover:border-amber-600 rounded-sm } `;

    const linkSelected = (currentlyPath : string) => {
        return `${(pathname === currentlyPath) 
            && "text-white bg-linear-to-r from-(--primary-color-button) to-(--secondary-color-button)"}`;
    }

    const profileHandler = (e : React.MouseEvent) => {
        if(!logged){
            e.preventDefault();
            if(buttonHandler) return;

            setButtonHandler(true);

            setTimeout(()=>{
                setButtonHandler(false);
            },2000)
        }
    }

    return (
        <>
            <div className={`w-45 h-17 bg-(--primary-color-button) text-white absolute z-999 left-1/2 -translate-x-1/2 rounded-md 
            ${buttonHandler ? "-top-2" : "-top-40"} flex items-center justify-center gap-5 duration-500`}>
                <Image src={`/icons/general/login.svg`} alt="Home Icon"  width={15} height={15} />
                <h1 className="text-sm">Please Log in first</h1>
            </div>

            <aside className={`absolute md:relative md:left-0 md:h-full top-0 ${sidebarOpened ? "left-0 " : "left-[-90%]"}
                col-span-1 row-span-1 flex flex-col items-start justify-between p-4 duration-1000 md:gap-0 gap-10
                z-10 bg-(--secondary-button) rounded-sm md:bg-transparent`}>

                <nav className="w-full flex flex-col items-start gap-7">
                    
                    <Link href="/" className={`${linkStyles} ${linkSelected("/")}`}>
                        <Image src={`/icons/${theme}/house.svg`} alt="Home Icon"  width={18} height={18} />
                        <p className={`text-[13px] ${pathname !== "/" && "text-(--sidebar-text-color)"}`}>Home</p>
                    </Link>

                    <Link href="/community" className={`${linkStyles} ${linkSelected("/community")}`}>
                        <Image src={`/icons/${theme}/people.svg`} alt="People Icon"  width={18} height={18} />
                        <p className={`text-[13px] ${pathname !== "/community" && "text-(--sidebar-text-color)"}`}>Community</p>
                    </Link>

                    <Link href="/collections" className={`${linkStyles} ${linkSelected("/collections")}`}>
                        <Image src={`/icons/${theme}/star.svg`} alt="Star Icon"  width={18} height={18} />
                        <p className={`text-[13px] ${pathname !== "/collections" && "text-(--sidebar-text-color)"}`}>Collections</p>
                    </Link>

                    <Link href="/tags" className={`${linkStyles} ${linkSelected("/tags")}`}>
                        <Image src={`/icons/${theme}/tag.svg`} alt="Tag Icon"  width={18} height={18} />
                        <p className={`text-[13px] ${pathname !== "/tags" && "text-(--sidebar-text-color)"}`}>Tags</p>
                    </Link>

                    <Link href="/profile" className={`${linkStyles} ${linkSelected("/profile")}`} onClick={(e)=> profileHandler(e)}>
                        <Image src={`/icons/${theme}/profile.svg`} alt="Tag Icon"  width={18} height={18} />
                        <p className={`text-[13px] ${pathname !== "/profile" && "text-(--sidebar-text-color)"}`}>Profile</p>
                    </Link>

                    <Link href="/question" className={`${linkStyles} ${linkSelected("/tags")}`}>
                        <Image src={`/icons/${theme}/ask.svg`} alt="Tag Icon"  width={18} height={18} />
                        <p className={`text-[13px] ${pathname !== "/question" && "text-(--sidebar-text-color)"}`}>Ask a question</p>
                    </Link>
                
                    
                </nav>
                
                <button className="md:bg-(--secondary-button) bg-(--secondary-button-hover) text-[13px] rounded-sm w-43 h-10
                 cursor-pointer hover:bg-(--secondary-button-hover)" 
                 onClick={() =>{ signIn("github")}}>
                    {logged ? "Log out" : "Log in"} 
                </button>
            </aside>

            <div className={`duration-1000 absolute  ${sidebarOpened && "bg-[rgba(0,0,0,0.7)] w-full h-full"} z-5`}/>
        </>
    )
}

