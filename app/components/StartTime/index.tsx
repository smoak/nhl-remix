import { useEffect, useState } from "react";

export type StartTimeProps = {
  readonly date: Date;
};

const useFormattedTime = (initialDate: Date) => {
  const [formattedTime, setFormattedTime] = useState(initialDate.toISOString());

  // See
  // https://remix.run/docs/en/main/guides/constraints#rendering-with-browser-only-apis
  useEffect(() => {
    const languages = [...window.navigator.languages];
    setFormattedTime(
      new Intl.DateTimeFormat(languages, { timeStyle: "short" }).format(
        initialDate
      )
    );
  }, [initialDate]);

  return formattedTime;
};

export const StartTime = ({ date }: StartTimeProps) => {
  const formattedTime = useFormattedTime(date);

  return <time dateTime={date.toISOString()}>{formattedTime}</time>;
};
