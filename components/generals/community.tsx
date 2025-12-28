"use client"

import { User } from "@/src/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type SearchType = {
    input: string,
    filter: null | string,
    openFilter: boolean
}

export function CommunityContainer({users} : {users: User[]}){
    const [usersState, setUseresState] = useState<User[]>(users);
    const [search, setSearch] = useState<SearchType>({input: "", filter: "Select a filter", openFilter: false});

    const filters = ["Select a filter", "Date ↑", "Date ↓"];
    useEffect(() => {
        switch(search.filter){

        case "Select a filter":
            setUseresState(users);
            break;

        case "Date ↑":
            setUseresState(
                [...users].sort((a,b) =>  b.createdAt.getTime() -  a.createdAt.getTime())
            );
            break;

        case "Date ↓":
            setUseresState(
                [...users].sort((a,b) => a.createdAt.getTime() - b.createdAt.getTime())
            );
            break;

        default: 
            setUseresState(users);
            break;
        }

    },[search.filter]);
    return (
        <div className="w-full h-full flex flex-col gap-7 p-[2%] items-center">
            <h1 className="text-2xl w-full px-4 border-b border-[#565656] pb-5 font-bold">All Users</h1>
            <div className="w-full flex justify-between items-center gap-2">
                <form className=" w-[75%] h-11 relative flex items-center"  onSubmit={(e) => e.preventDefault()}>
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
                        autoComplete="off"
                        value={search.input}
                        onChange={(e) => setSearch(prev => ({...prev, input: e.target.value}))}
                        placeholder="Search for users here..." 
                        className={`w-full h-full border border-gray outline-0 border-(--secondary-button) text-xs pl-11
                        pr-5 rounded-md`} />
                </form>

                <div className="relative">
                    <button className={`bg-(--secondary-button) hover:bg-(--secondary-button-hover) w-28 h-11 cursor-pointer 
                    rounded-md flex justify-center gap-2 items-center `} 
                    onClick={() => setSearch((prev: SearchType) => ({...prev, openFilter: !prev.openFilter}))}>

                        <p className="text-xs">
                            {search.filter}
                        </p>

                        <Image 
                            src="/icons/general/select.svg" 
                            alt="Search Icon" 
                            width={13}
                            height={13} />
                    </button>

                        {
                            search.openFilter &&
                            <div className={`absolute z-10 top-full left-full -translate-x-full      w-28
                            bg-(--codeEdit-tag) translate-y-1.5  rounded-md p-3 text-xs flex flex-col gap-5 overflow-auto`}>
                                {
                                    filters.map((e) => (
                                        <p 
                                            key={e} 
                                            className='border py-2 px-1 hover:text-orange-500 cursor-pointer rounded-sm'
                                            onClick={()=> {setSearch(prev => ({...prev, openFilter: false, filter: e}))} }>
                                            {e}
                                        </p>
                                    ))
                                }
                            </div>
                        }
                </div>
            </div>

            <div className="w-full max-h-full gap-5 grid pr-5 overflow-y-scroll grid-cols-[repeat(auto-fit,minmax(130px,150px))">
                {
                    users.filter(e => (e.name ?? "").toLowerCase().includes(search.input.toLowerCase())).map((e) => (
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