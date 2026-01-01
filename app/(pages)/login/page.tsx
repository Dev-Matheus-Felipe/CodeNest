"use client"

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Login() {
    const router = useRouter();

    function Login(number: number){
        const id = toast.info("Saving...");
        switch(number){
            case 1:
                signIn("github").then(e => {
                    toast.success("Logged successfully.", {id: id});
                    router.push("/");

                }).catch(e => toast.warning("Login falied!", {id: id}));
                
                break;

            case 2:
                signIn("google").then(e => {
                    toast.success("Logged successfully.", {id: id});
                    router.push("/");

                }).catch(e => toast.warning("Login falied!", {id: id}));
                
                break;

            case 3:
                signIn("discord").then(e => {
                    toast.success("Logged successfully.", {id: id});
                    router.push("/");
                    
                }).catch(e => toast.warning("Login falied!", {id: id}));
                
                break;
        }
    }


    return (
        <div className="relative w-full h-screen flex items-center justify-center text-white bg-(--login) ">
            <div className="w-70 h-80  p-5 flex flex-col gap-5 rounded-md border ">
                <h1 className="w-full border-b pb-2 mb-2 font-bold text-lg ">Log in</h1>
                <button 
                className="border rounded-sm flex gap-2 items-center py-3.5 px-4 w-full cursor-pointer hover:bg-(--login-hover)" 
                onClick={()=> Login(1)}>
                    <Image src="/icons/dark/github.svg" alt="github icon" width={20} height={20} />
                    <p className="text-sm">Continue with Github</p>
                </button>

                <button 
                className="border rounded-sm flex gap-2 items-center py-3.5 px-4 w-full cursor-pointer hover:bg-(--login-hover)" 
                onClick={()=> Login(2)}>
                    <Image src="/icons/general/google.svg" alt="github icon" width={20} height={20} />
                    <p className="text-sm">Continue with Google</p>
                </button>

                <button 
                className="border rounded-sm flex gap-2 items-center py-3.5 px-4 w-full cursor-pointer hover:bg-(--login-hover)" 
                onClick={()=> Login(3)}>
                    <Image src="/icons/general/discord.svg" alt="github icon" width={20} height={20} />
                    <p className="text-sm">Continue with Discord</p>
                </button>
            </div>
            
            <Image src={"/generals/loginBg.jpg"} alt={"login background"} fill className="w-screen h-screen z-[-1]"  />
        </div>
    );
}
