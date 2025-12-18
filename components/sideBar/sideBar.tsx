import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { LoginContext } from "../providers/loginProvider/loginProvider";

type Navegation = {
    label: string,
    src: string,
    href: string
}

type Logged = {
  expires: string
  user?: {
    id?: string | null 
    name?: string | null  
    email?: string | null  
    image?: string | null 
  }
}

export function SideBar({sidebarOpened, theme, logged} : {sidebarOpened: boolean, theme: string, logged: Logged | null}){

    const pathname = usePathname();

    const ctx = useContext(LoginContext);
    if(!ctx) return null;

    const {setLogin} = ctx;

    const navegation: Navegation[] = [
        {label: "Home", src: `/icons/${theme === "dark" ? "dark" : "light"}/house.svg`, href: "/"},
        {label: "Community", src: `/icons/${theme === "dark" ? "dark" : "light"}/people.svg`, href: "/community"},
        {label: "Collections", src: `/icons/${theme === "dark" ? "dark" : "light"}/star.svg`, href: "/collections"},
        {label: "Tags", src: `/icons/${theme === "dark" ? "dark" : "light"}/tag.svg`, href: "/tags"},
        {label: "Profile", src: `/icons/${theme === "dark" ? "dark" : "light"}/profile.svg`, href: "/profile"},
        {label: "Ask a question", src: `/icons/${theme === "dark" ? "dark" : "light"}/ask.svg`, href: "/ask_questions"},
    ];

    const RoutesControl = (e: React.MouseEvent<HTMLAnchorElement>, n:Navegation): void => {
        if((n.href === "/profile" || n.href === "/community") && !logged){
            e.preventDefault();
    
            if(setLogin) setLogin({state: true, pathname: n.href});
        }
    }

    const LoginHandler = () => {
        if(logged) signOut();
        else setLogin({state: true, pathname: pathname});
    }

    return (
        <aside className={`absolute md:relative md:top-0 md:left-0 md:h-auto  top-3 ${sidebarOpened ? "left-0 " : "left-[-90%]"}
        col-span-1 row-span-1 flex flex-col items-center justify-between p-4 duration-1000 h-[90%] 
        z-10 bg-(--secondary-button) rounded-sm md:bg-transparent`}>
            
            <nav className=" w-full flex flex-col items-center gap-7">
                {
                    navegation.map((n: Navegation, index:number) => (
                        <Link key={index} href={n.href} onClick={(e) => RoutesControl(e,n)} className={`
                        cursor-pointer w-45 h-12 flex items-center justify-start px-5 gap-3 border border-transparent
                      hover:border-amber-600 rounded-sm ${(pathname == n.href) && 
                        "text-white bg-linear-to-r from-(--primary-color-button) to-(--secondary-color-button) "}
                        `}>

                            <Image src={n.src} alt="Sidebar Icon"  width={18} height={18} />
                            <p className={`text-[13px] ${pathname !== n.href && "text-(--sidebar-text-color)"}`}>{n.label}</p>
                        </Link>
                    ))
                }
            </nav>
            
            <button className="md:bg-(--secondary-button) bg-(--secondary-button-hover) w-45 h-10 text-[13px] rounded-sm cursor-pointer
            hover:bg-(--secondary-button-hover)" onClick={() => LoginHandler()}>
                {logged ? "Log out" : "Log in"} 
            </button>
        </aside>
    )
}