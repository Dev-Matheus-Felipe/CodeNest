import { UserType } from "./getUser";

export function GetLikes({user} : {user: UserType}){
    const userLikes = 
        user.posts.reduce<number>((acc, post) => acc + post.likedBy.length, 0) + 
        user.responses.reduce<number>((acc, response) => acc +  response.likedBy.length, 0);

    return userLikes;
}