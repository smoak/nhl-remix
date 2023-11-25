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
    conference: s.conferenceName,
    division: s.divisionName,
  };
};

export const normalizeStandings = (response: StandingsResponse): Standings => {
  const east = response.standings
    .filter((s) => s.conferenceAbbrev === "E")
    .map(normalizeStanding);
  const west = response.standings
    .filter((s) => s.conferenceAbbrev === "W")
    .map(normalizeStanding);
  const pacific = west.filter((s) => s.division === "Pacific");
  const atlantic = east.filter((s) => s.division === "Atlantic");
  const central = west.filter((s) => s.division === "Central");
  const metropolitan = east.filter((s) => s.division === "Metropolitan");

  return {
    conference: {
      east,
      west,
    },
    division: {
      atlantic,
      central,
      metropolitan,
      pacific,
    },
  };
};
