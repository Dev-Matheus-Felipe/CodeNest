import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export function LeftSideBar({sidebarOpened, theme, logged} : {sidebarOpened: boolean, theme: string, logged: Logged | null}){

    const pathname = usePathname();

    const navegation: Navegation[] = [
        {label: "Home", src: `/icons/${theme === "dark" ? "dark" : "light"}/house.svg`, href: "/"},
        {label: "Community", src: `/icons/${theme === "dark" ? "dark" : "light"}/people.svg`, href: "/community"},
        {label: "Collections", src: `/icons/${theme === "dark" ? "dark" : "light"}/star.svg`, href: "/collections"},
        {label: "Tags", src: `/icons/${theme === "dark" ? "dark" : "light"}/tag.svg`, href: "/tags"},
        {label: "Profile", src: `/icons/${theme === "dark" ? "dark" : "light"}/profile.svg`, href: `/profile`},
        {label: "Ask a question", src: `/icons/${theme === "dark" ? "dark" : "light"}/ask.svg`, href: "/ask_questions"},
    ];

    return (
        <>
            <aside className={`absolute md:relative md:left-0 md:h-full top-0 ${sidebarOpened ? "left-0 " : "left-[-90%]"}
                col-span-1 row-span-1 flex flex-col items-start justify-between p-4 duration-1000 md:gap-0 gap-10 
                z-10 bg-(--secondary-button) rounded-sm md:bg-transparent`}>

                <nav className=" w-full flex flex-col items-start gap-7">
                    {
                        navegation.map((n: Navegation, index:number) => (
                            <Link key={index} href={n.href}  className={`
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
                
                <button className="md:bg-(--secondary-button) bg-(--secondary-button-hover) w-43 h-10 text-[13px] rounded-sm cursor-pointer
                hover:bg-(--secondary-button-hover)" onClick={() =>{}}>
                    {logged ? "Log out" : "Log in"} 
                </button>
            </aside>

            {sidebarOpened && <div className="duration-300  bg-[rgba(0,0,0,0.9)] absolute w-full h-full"/>}
        </>
    )
}

