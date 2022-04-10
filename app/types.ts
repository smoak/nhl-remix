export type ScheduleDay = {
  readonly date: string;
  readonly events: unknown[];
  readonly games: ScheduleGame[];
  readonly matches: unknown[];
  readonly totalEvents: number;
  readonly totalGames: number;
  readonly totalItems: number;
  readonly totalMatches: number;
};

export type GameContent = {
  readonly link: string;
};

export type AbstractGameState = "Live" | "Final" | "Preview";

export type GameStatus = {
  readonly abstractGameState: AbstractGameState;
  readonly codedGameState: string;
  readonly detailedState: string;
  readonly startTimeTBD: boolean;
  readonly statusCode: string;
};

export type LeagueRecord = {
  readonly losses: number;
  readonly ot: number;
  readonly type: string;
  readonly wins: number;
};

export type Team = {
  readonly id: number;
  readonly link: string;
  readonly name: string;
  readonly abbreviation: string;
  readonly teamName: string;
  readonly locationName: string;
  readonly firstYearOfPlay: string;
  readonly shortName: string;
  readonly officialSiteUrl: string;
  readonly franchiseId: number;
  readonly active: boolean;
};

export type GameTeam = {
  readonly leagueRecord: LeagueRecord;
  readonly score: number;
  readonly team: Team;
};

export type GameTeams = {
  readonly home: GameTeam;
  readonly away: GameTeam;
};

export type GameVenue = {
  readonly id: number;
  readonly link: string;
  readonly name: string;
};

export type LinescoreTeam = {
  readonly powerPlay: boolean;
  readonly goals: number;
  readonly shotsOnGoal: number;
  readonly goaliePulled: boolean;
  readonly numSkaters: number;
  readonly team: {
    readonly id: number;
    readonly name: string;
    readonly link: string;
  };
};

export type LinescoreTeams = {
  readonly home: LinescoreTeam;
  readonly away: LinescoreTeam;
};

export type LinescorePowerPlayInfo = {
  readonly situationTimeRemaining: number;
  readonly situationTimeElapsed: number;
  readonly inSituation: boolean;
};

export type CurrentPeriodOrdinal = "1st" | "2nd" | "3rd" | "OT" | "SO";

export type GameLinescore = {
  readonly currentPeriod: number;
  readonly currentPeriodTimeRemaining: string;
  readonly powerPlayStrength: "Even" | "5-on-4";
  readonly hasShootout: boolean;
  readonly intermissionInfo: {
    readonly intermissionTimeRemaining: number;
    readonly intermissionTimeElapsed: number;
    readonly inIntermission: boolean;
  };
  readonly teams: LinescoreTeams;
  readonly currentPeriodOrdinal: CurrentPeriodOrdinal;
  readonly powerPlayInfo: LinescorePowerPlayInfo;
};

export type ScheduleGame = {
  readonly content: GameContent;
  readonly gameDate: string;
  readonly gamePk: number;
  readonly gameType: string;
  readonly link: string;
  readonly season: string;
  readonly status: GameStatus;
  readonly teams: GameTeams;
  readonly venue: GameVenue;
  readonly linescore: GameLinescore;
};

export type Schedule = {
  readonly copyright: string;
  readonly dates: ScheduleDay[];
  readonly totalItems: number;
  readonly totalEvents: number;
  readonly totalGames: number;
  readonly totalMatches: number;
  readonly wait: number;
};
