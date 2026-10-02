"use client";

import { useEffect } from "react";

export default function DownloadTracker() {
  useEffect(() => {
    const handleDownloadClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (target && target.href && target.href.includes("KonMik.apk")) {
        try {
          if (navigator.sendBeacon) {
            navigator.sendBeacon("https://api.konkon.id/api/track_download");
          } else {
            fetch("https://api.konkon.id/api/track_download", {
              method: "POST",
              mode: "no-cors",
              keepalive: true,
            }).catch(() => {});
          }
        } catch {
          // silent fail
        }
      }
    };

    document.addEventListener("click", handleDownloadClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleDownloadClick, { capture: true });
    };
  }, []);

  return null;
}
