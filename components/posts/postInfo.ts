export type PostType = {
  id: string;
  title: string;
  description: string;
  code?: string | null;
  language: string;
  tags: string;
  createdAt: Date;

  likes: number;

  author: {
    id: string;
    name?: string | null;
    username?: string | null;
    image?: string | null;
    bio?: string | null;
    portfolio?: string | null;
  };
};


export function askedTimeAgo(date: Date | string) {
  const now = new Date();
  const past = new Date(date);

  now.setHours(0, 0, 0, 0);
  past.setHours(0, 0, 0, 0);

  const diffDays = Math.floor(
    (now.getTime() - past.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";

  if (diffDays < 30) {
    return `${diffDays} days ago`;
  }

  const months = Math.floor(diffDays / 30)
  if (months < 12) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }

  const years = Math.floor(diffDays / 365)
  return `${years} year${years > 1 ? "s" : ""} ago`;
}