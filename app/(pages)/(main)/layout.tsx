import { NavBar } from "@/components/navBar/navBar";
import { SessionProvider } from "next-auth/react";

export default function MainLayout({children} : {children: React.ReactNode}){
    return (
        <SessionProvider>
            <main className="grid grid-cols-[1fr_4fr_1fr] grid-rows-[1fr_5fr]">
                <NavBar />

                <main>
                {children}
                </main>

            </main>
        </SessionProvider>
    )
}