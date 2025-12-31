"use client"

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { verifyLogin } from "@/lib/actions/verifyLogin";
import { Dispatch } from "react";
import { DesktopNavegation } from "./desktopNavegation";
import { MobileNavegation } from "./mobileNavegation";


export const linkStyles = `cursor-pointer w-45 h-12 flex items-center justify-start px-5 gap-3 border border-transparent
    hover:border-amber-600 rounded-sm } `;

export function LeftSideBar({
    sidebar, 
    setSidebar, 
    theme, 
    logged
    } : {
    sidebar: boolean, 
    setSidebar: Dispatch<React.SetStateAction<boolean>>, 
    theme: string, 
    logged: Session | null}){

    const pathname = usePathname();
    const router = useRouter();

    const linkSelected = (currentlyPath : string) => {
        return `${(pathname === currentlyPath) 
            && "text-white bg-linear-to-r from-(--primary-color-button) to-(--secondary-color-button) font-bold"}`;
    }

    const protectedRoutes = async(e : React.MouseEvent, route: string, mobile?: boolean) => {
        e.preventDefault();

        if(!await verifyLogin()){
            toast.warning("Must be logged!");
            router.push(pathname);
            return;
        }

        if(mobile) setSidebar(false);
        router.push(route);
    }

    const loginHandler = async() => {

        if(logged){
            const loading = toast.loading("Loading...");
            await signOut();
            toast.success("Logged out successfully.", {id: loading});
        }

        else{
            router.push("/login")
        }
    }

    return (
        <>
           <DesktopNavegation 
                pathname={pathname} 
                logged={false} theme={theme} 
                linkSelected={linkSelected} 
                protectedRoutes={protectedRoutes}
                loginHandler={loginHandler} />

            <MobileNavegation 
                pathname={pathname} 
                logged={false} theme={theme} 
                linkSelected={linkSelected} 
                protectedRoutes={protectedRoutes}
                loginHandler={loginHandler} 
                sidebar={sidebar}
                setSidebar={setSidebar}/>
            
        </>
    )
}

