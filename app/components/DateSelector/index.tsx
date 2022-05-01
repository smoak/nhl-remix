import { format } from "date-fns";
import { Link } from "remix";
import { DATE_DISPLAY_FORMAT, DATE_LINK_FORMAT } from "~/date-fns";
import { ArrowIcon } from "../ArrowIcon";

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
      <div className="flex items-center justify-between gap-5 pt-4 sm:justify-start">
        <Link prefetch="intent" className="p-2" to={prevDayLink}>
          <ArrowIcon title="previous day" />
        </Link>
        {format(day, DATE_DISPLAY_FORMAT)}
        <Link prefetch="intent" className="p-2" to={nextDayLink}>
          <ArrowIcon className="rotate-180" title="next day" />
        </Link>
      </div>
    </div>
  );
};
