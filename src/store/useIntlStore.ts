import { produce } from "immer";
import { create } from "zustand";

type IntlStoreType = {
  locale: string;
  setLocale: (locale: string) => void;
};

const getLocaleFromCookies = (): string => {
  if (typeof window === "undefined") return "en"; // Server-side fallback

  const cookies = document.cookie.split(";");
  const localeCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("locale="),
  );

  return localeCookie ? localeCookie.split("=")[1] : "en";
};

// Helper function to set locale in cookies
const setLocaleInCookies = (locale: string) => {
  if (typeof window === "undefined") return; // Skip on server-side

  // Set cookie with 1 year expiration
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  document.cookie = `locale=${locale}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
};

const useIntlStore = create<IntlStoreType>((set) => ({
  locale: getLocaleFromCookies(), // Initialize from cookies
  setLocale: (locale: string) => {
    setLocaleInCookies(locale); // Save to cookies
    set(
      produce<IntlStoreType>((state) => {
        state.locale = locale;
      }),
    );
  },
}));

export default useIntlStore;
