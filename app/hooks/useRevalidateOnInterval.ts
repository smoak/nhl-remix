import { useCallback, useEffect } from "react";

type Options = {
  readonly interval: number;
  revalidateCallback: () => void;
};

export const useRevalidateOnInterval = ({
  interval,
  revalidateCallback,
}: Options): void => {
  const revalidate = useCallback(() => {
    if (document.visibilityState === "hidden") {
      return;
    }
    revalidateCallback();
  }, [revalidateCallback]);
  useEffect(() => {
    const intervalId = setInterval(revalidate, interval);
    return () => {
      clearInterval(intervalId);
    };
  }, [interval, revalidate]);
};
