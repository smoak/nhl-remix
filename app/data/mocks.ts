import type {
  FinalGame,
  LiveGame,
  ScheduledGame,
  ScoringPlay,
  Team,
} from "~/components/types";

export const createScoringPlay = (
  overrides?: Partial<ScoringPlay>
): ScoringPlay => {
  return {
    awayScore: 2,
    goalScorer: {
      firstName: "Some",
      headshot: "url",
      id: 5,
      lastName: "Body",
      name: "Some Body",
      seasonGoals: 100,
    },
    highlightClip: 5,
    homeScore: 5,
    teamAbbrev: "ABBR",
    period: 1,
    timeInPeriod: "10:00",
    goalType: "ev",
    teamLogoUrl: "teamLogoUrl",
    ...overrides,
  };
};

export const createTeam = (overrides?: Partial<Team>): Team => {
  return {
    abbreviation: "VAN",
    logo: "https://picsum.photos/200",
    id: 23,
    name: "Canucks",
    record: "0-0",
    ...overrides,
  };
};

export const createLiveGame = (overrides?: Partial<LiveGame>): LiveGame => {
  return {
    awayTeam: createTeam(),
    homeTeam: createTeam(),
    id: 123,
    gameState: "Live",
    type: "RegularSeason",
    gameClock: {
      currentPeriod: 2,
      isIntermission: false,
      timeRemaining: "20:00",
      isRunning: true,
    },
    gameSituation: {
      awayTeam: "even",
      homeTeam: "even",
    },
    gameStats: {
      awayTeam: {
        score: 1,
        sog: 16,
      },
      homeTeam: {
        score: 0,
        sog: 13,
      },
    },
    ...overrides,
  };
};

export const createFinalGame = (overrides?: Partial<FinalGame>): FinalGame => {
  return {
    awayTeam: createTeam(),
    homeTeam: createTeam(),
    endedInPeriod: 3,
    id: 123,
    gameState: "Final",
    type: "RegularSeason",
    gameStats: {
      awayTeam: {
        score: 2,
        sog: 30,
      },
      homeTeam: {
        score: 3,
        sog: 27,
      },
    },
    ...overrides,
  };
};

export const createScheduledGame = (
  overrides?: Partial<ScheduledGame>
): ScheduledGame => {
  return {
    awayTeam: createTeam(),
    homeTeam: createTeam(),
    id: 123,
    startTime: "2022-02-04T00:00:00Z",
    gameState: "Scheduled",
    type: "RegularSeason",
    ...overrides,
  };
};
