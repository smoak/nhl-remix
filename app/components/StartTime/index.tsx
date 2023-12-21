import { Suspense, useEffect, useState } from "react";
import { useHydration } from "~/hooks/useHydration";

export type StartTimeProps = {
  readonly date: Date;
};

const useLocales = (): string[] => {
  const [locales, setLocales] = useState(["en"]);

  useEffect(() => {
    setLocales([...window.navigator.languages]);
  }, []);

  return locales;
};

const StartTimeSkeleton = () => {
  return (
    <span className="block h-5 w-16 animate-pulse rounded-full bg-gray-300" />
  );
};

export const StartTime = ({ date }: StartTimeProps) => {
  const iso = date.toISOString();
  const hydrated = useHydration();
  const locales = useLocales();

  if (!hydrated) {
    return <StartTimeSkeleton />;
  }

  return (
    <Suspense key={hydrated ? "local" : "utc"} fallback={<StartTimeSkeleton />}>
      <time dateTime={iso} title={iso}>
        {new Intl.DateTimeFormat(locales, { timeStyle: "short" }).format(date)}
      </time>
    </Suspense>
  );
};
