import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export const useIsMounted = () => {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  return [isMounted] as const;
};
