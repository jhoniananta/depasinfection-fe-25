import { createSelectorHooks } from "auto-zustand-selectors-hook";
import { produce } from "immer";
import { create } from "zustand";

import { clearDepasAuth } from "@/lib/auth";
import { User } from "@/types/auth";

type AuthStoreType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoggingIn: boolean; // ✅ NEW
  hasChecked: boolean; // ✅ NEW
  login: (user: User) => void;
  logout: () => void;
  stopLoading: () => void;
  setLoggingIn: (v: boolean) => void; // ✅ NEW
  setHasChecked: (v: boolean) => void; // ✅ NEW
};

const useAuthStoreBase = create<AuthStoreType>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isLoggingIn: false, // ✅ NEW
  hasChecked: false, // ✅ NEW

  login: (user) => {
    const { role, account_id, phone_number, email, token, ...spreadData } =
      user;
    localStorage.setItem("depas25_data", JSON.stringify(spreadData));
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
        state.isLoggingIn = false; // ✅ reset login flag
      }),
    );
  },

  logout: () => {
    clearDepasAuth();
    set(
      produce<AuthStoreType>((state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isLoggingIn = false;
        state.hasChecked = false; // ✅ reset flag saat logout
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

  setLoggingIn: (v) => {
    set(
      produce<AuthStoreType>((state) => {
        state.isLoggingIn = v;
      }),
    );
  },

  setHasChecked: (v) => {
    set(
      produce<AuthStoreType>((state) => {
        state.hasChecked = v;
      }),
    );
  },
}));

const useAuthStore = createSelectorHooks(useAuthStoreBase);

export default useAuthStore;
