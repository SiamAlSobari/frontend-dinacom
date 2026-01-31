import { Store, useStore } from "@tanstack/react-store";

export const userStore = new Store<string | null>(null);

export const setUser = (userId: string | null) => {
  userStore.setState(userId);
}
export const useUser = () => {
  return useStore(userStore);
}

export const clearUser = () => {
  userStore.setState(null);
}