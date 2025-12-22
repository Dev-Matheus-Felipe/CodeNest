import { NavBar } from "@/components/navBar/navBar";
import RightSideBar from "@/components/rightSideBar/rightSideBar";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";

export default function MainLayout({children} : {children: React.ReactNode}){
    return (
        <SessionProvider>
            <div className="grid grid-rows-[100px_1fr] h-full
            sidebar:grid-cols-[0.8fr_3fr_1.1fr] md:max-sidebar:grid-cols-[0.8fr_3fr] md:max-md-grid-cols-1 ">
                <NavBar />

                    <main className="col-span-1 row-span-1 ">
                        <Suspense fallback={<p></p>}>
                            {children}
                        </Suspense>
                    </main>

                <RightSideBar />
            </div>
        </SessionProvider>
    )
}