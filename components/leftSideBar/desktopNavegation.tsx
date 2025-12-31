import Link from "next/link"
import { linkStyles } from "./leftSideBar"
import Image from "next/image"

export function DesktopNavegation({
    pathname,
    logged,
    theme,
    linkSelected,
    protectedRoutes,
    loginHandler,
    }: {
    pathname: string, 
    logged: boolean,
    theme: string,
    linkSelected: (currentlyPath: string) => void | string,
    protectedRoutes: (e: React.MouseEvent, route: string) => Promise<void>,
    loginHandler: () => Promise<void>
    }){

    return (
        <aside className={` h-full col-span-1 row-span-1 md:flex hidden flex-col items-start justify-between p-4 gap-0 
            z-10 rounded-sm bg-transparent`}>

            <nav className="w-full flex flex-col items-start gap-7">
                
                <Link href="/" className={`${linkStyles} ${linkSelected("/")}`}>
                    <Image src={`/icons/${theme}/house.svg`} alt="Home Icon"  width={18} height={18} />
                    <p className={`text-[13px] ${pathname !== "/" && "text-(--sidebar-text-color)"}`}>Home</p>
                </Link>

                <Link href="/community" className={`${linkStyles} ${linkSelected("/community")}`}>
                    <Image src={`/icons/${theme}/people.svg`} alt="People Icon"  width={18} height={18} />
                    <p className={`text-[13px] ${pathname !== "/community" && "text-(--sidebar-text-color)"}`}>Community</p>
                </Link>

                <Link href="/collections" className={`${linkStyles} ${linkSelected("/collections")}`} 
                onClick={(e) => protectedRoutes(e,"/collections")}>
                    <Image src={`/icons/${theme}/star.svg`} alt="Star Icon"  width={18} height={18} />
                    <p className={`text-[13px] ${pathname !== "/collections" && "text-(--sidebar-text-color)"}`}>Collections</p>
                </Link>

                <Link href="/tags" className={`${linkStyles} ${linkSelected("/tags")}`}>
                    <Image src={`/icons/${theme}/tag.svg`} alt="Tag Icon"  width={18} height={18} />
                    <p className={`text-[13px] ${pathname !== "/tags" && "text-(--sidebar-text-color)"}`}>Tags</p>
                </Link>

                
                <Link href="/profile" className={`${linkStyles} ${linkSelected("/profile")}`} 
                onClick={(e) => protectedRoutes(e,"/profile")}>
                    <Image src={`/icons/${theme}/profile.svg`} alt="Profile Icon"  width={18} height={18} />
                    <p className={`text-[13px] ${pathname !== "/tags" && "text-(--sidebar-text-color)"}`}>Profile</p>
                </Link>

                <Link href="/question" className={`${linkStyles} ${linkSelected("/question")}`}
                onClick={(e) => protectedRoutes(e,"/question")}>
                    <Image src={`/icons/${theme}/ask.svg`} alt="Question Icon"  width={18} height={18} />
                    <p className={`text-[13px] ${pathname !== "/question" && "text-(--sidebar-text-color)"}`}>Ask a question</p>
                </Link>

        
            </nav>
            
            <button className="md:bg-(--secondary-button) bg-(--secondary-button-hover) text-[13px] rounded-sm w-43 h-10
                cursor-pointer hover:bg-(--secondary-button-hover)" 
                onClick={() =>{loginHandler()}}>
                {logged ? "Log out" : "Log in"} 
            </button>
        </aside>
    )
}