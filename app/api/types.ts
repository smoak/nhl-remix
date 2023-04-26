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

export type DetailedState =
  | "Scheduled"
  | "Postponed"
  | "Pre-Game"
  | "In Progress - Critical"
  | "In Progress"
  | "Final";

export type GameStatus = {
  readonly abstractGameState: AbstractGameState;
  readonly codedGameState: string;
  readonly detailedState: DetailedState;
  readonly startTimeTBD: boolean;
  readonly statusCode: string;
};

type LiveGameStatus = GameStatus & {
  readonly abstractGameState: "Live";
  readonly detailedState: "In Progress" | "In Progress - Critical";
};

export type LeagueRecord = {
  readonly losses: number;
  readonly ot?: number;
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

type LinescorePeriod = {
  readonly num: number;
  readonly ordinalNum: CurrentPeriodOrdinal;
  readonly periodType: string;
  readonly away: {
    readonly goals: number;
    readonly shotsOnGoal: number;
  };
  readonly home: {
    readonly goals: number;
    readonly shotsOnGoal: number;
  };
};

type Linescore = {
  readonly currentPeriod: number;
  readonly powerPlayStrength: "Even" | "5-on-4";
  readonly hasShootout: boolean;
  readonly teams: LinescoreTeams;
  readonly periods: LinescorePeriod[];
};

type LiveLinescore = Linescore & {
  readonly currentPeriodTimeRemaining: string;
  readonly currentPeriodOrdinal: CurrentPeriodOrdinal;
  readonly powerPlayInfo: LinescorePowerPlayInfo;
};

export type GameType = "R" | "P" | "PR";

export type SeriesRecord = {
  readonly wins: number;
  readonly losses: number;
};

export type MatchupTeam = {
  readonly team: {
    readonly id: number;
  };
  readonly seed: {
    readonly type: string;
  };
  readonly seriesRecord: SeriesRecord;
};

export type Series = {
  readonly seriesNumber: number;
  readonly seriesCode: string;
  readonly round: {
    readonly number: number;
  };
  readonly matchupTeams: MatchupTeam[];
};

export type SeriesSummary = {
  readonly gamePk: string;
  readonly gameNumber: number;
  readonly gameLabel: string;
  readonly necessary: boolean;
  readonly gameCode: number;
  readonly gameTime: string;
  readonly seriesStatus: string;
  readonly seriesStatusShort: string;
  readonly series: Series;
};

type Coordinates = {
  readonly x: number;
  readonly y: number;
};

type ScoringPlayerScorer = {
  readonly playerType: "Scorer";
  readonly player: {
    readonly id: number;
    readonly fullName: string;
    readonly link: string;
  };
  readonly seasonTotal: number;
};

type ScoringPlayerAssist = {
  readonly playerType: "Assist";
  readonly player: {
    readonly id: number;
    readonly fullName: string;
    readonly link: string;
  };
  readonly seasonTotal: number;
};

type ScoringPlayerGoalie = {
  readonly playerType: "Goalie";
  readonly player: {
    readonly id: number;
    readonly fullName: string;
    readonly link: string;
  };
};

type ScoringPlay = {
  readonly players:
    | [ScoringPlayerScorer]
    | [ScoringPlayerScorer, ScoringPlayerGoalie]
    | [ScoringPlayerScorer, ScoringPlayerAssist, ScoringPlayerGoalie]
    | [
        ScoringPlayerScorer,
        ScoringPlayerAssist,
        ScoringPlayerAssist,
        ScoringPlayerGoalie
      ];
  readonly result: {
    readonly event: string;
    readonly eventCode: string;
    readonly eventTypeId: string;
    readonly description: string;
    readonly secondaryType: string;
    readonly strength: {
      readonly code: "EVEN" | "PPG" | "SHG";
      readonly name: string;
    };
    readonly gameWinningGoal: boolean;
    readonly emptyNet: boolean;
  };
  readonly about: {
    readonly period: number;
    readonly ordinalNum: string;
    readonly periodTime: string;
    readonly periodTimeRemaining: string;
    readonly goals: {
      readonly away: number;
      readonly home: number;
    };
  };
  readonly coordinates: Coordinates;
  readonly team: {
    readonly id: number;
    readonly name: string;
    readonly link: string;
  };
};

type BaseGame = {
  readonly content: GameContent;
  readonly gameDate: string;
  readonly gamePk: number;
  readonly gameType: GameType;
  readonly link: string;
  readonly season: string;
  readonly status: GameStatus;
  readonly teams: GameTeams;
  readonly venue: GameVenue;
  readonly scoringPlays: ScoringPlay[];
  readonly seriesSummary?: SeriesSummary;
};

type PostponedGame = BaseGame & {
  readonly linescore: Linescore;
};

type ScheduledGame = BaseGame & {
  readonly linescore: Linescore;
};

type LiveGame = BaseGame & {
  readonly linescore: LiveLinescore;
  readonly status: LiveGameStatus;
};

type FinalGame = BaseGame & {
  readonly linescore: Linescore;
};

export type ScheduleGame = PostponedGame | ScheduledGame | LiveGame | FinalGame;

export type Schedule = {
  readonly copyright: string;
  readonly dates: ScheduleDay[];
  readonly totalItems: number;
  readonly totalEvents: number;
  readonly totalGames: number;
  readonly totalMatches: number;
  readonly wait: number;
};

export type OverallRecord = {
  readonly wins: number;
  readonly losses: number;
  readonly ot: number;
  readonly type: "home" | "away" | "shootOuts" | "lastTen";
};

export type TeamRecord = {
  readonly leagueRecord: LeagueRecord;
  readonly team: Team;
  readonly regulationWins: number;
  readonly goalsAgainst: number;
  readonly goalsScored: number;
  readonly points: number;
  readonly divisionRank: string;
  readonly divisionL10Rank: string;
  readonly divisionHomeRank: string;
  readonly conferenceRank: string;
  readonly conferenceL10Rank: string;
  readonly conferenceRoadRank: string;
  readonly conferenceHomeRank: string;
  readonly wildCardRank: string;
  readonly row: number;
  readonly gamesPlayed: number;
  readonly streak: {
    readonly streakType: "wins" | "losses" | "ot";
    readonly streakNumber: number;
    readonly streakCode: string;
  };
  readonly clinchIndicator?: string;
  readonly records: {
    readonly overallRecords: OverallRecord[];
  };
};

export type Conference = {
  readonly id: number;
  readonly name: string;
  readonly link: string;
  readonly abbreviation: string;
  readonly shortname: string;
  readonly active: true;
};

export type StandingsRecord = {
  readonly teamRecords: TeamRecord[];
  readonly conference: Conference;
};

export type Standings = {
  readonly records: StandingsRecord[];
};

export const isLiveGame = (game: ScheduleGame): game is LiveGame => {
  return game.status.abstractGameState === "Live";
};
