"use client";
import { useEffect, useState } from "react";

export default function DotLoader() {
  const [dots, setDots] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, [mounted]);

  return mounted ? <span className="animate-pulse">{dots}</span> : null;
}
