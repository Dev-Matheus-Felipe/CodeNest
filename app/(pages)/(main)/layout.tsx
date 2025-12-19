import { NavBar } from "@/components/navBar/navBar";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";

export default function MainLayout({children} : {children: React.ReactNode}){
    return (
        <SessionProvider>
            <main className="grid grid-cols-[0.8fr_3fr_1.1fr] grid-rows-[20%_80%]">
                <NavBar />

                <main className="col-start-2 col-end-2 row-span-1">
                <Suspense fallback={<p>Loading...</p>}>
                    {children}
                </Suspense>
                </main>

            </main>
        </SessionProvider>
    )
}