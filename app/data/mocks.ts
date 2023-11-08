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
    isGoaliePulled: false,
    isOnPowerPlay: false,
    ...overrides,
  };
};

export const createLiveGame = (overrides?: Partial<LiveGame>): LiveGame => {
  return {
    awayTeam: createTeam(),
    currentPeriod: 1,
    sog: {
      away: 5,
      home: 3,
    },
    currentPeriodTimeRemaining: "20:00",
    homeTeam: createTeam(),
    id: 123,
    isCurrentlyInProgress: true,
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
    homeTeam: createTeam(),
    endedInPeriod: 3,
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
