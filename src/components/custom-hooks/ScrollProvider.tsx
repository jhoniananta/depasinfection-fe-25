"use client";

import { createContext, useContext, useEffect, useRef } from "react";

type ScrollRefs = {
  [key: string]: React.RefObject<HTMLElement>;
};

interface ScrollContextType {
  registerRef: (key: string, ref: React.RefObject<HTMLElement>) => void;
  scrollToSection: (refKey: string) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const refs = useRef<ScrollRefs>({});

  const registerRef = (key: string, ref: React.RefObject<HTMLElement>) => {
    refs.current[key] = ref;
  };

  const scrollToSection = (refKey: string) => {
    refs.current[refKey]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ScrollContext.Provider value={{ registerRef, scrollToSection }}>
      {children}
    </ScrollContext.Provider>
  );
}

export const useScrollRef = (refKey: string) => {
  const context = useContext(ScrollContext);
  const ref = useRef<HTMLElement>(null);

  if (!context) {
    throw new Error("useScrollRef must be used within a ScrollProvider");
  }

  const { registerRef, scrollToSection } = context;

  // Register the ref when the component mounts
  useEffect(() => {
    registerRef(refKey, ref);
  }, [refKey, registerRef]);

  return { ref, scrollToSection };
};
