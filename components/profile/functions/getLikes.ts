import { FullUserType } from "@/lib/types/fullUser";

export function GetLikes({user} : {user: FullUserType}){
    if(!user) return 0;
    
    const userLikes =
        (user.posts as { likedBy: string[] }[]).reduce(
            (acc: number, post: {likedBy: string[]}) => acc + post.likedBy.length,
            0
        ) +
        (user.responses as { likedBy: string[] }[]).reduce(
            (acc: number, response: {likedBy: string[]}) => acc + response.likedBy.length,
            0
        );


    return userLikes;
}