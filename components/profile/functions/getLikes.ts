import { UserType } from "./getUser";

    export function GetLikes({user} : {user: UserType}){
        if(!user) return 0;
        
        const userLikes =
            (user.posts as { likedBy: string[] }[]).reduce(
                (acc, post) => acc + post.likedBy.length,
                0
            ) +
            (user.responses as { likedBy: string[] }[]).reduce(
                (acc, response) => acc + response.likedBy.length,
                0
            );


        return userLikes;
    }