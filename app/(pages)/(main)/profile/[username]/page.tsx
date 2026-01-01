import { ProfileComponent } from "@/components/profile/profileComponent";
import { GetUser } from "@/components/profile/functions/getUser";
import z4 from "zod/v4";
import { Metadata } from "next";
import { NotFound } from "@/components/generals/notFound";


type Props = {
  params: { username: string };
};

export async function generateMetadata( { params }: Props ): Promise<Metadata> {
  const { username } = await params;

  const user = await GetUser({ username });

  if (!user) {
    return {
      title: "User not found – Code Nest",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${user.name ?? username} – Code Nest`,
    description: `View questions, answers, and contributions from ${user.name ?? username} on Code Nest.`,
    openGraph: {
      title: `${user.name ?? username} on Code Nest`,
      description: `Explore ${user.name ?? username}'s developer profile, questions, and answers.`,
      type: "profile",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}


const usernameSchema = z4.string().min(3).max(20).regex(/^[a-z][a-z0-9]{2,19}(-[a-z0-9]+)*$/);

export default async function ProfilePage({ params }: Props) {
  const { username } = await  params;

  const result = usernameSchema.safeParse(username);

  if(!result.success)  return <NotFound data="Invalid Username." />;
  
  const user = await GetUser({username: username});
  return (
    <>
      { user ? <ProfileComponent user={user} myProfile={false} /> : <NotFound data="User not found." /> }
    </>
  )
}
