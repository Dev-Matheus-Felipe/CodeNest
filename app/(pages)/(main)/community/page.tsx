import { prisma } from "@/lib/prisma"
import Image from "next/image";
import Link from "next/link";

export default async function Community(){
    const users = await prisma.user.findMany();
    
    return (
        <div className="w-full h-full flex flex-col gap-7 p-[2%] items-center">
            <h1 className="text-2xl w-full px-4 border-b border-[#565656] pb-5 font-bold">All Users</h1>
            <div className="w-full flex justify-between items-center gap-2">
                <form className=" w-[75%] h-11 relative flex items-center">
                    <Image 
                        src="/icons/general/search.svg" 
                        alt="Search Icon" 
                        width={15}
                        height={15} 
                        className="absolute top-1/2 left-4 -translate-y-1/2"/>

                    <input 
                        type="text" 
                        name="search"
                        id="search"
                        placeholder="Search for users here..." 
                        className={`w-full h-full border border-gray outline-0 border-(--secondary-button) text-xs pl-11
                        pr-5 rounded-md`} />
                </form>

                <button className={`bg-(--secondary-button) hover:bg-(--secondary-button-hover) w-28 h-11 cursor-pointer 
                rounded-md flex justify-center gap-1 items-center`}>
                    <p className="text-xs">Select a filter</p>

                    <Image 
                        src="/icons/general/select.svg" 
                        alt="Search Icon" 
                        width={13}
                        height={13} />
                </button>
            </div>

            <div className="w-full max-h-full gap-5 grid pr-5 overflow-y-scroll grid-cols-[repeat(auto-fit,minmax(130px,150px))">
                {
                    users.map((e) => (
                        <Link href={`/profile/${users[0].username}`} key={e.id} className={`flex flex-col items-center w-43 py-3 
                        cursor-pointer rounded-md text-center duration-200  h-full`}>
                            <Image 
                                src={e.image ?? "/icons/general/user.svg"}
                                className="rounded-full"
                                alt="user icon" 
                                width={115} 
                                height={115}
                                loading="eager"/>
                            
                            <h1 className="pt-3 pb-1 text-md">{e.name?.slice(0,15) ?? "User"}</h1>
                            <p className="text-[11px] text-(--username-color)">@{e.username}</p>
                            
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}