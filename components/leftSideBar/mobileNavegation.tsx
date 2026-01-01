import Link from "next/link"
import { linkStyles } from "./leftSideBar"
import Image from "next/image"
import { Dispatch } from "react"
import { Session } from "next-auth";

export function MobileNavegation({
    pathname,
    logged,
    theme,
    linkSelected,
    protectedRoutes,
    loginHandler,
    sidebar,
    setSidebar
    }: {
    pathname: string, 
    logged: Session | null,
    theme: string,
    linkSelected: (currentlyPath: string) => void | string,
    protectedRoutes: (e: React.MouseEvent, route: string, mobile?: boolean) => Promise<void>,
    loginHandler: () => Promise<void>,
    sidebar: boolean,
    setSidebar: Dispatch<React.SetStateAction<boolean>>
    }){

    return (
        <>
            <aside className={`h-auto col-span-1 row-span-1 md:hidden absolute top-0 left-0 flex flex-col items-start  duration-300
            justify-between p-4  gap-10 z-11 rounded-sm  bg-(--secondary-button) ${sidebar ? "left-0" : " left-[-90%]"}`}>
                <nav className="w-full flex flex-col items-start gap-7">
                    
                    <Link href="/" className={`${linkStyles} ${linkSelected("/")}`}
                    onClick={()=> setSidebar(false)}>
                        <Image src={`/icons/${theme}/house.svg`} alt="Home Icon"  width={18} height={18} />
                        <p className={`text-[13px] ${pathname !== "/" && "text-(--sidebar-text-color)"}`}>Home</p>
                    </Link>

                    <Link href="/community" className={`${linkStyles} ${linkSelected("/community")}`}
                    onClick={()=> setSidebar(false)}>
                        <Image src={`/icons/${theme}/people.svg`} alt="People Icon"  width={18} height={18} />
                        <p className={`text-[13px] ${pathname !== "/community" && "text-(--sidebar-text-color)"}`}>Community</p>
                    </Link>

                    <Link href="/collections" className={`${linkStyles} ${linkSelected("/collections")}`} 
                    onClick={(e) => protectedRoutes(e,"/collections",true)}>
                        <Image src={`/icons/${theme}/star.svg`} alt="Star Icon"  width={18} height={18} />
                        <p className={`text-[13px] ${pathname !== "/collections" && "text-(--sidebar-text-color)"}`}>Collections</p>
                    </Link>

                    <Link href="/tags" className={`${linkStyles} ${linkSelected("/tags")}`}
                    onClick={()=> setSidebar(false)}>
                        <Image src={`/icons/${theme}/tag.svg`} alt="Tag Icon"  width={18} height={18} />
                        <p className={`text-[13px] ${pathname !== "/tags" && "text-(--sidebar-text-color)"}`}>Tags</p>
                    </Link>

                    
                    <Link href="/profile" className={`${linkStyles} ${linkSelected("/profile")}`} 
                    onClick={(e) => protectedRoutes(e,"/profile",true)}>
                        <Image src={`/icons/${theme}/profile.svg`} alt="Profile Icon"  width={18} height={18} />
                        <p className={`text-[13px] ${pathname !== "/tags" && "text-(--sidebar-text-color)"}`}>Profile</p>
                    </Link>

                    <Link href="/question" className={`${linkStyles} ${linkSelected("/question")}`}
                    onClick={(e) => {protectedRoutes(e,"/question",true)}}>
                        <Image src={`/icons/${theme}/ask.svg`} alt="Question Icon"  width={18} height={18} />
                        <p className={`text-[13px] ${pathname !== "/question" && "text-(--sidebar-text-color)"}`}>Ask a question</p>
                    </Link>

            
                </nav>
                
                <button className="bg-(--secondary-button-hover) text-[13px] rounded-sm w-43 h-10
                    cursor-pointer hover:bg-(--secondary-button-hover)" 
                    onClick={() =>{loginHandler()}}>
                    {logged ? "Log out" : "Log in"} 
                </button>
            </aside> 
            
            <div className={`md:hidden block duration-1000 absolute  ${sidebar && "bg-[rgba(0,0,0,0.7)] w-full h-full"} z-5`}/>
        </>
    )
}