"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "zh";
type LangCtx = { lang: Lang; setLang: (l: Lang) => void };

const LangContext = createContext<LangCtx>({ lang: "en", setLang: () => {} });
export function useLang() { return useContext(LangContext); }

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "zh") setLangState("zh");
    setMounted(true);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  if (!mounted) return <>{children}</>;
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}
