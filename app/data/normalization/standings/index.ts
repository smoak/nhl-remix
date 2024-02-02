import type {
  StandingsResponse,
  Standings as ApiStandings,
} from "~/api/standings/types";
import type { Standings, StandingsRecord } from "~/components/types";

const normalizeStanding = (s: ApiStandings): StandingsRecord => {
  return {
    teamAbbrev: s.teamAbbrev.default,
    teamLogoUrl: s.teamLogo,
    gamesPlayed: s.gamesPlayed,
    losses: s.losses,
    otLosses: s.otLosses,
    points: s.points,
    teamName: s.teamName.default,
    wins: s.wins,
    conference: s.conferenceName,
    division: s.divisionName,
    regulationWins: s.regulationWins,
    pointsPercentage: s.pointPctg,
  };
};

export const normalizeStandings = (response: StandingsResponse): Standings => {
  const league = response.standings.map(normalizeStanding);
  const east = league.filter((s) => s.conference === "Eastern");
  const west = league.filter((s) => s.conference === "Western");
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
    league,
  };
};
