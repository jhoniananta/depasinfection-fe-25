import { createSelectorHooks } from "auto-zustand-selectors-hook";
import { produce } from "immer";
import { create } from "zustand";

import { clearDepasAuth } from "@/lib/auth";
import { User } from "@/types/auth";

type AuthStoreType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  stopLoading: () => void;
};

const useAuthStoreBase = create<AuthStoreType>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: (user) => {
    localStorage.setItem("depas25_token", user.token);

    // Ambil expiry dari JWT (manual decode)
    try {
      const payload = JSON.parse(atob(user.token.split(".")[1]));
      const expMs = payload.exp * 1000;
      localStorage.setItem(
        "depas25_token_expiry",
        new Date(expMs).toISOString(),
      );
    } catch {
      localStorage.removeItem("depas25_token_expiry");
    }

    set(
      produce<AuthStoreType>((state) => {
        state.isAuthenticated = true;
        state.user = user;
      }),
    );
  },

  logout: () => {
    clearDepasAuth();
    set(
      produce<AuthStoreType>((state) => {
        state.isAuthenticated = false;
        state.user = null;
      }),
    );
  },
  stopLoading: () => {
    set(
      produce<AuthStoreType>((state) => {
        state.isLoading = false;
      }),
    );
  },
}));

const useAuthStore = createSelectorHooks(useAuthStoreBase);

export default useAuthStore;
