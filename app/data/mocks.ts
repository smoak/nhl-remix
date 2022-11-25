import type {
  FinalGame,
  LiveGame,
  PostponedGame,
  ScheduledGame,
  Team,
} from "~/components/types";

export const createTeam = (overrides?: Partial<Team>): Team => {
  return {
    abbreviation: "VAN",
    id: 23,
    name: "Canucks",
    record: {
      losses: 0,
      wins: 0,
    },
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
      },
      home: {
        isGoaliePulled: false,
        isOnPowerPlay: false,
      },
    },
    startTime: "2022-02-04T00:00:00Z",
    status: {
      abstract: "Live",
      detailed: "In Progress",
    },
    type: "R",
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
    type: "R",
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
    ...overrides,
  };
};
