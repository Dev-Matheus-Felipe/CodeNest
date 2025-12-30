export type UniquePost = {
  id: string;
  title: string;
  description: string;
  code?: string | null;
  language: string;
  tags: string;
  createdAt: Date;
  likedBy: string[];

  author: {
    id: string;
    name?: string | null;
    username?: string | null;
    image?: string | null;
  };

  responses: {
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
  }[];
};

export type UniquePostEdit = {
  id: string;
  title: string;
  description: string;
  code?: string | null;
  language: string;
  tags: string;
  createdAt: Date;
  authorId: string;
  likedBy: string[];
}
