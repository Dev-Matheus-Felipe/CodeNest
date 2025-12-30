import { EditProfileButton } from "./buttons/editProfile";
import { GetLikes } from "./functions/getLikes";
import { UserType } from "./functions/getUser";
import Image from "next/image";
import { Answers } from "./generalComponents/answers";
import { GetTags } from "./functions/getTags";
import { PostAnswers } from "./generalComponents/post-answers";

export function ProfileComponent({user, myProfile} : {user: UserType, myProfile: boolean}){
    if(!user) return null;
    const topTags = GetTags({posts: user.posts});
    const userLikes = GetLikes({user: user});

    return (
        <div className="flex flex-col h-full w-full p-[2%] gap-5 profile:max-h-[calc(100vh-100px)]">
            <div className="flex w-full h-auto flex-col items-center profile:flex-row profile:gap-0 gap-5 ">
                <Image
                    src={user.image ?? "/icons/general/user.svg"} 
                    alt="Profile Picture" 
                    width={130} 
                    height={130} 
                    loading="eager"
                    className="rounded-full max-w-32.5 max-h-32.5" />

                {/* MAIN INFOS */}
                <div className="flex flex-col  w-full h-auto md:p-3 md:pl-10 pl-2 gap-2">
                    <div className="flex justify-between w-full">
                        <div className=" flex flex-col gap-1">
                            <h1 className="text-2xl">{user.name ?? "User"}</h1>
                            <p className="text-xs pl-0.5">@{user.username}</p>
                        </div>

                        { myProfile && <EditProfileButton />}
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
                            joined {user.createdResume}
                        </p>

                         
                        <p className="text-[12px] flex gap-2 items-center">
                            <Image src="/icons/general/like.svg" alt="Link icon" width={18} height={18}/> 
                            {userLikes}
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

            {/* DYNAMIC DATA */}
            <div className="flex gap-1 justify-between border-b border-gray-700 pb-2 px-1">
                <div className="flex flex-col gap-3 profile:w-40 w-auto mb-4">
                    <h1 className="text-lg">Stats</h1>

                    <div className="border border-gray-700 max-w-43 min-w-20 h-14 px-2 profile:px-0
                    flex items-center justify-center gap-5 rounded-md">
                        <div className="flex flex-col items-center text-[12px]">
                            <p>{user.posts.length}</p>
                            <p>Questions</p>
                        </div>

                        <Answers user={user} />
                    </div>
                </div>

                {   
                    topTags.length > 0 && 
                    <div className="flex flex-col gap-3">
                        <h1 className="text-lg w-40">Top Tags</h1>
                        <div className="w-40 h-18 flex flex-col gap-3 items-center justify-center rounded-md">
                            {
                                topTags.map((tagObj, index) => (
                                    <div className="flex w-full justify-between items-center" key={index}>
                                        <p className={`text-[10px] text-(--username-color) bg-(--secondary-button) py-1.5 px-3
                                        rounded-2xl cursor-pointer`}>{tagObj.tag}</p>
                                        <p className="w-[19%] text-[10px]">{tagObj.count}</p>
                                    </div> 
                                ))
                            }
                        </div>
                    </div>
                }

            </div>

            <PostAnswers user={user} />
        </div>
    )
}