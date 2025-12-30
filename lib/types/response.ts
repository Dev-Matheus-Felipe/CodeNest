export type ResponseType = {
  id: string;
  content: string;
  code: string | null;
  language: string;
  createdAt: Date;
  likedBy: string[];
  postId: string;
  authorId: string;
};

export type ResponseGeneralType = {
    id: string;
    content: string;
    code?: string | null;
    language: string;
    createdAt: Date;
    likedBy: string[];
    postId: string;
    authorId: string;
    
    author: {
      id: string;
      name?: string | null;
      username?: string | null;
      image?: string | null;
    };
}
