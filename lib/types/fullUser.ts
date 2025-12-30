
export type FullUserType = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  username: string | null;
  bio: string | null;
  emailVerified: Date | null;
  createdAt: Date;
  createdResume: string | null;
  portfolio: string | null;
  bannedAt: Date | null;

  posts: {
    id: string;
    title: string;
    description: string;
    code: string | null;
    language: string;
    tags: string;
    createdAt: Date;

    likedBy: string[];

    author: {
      name: string | null;
      image: string | null;
    };

    responses: {
      id: string;
      content: string;
      likedBy: string[];
      createdAt: Date;
    }[];
  }[];

  responses: {
    id: string;
    content: string;
    code: string | null;
    language: string;
    createdAt: Date;
    likedBy: string[];
    postId: string;
    authorId: string;

    post: {
      title: string;
    };

    author: {
      name: string | null;
      image: string | null;
    };
  }[];
};

export type UserPosts = {
  id: string;
  title: string;
  tags: string;
  createdAt: Date;
  likedBy: string[];


  author: {
    name: string | null;
    image: string | null;
  };

  responses: {
    id: string;
    content: string;
    likedBy: string[];
    createdAt: Date;
  }[];
};


export type UserResponses = {
  id: string;
  content: string;
  code: string | null;
  language: string;
  createdAt: Date;
  likedBy: string[];
  postId: string;
  authorId: string;

  post: {
    title: string;
  };

  author: {
    name: string | null;
    image: string | null;
  };
};