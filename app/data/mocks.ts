import type {
  FinalGame,
  LiveGame,
  PostponedGame,
  ScheduledGame,
  ScoringPlay,
  Team,
} from "~/components/types";

export const createScoringPlay = (
  overrides?: Partial<ScoringPlay>
): ScoringPlay => {
  return {
    description: "Goal scored",
    goals: {
      away: 1,
      home: 0,
    },
    goalScorer: {
      id: 1,
      name: "Goal scorer",
      seasonGoals: 1,
    },
    id: "1",
    period: 1,
    periodOrdinalNum: "1st",
    periodTime: "10:00",
    scoringTeamId: 55,
    strength: "EVEN",
    ...overrides,
  };
};

export const createTeam = (overrides?: Partial<Team>): Team => {
  return {
    abbreviation: "VAN",
    id: 23,
    name: "Canucks",
    record: "0-0",
    score: 0,
    ...overrides,
  };
};

export const createLiveGame = (overrides?: Partial<LiveGame>): LiveGame => {
  return {
    awayTeam: createTeam(),
    currentPeriod: 1,
    currentPeriodOrdinal: "1ST",
    currentPeriodTimeRemaining: "20:00",
    homeTeam: createTeam(),
    id: 123,
    isCurrentlyInProgress: true,
    linescore: {
      away: {
        isGoaliePulled: false,
        isOnPowerPlay: false,
        shotsOnGoal: 0,
        goals: 0,
      },
      home: {
        isGoaliePulled: false,
        isOnPowerPlay: false,
        shotsOnGoal: 0,
        goals: 0,
      },
      periods: [],
    },
    startTime: "2022-02-04T00:00:00Z",
    status: {
      abstract: "Live",
      detailed: "In Progress",
    },
    type: "R",
    scoringPlays: [],
    ...overrides,
  };
};

export const createFinalGame = (overrides?: Partial<FinalGame>): FinalGame => {
  return {
    awayTeam: createTeam(),
    currentPeriod: 1,
    homeTeam: createTeam(),
    id: 123,
    isCurrentlyInProgress: false,
    startTime: "2022-02-04T00:00:00Z",
    status: {
      abstract: "Final",
      detailed: "Final",
    },
    linescore: {
      away: {
        isGoaliePulled: false,
        isOnPowerPlay: false,
        goals: 0,
        shotsOnGoal: 0,
      },
      home: {
        isGoaliePulled: false,
        isOnPowerPlay: false,
        shotsOnGoal: 0,
        goals: 0,
      },
      periods: [],
    },
    type: "R",
    scoringPlays: [],
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
    isCurrentlyInProgress: false,
    startTime: "2022-02-04T00:00:00Z",
    status: {
      abstract: "Preview",
      detailed: "Scheduled",
    },
    type: "R",
    scoringPlays: [],
    ...overrides,
  };
};

export const createPostponedGame = (
  overrides?: Partial<PostponedGame>
): PostponedGame => {
  return {
    awayTeam: createTeam(),
    homeTeam: createTeam(),
    id: 123,
    isCurrentlyInProgress: false,
    startTime: "2022-02-04T00:00:00Z",
    status: {
      abstract: "Preview",
      detailed: "Postponed",
    },
    type: "R",
    scoringPlays: [],
    ...overrides,
  };
};
