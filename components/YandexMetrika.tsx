"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    ym?: (
      id: number,
      action: "hit",
      url: string,
      options?: {
        title?: string;
        referer?: string;
      }
    ) => void;
  }
}

const METRIKA_ID = 110750178;

export default function YandexMetrika() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window.ym !== "function") return;

    const query = searchParams.toString();
    const url = pathname + (query ? `?${query}` : "");

    window.ym(METRIKA_ID, "hit", url, {
      title: document.title,
      referer: document.referrer,
    });
  }, [pathname, searchParams]);

  return null;
}