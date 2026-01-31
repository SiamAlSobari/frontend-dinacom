import { Store, useStore } from "@tanstack/react-store";
import { Subscription } from "../response/billing";

export const subscriptionStore = new Store<Subscription | null>(null)

export const setSubscription = (subscription: Subscription | null) => {
  subscriptionStore.setState(subscription);
}

export const useSubscription = () => {
  return useStore(subscriptionStore);
}

export const clearSubscription = () => {
  subscriptionStore.setState(null);
}
