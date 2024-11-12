import { create } from "zustand";

interface StoreState {
  isAuthenticated: boolean;
  user: any;
  setAuth: (status: boolean, userData?: any) => void;
  logout: () => void;
}

const useStore = create<StoreState>((set) => ({
  isAuthenticated: false,
  user: null,
  setAuth: (status, userData) =>
    set({ isAuthenticated: status, user: userData }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));

export default useStore;
