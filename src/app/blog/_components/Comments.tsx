"use client";

import { useEffect, useRef } from "react";

export default function Comments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";

    script.setAttribute("data-repo", "hanpengbutt/portfolio");
    script.setAttribute("data-repo-id", "R_kgDOSShBNQ");
    script.setAttribute("data-category", "Comment");
    script.setAttribute("data-category-id", "DIC_kwDOSShBNc4C8bBP");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "ko");

    ref.current.appendChild(script);
  }, []);

  return <section ref={ref} className="mt-20 w-full" id="comments" />;
}
