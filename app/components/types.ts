import { Penalty as ApiPenalty } from "~/api/gamecenter/types";
import { ClinchIndicator } from "~/api/standings/types";

export type ScoringPlayAssister = {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly seasonAssists: number;
};

export type GoalType = "sh" | "pp" | "ev" | "en";

export type ScoringPlay = {
  readonly period: number;
  readonly timeInPeriod: string;
  readonly goalScorer: {
    readonly id: number;
    readonly name: string;
    readonly seasonGoals?: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly headshot: string;
  };
  readonly teamAbbrev: string;
  readonly teamLogoUrl: string;
  readonly highlightClip?: number;
  readonly awayScore: number;
  readonly homeScore: number;
  readonly goalType: GoalType;
  readonly leadingTeamAbbrev?: string;
  readonly primaryAssist?: ScoringPlayAssister;
  readonly secondaryAssist?: ScoringPlayAssister;
};

export type GameType = "RegularSeason" | "PreSeason" | "Playoff";
export type GameState =
  | "Live"
  | "Scheduled"
  | "Final"
  | "Postponed"
  | "Cancelled";

type BaseGame = {
  readonly id: number;
  readonly type: GameType;
  readonly gameState: GameState;
  readonly homeTeam: Team;
  readonly awayTeam: Team;
};

export type GameClock = {
  readonly currentPeriod: number;
  readonly timeRemaining: string;
  readonly isIntermission: boolean;
  readonly isRunning: boolean;
};

export type TeamStats = {
  readonly score: number;
  readonly sog: number;
};

export type GameStats = {
  readonly homeTeam: TeamStats;
  readonly awayTeam: TeamStats;
};

type TeamSituation = "even" | "sh" | "pp" | "en";

export type GameSituation = {
  readonly homeTeam: TeamSituation;
  readonly awayTeam: TeamSituation;
};

export type LiveGame = BaseGame & {
  readonly gameState: "Live";
  readonly gameClock: GameClock;
  readonly gameStats: GameStats;
  readonly gameSituation: GameSituation;
};

export type ScheduledGame = BaseGame & {
  readonly gameState: "Scheduled" | "Cancelled" | "Postponed";
  readonly startTime: string;
};

export type FinalGame = BaseGame & {
  readonly gameState: "Final";
  readonly gameStats: GameStats;
  readonly endedInPeriod: number;
};

export type Game = LiveGame | ScheduledGame | FinalGame;

export type Team = {
  readonly abbreviation: string;
  readonly id: number;
  readonly name: string;
  readonly record: string;
  readonly logo: string;
};

export type TeamRecords = Record<string, string>;

export type GameList = {
  readonly games: Game[];
};

export const isLiveGame = (g: Game): g is LiveGame => {
  return g.gameState === "Live";
};

export const isFinalGame = (g: Game): g is FinalGame => {
  return g.gameState === "Final";
};

export const isScheduledGame = (g: Game): g is ScheduledGame => {
  return (
    g.gameState === "Scheduled" ||
    g.gameState === "Cancelled" ||
    g.gameState === "Postponed"
  );
};

export type OvertimeScoringPlay = {
  readonly otPeriod: number;
  readonly scoringPlay: ScoringPlay;
};

export type ScoringPlays = {
  readonly firstPeriod: ScoringPlay[];
  readonly secondPeriod: ScoringPlay[];
  readonly thirdPeriod: ScoringPlay[];
  readonly overtime?: OvertimeScoringPlay;
  readonly shootout?: ScoringPlay;
};

export type Penalty = ApiPenalty & {
  readonly teamLogoUrl: string;
  readonly teamName: string;
};

export type PeriodSummary = {
  readonly homeScore: number;
  readonly awayScore: number;
  readonly periodNumber: number;
  readonly periodType: "REG" | "OT" | "SO";
  readonly penalties: Penalty[];
};

export type GameRecapInfo = {
  readonly condensedGame: number;
  readonly threeMinRecap: number;
};

export type GameDetails = {
  readonly game: Game;
  readonly scoringPlays?: ScoringPlays;
  readonly periodSummaries: PeriodSummary[];
  readonly gameRecap?: GameRecapInfo;
};

export type TeamAbbreviation =
  | "ANA"
  | "ARI"
  | "BOS"
  | "BUF"
  | "CAR"
  | "CBJ"
  | "CGY"
  | "CHI"
  | "COL"
  | "DAL"
  | "DET"
  | "EDM"
  | "FLA"
  | "LAK"
  | "MIN"
  | "MTL"
  | "NJD"
  | "NSH"
  | "NYI"
  | "NYR"
  | "OTT"
  | "PHI"
  | "PIT"
  | "SEA"
  | "SJS"
  | "STL"
  | "TBL"
  | "TOR"
  | "VAN"
  | "VGK"
  | "WPG"
  | "WSH";

export type StandingsRecord = {
  readonly clinchIndicator?: ClinchIndicator;
  readonly teamAbbrev: string;
  readonly teamName: string;
  readonly teamLogoUrl: string;
  readonly gamesPlayed: number;
  readonly wins: number;
  readonly regulationWins: number;
  readonly losses: number;
  readonly otLosses: number;
  readonly points: number;
  readonly pointsPercentage: number;
  readonly division: "Pacific" | "Atlantic" | "Metropolitan" | "Central";
  readonly conference: "Western" | "Eastern";
};

export type Standings = {
  readonly conference: ConferenceStandings;
  readonly division: DivisionStandings;
  readonly league: StandingsRecord[];
};

export type WildCardStandings = {
  readonly east: {
    readonly atlantic: StandingsRecord[];
    readonly metropolitan: StandingsRecord[];
    readonly wildCard: StandingsRecord[];
  };
  readonly west: {
    readonly central: StandingsRecord[];
    readonly pacific: StandingsRecord[];
    readonly wildCard: StandingsRecord[];
  };
};

export type DivisionStandings = {
  readonly metropolitan: StandingsRecord[];
  readonly atlantic: StandingsRecord[];
  readonly central: StandingsRecord[];
  readonly pacific: StandingsRecord[];
};

export type ConferenceStandings = {
  readonly east: StandingsRecord[];
  readonly west: StandingsRecord[];
};

export type PlayoffTeam = {
  readonly id: number;
  readonly name: string;
  readonly abbrev: string;
  readonly logo: string;
  readonly seriesWins: number;
};

export type PlayoffMatchup = {
  readonly id: string;
  readonly highSeed: PlayoffTeam;
  readonly lowSeed: PlayoffTeam;
  readonly winner?: PlayoffTeam;
  readonly winsRequired: number;
};

export type PlayoffRound = {
  readonly round: number;
  readonly hasStarted: boolean;
  readonly matchups: PlayoffMatchup[];
};

export type PlayoffBracket = {
  readonly rounds: PlayoffRound[];
};
