"use client"

import { verifyLogin } from "@/lib/actions/verifyLogin";
import Link from "next/link";
import { toast } from "sonner";


export function AskAQuestion(){

    return (
        <Link
            href="/question" 
            className={`text-white bg-linear-to-r from-(--primary-color-button) to-(--secondary-color-button)
            px-3 py-3 rounded-md text-sm`} 
            
            onClick={async(e)=>{
                if(!(await verifyLogin())){
                    e.preventDefault();
                    toast.warning("Must be logged!");
                }
            }}>
          Ask a Question
        </Link>
    )
}