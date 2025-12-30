import { UserType } from "./getUser";

    export function GetLikes({user} : {user: UserType}){
        if(!user) return 0;
        
        const userLikes = 
            user.posts.reduce<number>((acc: number, post: {likedBy: string[]}) => acc + post.likedBy.length, 0) + 
            user.responses.reduce<number>((acc: number, response: {likedBy: string[]}) => acc +  response.likedBy.length, 0);

        return userLikes;
    }