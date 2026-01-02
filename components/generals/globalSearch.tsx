"use client"

import { GetEverything } from "@/lib/actions/getEverything";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Data = {
    name?: string | null,
    id?: string | null,
    href: string,
    type: string
}

export function GlobalSearch({theme} : {theme: string | undefined}){
    const [data, setData] = useState<Data[][]>([]);

    const [search, setSearch] = useState<string>("");
    const [timer, setTimer] = useState<string>("");

    const [tagSelected, setTagSelected] = useState<number>(0);

    const tagTitle = (index: number) => 
        `text-[10px] text-(--username-color) bg-(--secondary-button) py-2 px-4 rounded-2xl cursor-pointer hover:text-orange-500
        ${tagSelected === index && "text-orange-500"}`;

    const tags: string[] = ["Types","Question","Answer","User","Tag"];


    useEffect(()=>{
        const timeout = setTimeout(() => {
            setTimer(search)
        }, 700)

        return () => clearTimeout(timeout);
    },[search]);

    useEffect(() => {
        if (!timer) return;
        
        async function GetInfo(){
            const bdData = await GetEverything({search : timer});
            setData(bdData);
        }

        GetInfo();
    }, [timer]);

    return (
        <div className="relative">
            <form className="bg-(--secondary-button) w-110 h-11 relative rounded-lg hidden md:block">
                <Image
                    src="/icons/general/search.svg" 
                    alt="Search Icon" 
                    width={16}
                    height={16} 
                    className="absolute top-1/2 left-4 -translate-y-1/2"/>

                <input 
                    type="text" 
                    name="search"
                    id="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search anything globally..." 
                    className="w-full h-full px-11 text-xs outline-none" />
            </form>

            {
                timer.length > 0 &&
                    <div className={`bg-(--background) h-70 w-full absolute top-[120%] z-10 rounded-md flex flex-col p-[5%] 
                    gap-5`}>
                        <div className="flex gap-5">
                            {
                                tags.map( (e: string, index: number) => (
                                    <p 
                                        className={tagTitle(index)} 
                                        key={index}
                                        onClick={() => setTagSelected(index)}>{e}</p>
                                ))
                            }
                        </div>

                        <h1 className="text-sm pt-3">Top Match</h1>
                        
                        <div className="flex flex-col gap-5 h-40 overflow-auto pb-2">
                            {
                                (data[tagSelected] && data[tagSelected].length > 0)
                                    ?
                                        data[tagSelected].map((e) => (
                                            <Link 
                                                href={e.href} 
                                                key={e.id} 
                                                className="flex gap-2 text-sm"
                                                onClick={() => {setSearch(""), setTimer("")}}>
                                                <Image src={`/icons/${theme}/tag.svg`} alt="Tag Icon"  width={18} height={18} />
                                                { 
                                                    <div className="flex flex-col gap-1">
                                                        <p className="text-xs">{e.name}</p>
                                                        <p className="text-xs">{e.type}</p>
                                                    </div>
                                                }
                                            </Link>
                                        ))
                                    : <p className="text-xs">No results found.</p>
                            }
                        </div>
                    </div>
            }
        </div>
    )
}