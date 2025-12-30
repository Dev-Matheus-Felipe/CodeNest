import { ProfileComponent } from "@/components/profile/profileComponent";
import { GetUser } from "@/components/profile/functions/getUser";
import z4 from "zod/v4";

const usernameSchema = z4.string().min(3).max(20).regex(/^[a-z][a-z0-9]{2,19}(-[a-z0-9]+)*$/);

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const { username } = await  params;

  const result = usernameSchema.safeParse(username);

  if(!result.success)  return <p className="pb-2">Invalid Username</p>;
  
  const user = await GetUser({username: username});
  return (
    <>
      { user ? <ProfileComponent user={user} myProfile={false} /> : <p>User not Found</p> }
    </>
  )
}
