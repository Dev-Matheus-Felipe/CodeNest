"use client"

import { verifyLogin } from "@/lib/actions/verifyLogin";
import { toast } from "sonner";
import Link from "next/link";

export function AskAQuestion(){

    const linkHandler = async(e: React.MouseEvent): Promise<void> => {
        const logged = await verifyLogin();

        if(!logged){
            e.preventDefault();
            toast.warning("Must be logged!");
        }
    }

    return (
        <Link
            href="/question" className={`text-white bg-linear-to-r from-(--primary-color-button) to-(--secondary-color-button)
            px-2.5 py-3 rounded-md text-[13px]`} onClick={(e) => linkHandler(e)}>
                Ask a Question
        </Link>
    )
}