import { auth } from "@/lib/auth"
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function MyProfile(){
    const session = await auth();

    if(!session){
        redirect("/");
    }
    
    return (
        <div className="flex flex-col h-full w-full p-[2%] pt-5 gap-5 profile:max-h-[calc(100vh-100px)]">
            <div className="flex w-full h-auto flex-col items-center profile:flex-row profile:gap-0 gap-5 ">
                <Image 
                    src={session.user.image ?? ""} 
                    alt="Profile Picture" 
                    width={130} 
                    height={130} 
                    className="rounded-full max-w-32.5 max-h-32.5" />

                {/* MAIN INFOS */}
                <div className="flex flex-col  w-full h-auto md:p-3 md:pl-10 pl-2 gap-2">
                    <div className="flex justify-between w-full">
                        <div className=" flex flex-col gap-1">
                            <h1 className="text-2xl">{session.user.name ?? "User"}</h1>
                            <p className="text-sm">@{session.user.username}</p>
                        </div>

                        <button className="bg-(--secondary-button) w-30 h-10 rounded-md text-xs cursor-pointer 
                        hover:bg-(--secondary-button-hover)">
                            Edit Profile
                        </button>
                    </div>
                    
                    {/* LINKS AND DETAILS */}
                    <div className="flex text-xs items-center gap-5">
                        <a className="flex gap-2 text-blue-500 cursor-pointer text-xs" 
                        href="https://matheus-felipe-18fb4.web.app/"
                        target="_blank">
                            <Image src="/icons/general/link.svg" alt="Link icon" width={18} height={18}/> 
                            Portfolio
                        </a>
                        <p className="flex gap-2 items-center text-xs">
                            <Image src="/icons/general/schedule.svg" alt="Schedule icon" width={18} height={18}/> 
                            {session.user.createdResume}
                        </p>

                         
                        <p className="text-[12px] flex gap-2  items-center">
                            <Image src="/icons/general/like.svg" alt="Link icon" width={18} height={18}/> 
                            0
                        </p>
                    </div>      

                    {/*a man trying to get better at programming every day. */}
                    <p className="md:text-xs text-[10px] w-ful text-purple-500">
                        Just a man trying to get better at programming every day. 
                    </p>           
                </div>
            </div>

            {/* STATE */}
            <div className="flex gap-1 justify-between border-b border-gray-500 pb-7 px-1 ">
                <div className="flex flex-col gap-3 profile:w-40 w-auto">
                    <h1 className="text-lg">Stats</h1>

                    <div className="bg-(--myprofile-container) max-w-43 min-w-20 h-14 px-2 profile:px-0
                    flex items-center justify-center gap-5 rounded-md">
                        <div className="flex flex-col items-center text-[12px]">
                            <p>1</p>
                            <p>Questions</p>
                        </div>

                        <div className="flex flex-col items-center text-[12px]">
                            <p>1</p>
                            <p>Answers</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <h1 className="text-lg w-40">Top Tags</h1>

                    <div className="w-40 h-18 flex flex-col gap-3 items-center justify-center rounded-md">
                        <div className="flex w-full justify-between items-center">
                            <p className="text-[8px] text-(--username-color) bg-(--secondary-button) py-2 px-4 rounded-2xl cursor-pointer">
                                NEXT JS
                            </p>

                            <p className="w-[19%] text-[10px]">4</p>
                        </div>

                        <div className="flex w-full justify-between items-center">
                            <p className="text-[8px] text-(--username-color) bg-(--secondary-button) py-2 px-4 rounded-2xl cursor-pointer">
                                REACT JS
                            </p>

                            <p className="w-[19%] text-[10px]">2</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* POSTS / ANSWERS */}
            <div className="flex flex-col overflow-auto w-full gap-5 flex-1">
                <div className="flex justify-center gap-3 bg-(--secondary-button) w-50 h-12 items-center text-xs 
                text-(--username-color) rounded-md">
                    <p className="text-orange-500 bg-(--secondary-button-hover) px-4 py-2 rounded-md">Top Posts</p>
                    <p className="px-4 py-2 rounded-md">Answers</p>
                </div>

                <div className="w-full flex-1 ">
                    
                </div>
            </div>
        </div>
    )
}