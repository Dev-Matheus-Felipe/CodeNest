type PostTag = {
    tags: string
}

export function GetTags({posts} : {posts: PostTag[]}){
    const allTags = posts
        .flatMap(post => post.tags.split(","));

    const tagCount: Record<string, number> = {};

    for (const tag of allTags) 
        tagCount[tag] = (tagCount[tag] || 0) + 1;
    
    const topTags = Object.entries(tagCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([tag, count]) => ({ tag, count }));

    return topTags;
}