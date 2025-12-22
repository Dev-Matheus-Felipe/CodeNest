import { prisma } from "@/lib/prisma";
import { ProfileComponent } from "@/components/profile/profileComponent";
import z4 from "zod/v4";
import { redirect } from "next/navigation";

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const usernameSchema = z4.string().min(3).max(20).regex(/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/);
  const { username } = await params; // for some REASON I NEED THIS EVEN THOUGH THAT SAYS IT'S USELESS

  const result = usernameSchema.safeParse(username);

  if(!result.success) return <p>User not Found</p>

  const user = await prisma.user.findUnique({
    where: { username }
  });

  return (
    <>
      { user ? <ProfileComponent user={user} myProfile={false} /> : <p>User not Found</p> }
    </>
  )
}
