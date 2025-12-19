import { prisma } from "@/lib/prisma"
import Image from "next/image";
import Link from "next/link";

export default async function Community(){
    const users = await prisma.user.findMany();

    console.log(users);

    return (
        <div className="w-full h-full flex flex-col gap-7 p-[2%] items-center">
            <h1 className="text-2xl w-full px-4">All Users</h1>
            <div className="w-full flex justify-between gap-2 px-3">
                <form className=" w-[75%] h-11 relative flex items-center">
                    <Image 
                        src="/icons/general/search.svg" 
                        alt="Search Icon" 
                        width={15}
                        height={15} 
                        className="absolute top-1/2 left-5 -translate-y-1/2"/>

                    <input 
                        type="text" 
                        placeholder="Search for users here..." 
                        className="w-full h-full border border-gray outline-0  border-(--secondary-button) 
                        text-sm pl-11 pr-5 rounded-md" />
                </form>

                <button className=" bg-(--secondary-button) hover:bg-(--secondary-button-hover) 
                w-30 h-11 cursor-pointer rounded-md flex justify-center gap-2 items-center">
                    <p className="text-xs">Select a filter</p>

                    <Image 
                        src="/icons/general/select.svg" 
                        alt="Search Icon" 
                        width={13}
                        height={13} 
                        className=""/>
                </button>
            </div>

            <div className="w-full max-h-full gap-5 grid pr-5 overflow-y-scroll
            grid-cols-[repeat(auto-fit,minmax(130px,150px))]">
                {
                    [0,1,2].map((e, index) => (
                        <Link href={`/profile/${users[0].username}`} key={index} className="flex flex-col items-center 
                        px-3 py-3 cursor-pointer rounded-sm text-center hover:bg-(--profile-hover) h-full">
                            <Image 
                                src={users[0].image ?? ""}
                                className="rounded-full"
                                alt="user icon" 
                                width={100} 
                                height={100}/>
                            
                            <h1 className="pt-3 pb-1 text-sm">{users[0].name?.slice(0,15)}</h1>
                            <p className="text-xs text-(--username-color)">@{users[0].username}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}