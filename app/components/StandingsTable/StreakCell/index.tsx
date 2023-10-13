import type { TeamRecord } from "~/api/types";
import { TableCell } from "~/components/Table";

type StreakCellProps = {
  readonly streak: TeamRecord["streak"];
};
export const StreakCell = ({ streak }: StreakCellProps) => {
  if (streak != null) {
    return <TableCell>{streak.streakCode}</TableCell>;
  }

  return <TableCell>--</TableCell>;
};
