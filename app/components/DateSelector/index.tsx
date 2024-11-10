import { Link } from "@remix-run/react";
import { format } from "date-fns";
import { DATE_DISPLAY_FORMAT, DATE_LINK_FORMAT } from "~/date-fns";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

type DateSelectorProps = {
  readonly day: Date;
  readonly prevDay: Date;
  readonly nextDay: Date;
};

export const DateSelector = ({ day, nextDay, prevDay }: DateSelectorProps) => {
  const prevDayLink = `/${format(prevDay, DATE_LINK_FORMAT)}`;
  const nextDayLink = `/${format(nextDay, DATE_LINK_FORMAT)}`;

  return (
    <div className="flex flex-col pb-4">
      <div className="flex items-center justify-between gap-5 pt-4 md:justify-end">
        <Link prefetch="intent" className="w-8 p-2" to={prevDayLink}>
          <ArrowLeftIcon className="text-black" title="previous day" />
        </Link>
        {format(day, DATE_DISPLAY_FORMAT)}
        <Link prefetch="intent" className="w-8 p-2" to={nextDayLink}>
          <ArrowRightIcon className="text-black" title="previous day" />
        </Link>
      </div>
    </div>
  );
};
