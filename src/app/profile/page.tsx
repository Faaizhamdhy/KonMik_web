import { redirect } from "next/navigation";

interface ProfilePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProfileQueryRedirectPage({ searchParams }: ProfilePageProps) {
  const params = await searchParams;
  const usernameParam = params.u || params.username || params.user;

  const targetUsername = typeof usernameParam === "string" ? usernameParam.trim() : "";

  if (targetUsername) {
    redirect(`/u/${encodeURIComponent(targetUsername)}`);
  }

  redirect("/");
}
