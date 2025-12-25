import Image from "next/image";
import { User } from "next-auth";
import { EditProfileButton } from "./buttons/editProfile/editProfile";
import { ProfileContainer } from "./buttons/profileContainer";

export function ProfileComponent({user, myProfile} : {user: User, myProfile: boolean}){

    if(!user) return null;

    return (
        <div className="flex flex-col h-full w-full p-[2%] gap-5 profile:max-h-[calc(100vh-100px)]">
            <div className="flex w-full h-auto flex-col items-center profile:flex-row profile:gap-0 gap-5 ">
                <Image
                    src={user.image ?? ""} 
                    alt="Profile Picture" 
                    width={130} 
                    height={130} 
                    loading="eager"
                    className="rounded-full max-w-32.5 max-h-32.5 border-3" />

                {/* MAIN INFOS */}
                <div className="flex flex-col  w-full h-auto md:p-3 md:pl-10 pl-2 gap-2">
                    <div className="flex justify-between w-full">
                        <div className=" flex flex-col gap-1">
                            <h1 className="text-2xl">{user.name ?? "User"}</h1>
                            <p className="text-xs pl-0.5">@{user.username}</p>
                        </div>

                        {myProfile && <EditProfileButton />}
                    </div>
                    
                    {/* LINKS AND DETAILS */}
                    <div className="flex text-xs items-center gap-5 profile:py-0 py-3">
                        {
                            user.portfolio && 
                            <a className="flex gap-2 text-blue-500 cursor-pointer text-xs" 
                            href={user.portfolio}
                            target="_blank">
                                <Image src="/icons/general/link.svg" alt="Link icon" width={18} height={18}/> 
                                Portfolio
                            </a>
                        }

                        <p className="flex gap-2 items-center text-xs">
                            <Image src="/icons/general/schedule.svg" alt="Schedule icon" width={18} height={18}/> 
                            {user.createdResume}
                        </p>

                         
                        <p className="text-[12px] flex gap-2  items-center">
                            <Image src="/icons/general/like.svg" alt="Link icon" width={18} height={18}/> 
                            0
                        </p>
                    </div>      

                    {
                        user.bio &&
                        <p className="md:text-xs text-[11px] w-ful pb-3 profile:pb-0">
                            {user.bio}
                        </p>    
                    }       
                </div>
            </div>

            <ProfileContainer user={user} />
        </div>
    )
}