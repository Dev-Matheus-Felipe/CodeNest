export type SavedPostsType = {
  id: string,
  userId:  string;
  postId: string;
  createdAt: Date;

  post: {
    id: string;
    title: string;
    tags: string;
    createdAt: Date;
    likedBy: string[];
    
    author: {
        name?: string | null;
        image?: string | null;
  
    };
    responses: {
        id: string;
        content: string;
        likedBy: string[];
        createdAt: Date;
    }[];
  };
};



