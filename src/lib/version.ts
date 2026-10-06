export const DOWNLOAD_URL_MAIN =
  "https://github.com/Faaizhamdhy/KonMik-Release/releases/latest/download/KonMik.apk";

export const DOWNLOAD_URL_ARM32 =
  "https://github.com/Faaizhamdhy/KonMik-Release/releases/latest/download/KonMik-armeabi-v7a.apk";

export async function getLatestVersion(): Promise<string> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/Faaizhamdhy/KonMik-Release/releases/latest",
      { next: { revalidate: 60 } } // cache 60 detik agar rilis baru cepat tampil otomatis
    );
    if (!res.ok) return "1.6.2";
    const data = await res.json();
    return (data.tag_name as string).replace(/^v/, "") || "1.6.2";
  } catch {
    return "1.6.2";
  }
}

