import type {
  StandingsResponse,
  Standings as ApiStandings,
} from "~/api/standings/types";
import type { Standings, StandingsRecord } from "~/components/types";

const normalizeStanding = (s: ApiStandings): StandingsRecord => {
  return {
    teamAbbrev: s.teamAbbrev.default,
    gamesPlayed: s.gamesPlayed,
    losses: s.losses,
    otLosses: s.otLosses,
    points: s.points,
    teamName: s.teamName.default,
    wins: s.wins,
  };
};

export const normalizeStandings = (response: StandingsResponse): Standings => {
  return {
    conference: {
      east: response.standings
        .filter((s) => s.conferenceAbbrev === "E")
        .map(normalizeStanding),
      west: response.standings
        .filter((s) => s.conferenceAbbrev === "W")
        .map(normalizeStanding),
    },
  };
};
