import { UserType } from "./getUser";

export function GetLikes({user} : {user: UserType}){
    const userLikes = 
        user.posts.reduce((acc, post) => acc + post.likes, 0) + 
        user.responses.reduce((acc, response) => acc +  response.likes, 0);

    return userLikes;
}