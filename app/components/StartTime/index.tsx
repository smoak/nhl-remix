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

export const StartTime = ({ date }: StartTimeProps) => {
  const iso = date.toISOString();
  const hydrated = useHydration();
  const locales = useLocales();

  return (
    <Suspense key={hydrated ? "local" : "utc"}>
      <time dateTime={iso} title={iso}>
        {new Intl.DateTimeFormat(locales, { timeStyle: "short" }).format(date)}
      </time>
    </Suspense>
  );
};
