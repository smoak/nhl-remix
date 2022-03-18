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

export type GameStatus = {
  readonly abstractGameState: string;
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
