import { useEffect } from "react";

export const useRevalidateOnVisible = (callback: () => void): void => {
  const onVisibilityChanged = () => {
    if (document.visibilityState === "visible") {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", onVisibilityChanged, false);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChanged);
    };
  }, []);
};
