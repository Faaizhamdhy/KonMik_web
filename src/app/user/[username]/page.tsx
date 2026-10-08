import { redirect } from "next/navigation";

interface UserAliasProps {
  params: Promise<{ username: string }>;
}

export default async function UserAliasPage({ params }: UserAliasProps) {
  const { username } = await params;
  redirect(`/u/${encodeURIComponent(username)}`);
}
