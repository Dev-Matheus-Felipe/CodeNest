import { prisma } from "@/lib/prisma";
import { User } from "next-auth";
import Image from "next/image";


function askedTimeAgo(date: Date | string) {
  const now = new Date()
  const past = new Date(date)

  now.setHours(0, 0, 0, 0)
  past.setHours(0, 0, 0, 0)

  const diffDays = Math.floor(
    (now.getTime() - past.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (diffDays === 0) return "asked today"
  if (diffDays === 1) return "asked yesterday"

  if (diffDays < 30) {
    return `asked ${diffDays} days ago`
  }

  const months = Math.floor(diffDays / 30)
  if (months < 12) {
    return `asked ${months} month${months > 1 ? "s" : ""} ago`
  }

  const years = Math.floor(diffDays / 365)
  return `asked ${years} year${years > 1 ? "s" : ""} ago`
}



export async function Post({user} : {user: User}){
    if(!user) return null;

    const posts = await prisma.post.findMany({
        where: {authorId: user.id}
    })

    const datas = posts.map((e) => askedTimeAgo(e.createdAt));
    const tags = posts.map(e => e.tags.split(",")); 

    return (
        <div className="w-full flex-1 flex flex-col gap-2 p-2 h-full overflow-y-auto">
            {
                posts.length > 0 && posts.map((e, index) => (
                    <div key={e.id} className={`flex flex-col ma-auto w-[99%] gap-2 px-5 py-3 mb-5 rounded-sm cursor-pointer
                    border border-gray-500 bg-[rgba(255,255,255,0.01)]`}>
                        <div className="flex justify-between flex-row">
                            <h1 className="text-lg font-bold">{e.title}</h1>

                            <div className="flex gap-1">
                                <div className="hover:bg-(--secondary-button) rounded-full p-2 flex justify-center items-center">
                                <Image src="/icons/general/trash.svg" alt="Trash icon" width={15} height={15}/>
                                </div>

                                <div className="hover:bg-(--secondary-button) rounded-full p-2 flex justify-center items-center">
                                    <Image src="/icons/general/edit.svg" alt="Edit icon" width={15} height={15}/>
                                </div>
                            </div>
                        </div>
    
                        <div className="flex gap-2">
                            {
                                tags[index].map((e, index2) => (
                                    <p className={`text-[10px] text-(--username-color) bg-(--secondary-button) py-2 px-3 rounded-2xl 
                                    cursor-pointer`} key={index2}>{e}</p>
                                ))
                            }
                        </div>

                        <div className="pt-4 flex justify-between">
                            <div className="flex gap-2 items-center">
                                <Image src={user.image!} alt="Profile Picture" width={22} height={22} 
                                className="rounded-full"/>
                                <p className="text-xs pr-2">{user.name}</p>
                                
                                <Image src="/icons/general/time.svg" alt="Time icon" width={15} height={15}  />
                                <p className="text-xs">{datas[index]}</p>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex gap-2 items-center">
                                    <Image src="/icons/general/like.svg" alt="Like icon" width={20} height={20}  />
                                    <p className="text-xs">Likes {e.likes}</p>
                                </div>

                                <div className="flex gap-2 items-center">
                                    <Image src="/icons/general/message.svg" alt="Like icon" width={20} height={20}  />
                                    <p className="text-xs">Answers 0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}