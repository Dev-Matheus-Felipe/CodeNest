"use server"

import { prisma } from "../prisma"
import { tags } from "../tagsData";

export async function GetEverything({search} : {search: string}){
    const users = await prisma.user.findMany({
        where: {name: {contains: search}},
        select: {name: true, username: true},
        take: 4
    });

    const filteredUsers = users.map(e => ({
        name: e.name,
        id: e.username,
        href: `/profile/${e.username}`,
        type: "USER"
    }));

    /* ------------------ */

    const posts = await prisma.post.findMany({
        where: {title: {contains: search}},
        select: {id: true, title: true},
        take: 4
    });

    const filteredPosts = posts.map(e => ({
        name: e.title,
        id: e.id,
        href: `/post/${e.id}`,
        type: "POST"
    }));

    /* ------------------ */

    const responses = await prisma.response.findMany({
        where: {content: {contains: search}},
        select: {id: true, content: true},
        take: 4
    });

    const filteredResponses = responses.map(e => ({
        name: e.content,
        id: e.id,
        href: `/response/${e.id}`,
        type: "RESPONSE"
    }));

    /* ------------------ */

    const filteredTags = tags
        .filter(e => e.name.toLowerCase()
        .includes(search.toLowerCase()))
        .map(e => ({name: e.name, id: e.name, href: `/tags?tag=${e.name}`, type: "TAG"}))
        .splice(0,4);

    const allItems = [
        ...filteredPosts,
        ...filteredResponses,
        ...filteredUsers,
        ...filteredTags,
    ].map(item => {
        const text = item.name?.toLowerCase() ?? ""
        const score = text.split(search.toLowerCase() ?? "").length - 1

        return {
        ...item,
        score,
        }
    })

    const topMatches = allItems
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 4)
        .map(({ score, ...item }) => item)


    return [[...topMatches],[...filteredPosts], [...filteredResponses], [...filteredUsers], [...filteredTags]];
}