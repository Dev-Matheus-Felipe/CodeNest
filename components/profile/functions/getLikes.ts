import { UserType } from "./getUser";

    export function GetLikes({user} : {user: UserType}){
        if(!user) return 0;
        
        const userLikes = 
            user.posts.reduce((acc, post) => acc + post.likedBy.length, 0) + 
            user.responses.reduce((acc, response) => acc +  response.likedBy.length, 0);

        return userLikes;
    }