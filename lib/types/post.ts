export type PostType = {
    createdAt: Date;
    id: string,
    title: string,
    tags: string,
    likedBy: string[],

    author: {
        image?: string | null,
        name?: string | null,
    },

    responses: {
        id: string
    }[]
}