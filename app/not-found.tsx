"use  client"

import Image from "next/image";
import Link from "next/link";

export default function PageNotFound(){
    return(
        <div className="w-full h-full flex flex-col items-center justify-center realtive">
            <Image src="/generals/notFound.png" alt={"Not Found Icon"} width={400} height={300} loading="eager"/> 
            <h1 className="absolute top-[55%]">Page Not found...</h1>
            <p className="absolute top-[60%]">
                Please go back to 
                <Link href="/" className="bg-[#ff5e00] px-2 py-1 rounded-md ml-3 text-white">Home</Link>
            </p>
        </div>
    )
}