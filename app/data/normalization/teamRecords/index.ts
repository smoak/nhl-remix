import type { StandingsResponse } from "~/api/standings/types";
import type { TeamRecords } from "~/components/types";

type NormalizeTeamRecords = (
  standingsResponse: StandingsResponse
) => TeamRecords;
export const normalizeTeamRecords: NormalizeTeamRecords = ({ standings }) =>
  standings.reduce<TeamRecords>((accum, standing) => {
    accum[standing.teamAbbrev.default] = [
      standing.wins,
      standing.losses,
      standing.otLosses,
    ].join("-");

    return accum;
  }, {});
