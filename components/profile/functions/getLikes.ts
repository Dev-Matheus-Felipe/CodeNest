import { UserType } from "./getUser";

export function GetLikes({user} : {user: UserType}){
    const userLikes = 
        user.posts.reduce<number>((acc: number, post) => acc + post.likedBy.length, 0) + 
        user.responses.reduce<number>((acc: number, response) => acc +  response.likedBy.length, 0);

    return userLikes;
}