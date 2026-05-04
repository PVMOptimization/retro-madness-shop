"use client";

import { useEffect } from "react";

export default function TabTitleEffect() {
  useEffect(() => {
    const original = document.title;
    const away = "🚨 Still there? We're waiting!";

    const handleVisibility = () => {
      document.title = document.hidden ? away : original;
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return null;
}
