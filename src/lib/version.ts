export async function getLatestVersion(): Promise<string> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/Faaizhamdhy/KonMik-Release/releases/latest",
      { next: { revalidate: 3600 } } // cache 1 jam
    );
    if (!res.ok) return "1.6.2";
    const data = await res.json();
    return (data.tag_name as string).replace(/^v/, "") || "1.6.2";
  } catch {
    return "1.6.2";
  }
}
