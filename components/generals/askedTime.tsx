"use client"

import Image from "next/image"
import { askedTimeAgo } from "../posts/postInfo"

export function AskedTime({createdAt} : {createdAt:  Date | string}){
    return (
        <div className="flex gap-1 items-center">
            <Image src="/icons/general/time.svg" alt="Time icon" width={15} height={15} />
            <p className="text-[10px]">
                    asked {askedTimeAgo(createdAt)}
            </p>
        </div>
    )
}