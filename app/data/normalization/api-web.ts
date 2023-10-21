import {
  isLiveGame,
  type Game as ApiGame,
  type LiveGame as LiveApigame,
  type FutureGame as FutureApiGame,
  isFutureGame,
  type FinalGame as FinalApiGame,
  type BoxscoreResponse,
  isLiveBoxscoreGame,
  isFutureBoxscoreGame,
  type BoxscoreLiveGame,
  type LiveScoreTeam,
  type BoxscoreFutureGame,
  type BoxscoreFinalGame,
} from "~/api/v2/types";
import type {
  Game,
  ScheduledGame,
  LiveGame,
  FinalGame,
  Team,
  Linescore,
} from "~/components/types";

const normalizeLiveTeam = (team: LiveScoreTeam): Team => {
  return {
    abbreviation: team.abbrev,
    id: team.id,
    name: team.name.default,
    score: team.score,
    logo: team.logo,
  };
};

const normalizeFinalGame = (game: FinalApiGame): FinalGame => {
  const linescore: FinalGame["linescore"] = {
    away: {
      goals: game.awayTeam.score,
      isGoaliePulled: false,
      isOnPowerPlay: false,
      shotsOnGoal: game.awayTeam.sog,
    },
    home: {
      goals: game.homeTeam.score,
      isGoaliePulled: false,
      isOnPowerPlay: false,
      shotsOnGoal: game.homeTeam.sog,
    },
    periods: [],
  };

  return {
    currentPeriod: game.period,
    linescore,
    awayTeam: normalizeLiveTeam(game.awayTeam),
    homeTeam: normalizeLiveTeam(game.homeTeam),
    id: game.id,
    isCurrentlyInProgress: false,
    scoringPlays: game.goals.map((g) => ({
      description: "",
      goals: {
        away: g.awayScore,
        home: g.homeScore,
      },
      goalScorer: {
        id: g.playerId,
        name: g.name.default,
        seasonGoals: g.goalsToDate,
      },
      id: "",
      period: g.period,
      periodOrdinalNum: "",
      periodTime: g.timeInPeriod,
      scoringTeamId:
        g.teamAbbrev === game.awayTeam.abbrev
          ? game.awayTeam.id
          : game.homeTeam.id,
      strength:
        g.strength === "PP" ? "PPG" : g.strength === "EV" ? "EVEN" : "SHG",
    })),
    startTime: game.startTimeUTC,
    status: {
      abstract: "Final",
      detailed: "Final",
    },
    type: apiGameTypeToGameType[game.gameType],
  };
};

const normalizeFutureGame = (game: FutureApiGame): ScheduledGame => {
  const awayTeam: ScheduledGame["awayTeam"] = {
    abbreviation: game.awayTeam.abbrev,
    id: game.awayTeam.id,
    name: game.awayTeam.name.default,
    record: game.awayTeam.record,
    logo: game.awayTeam.logo,
  };

  const homeTeam: ScheduledGame["homeTeam"] = {
    abbreviation: game.homeTeam.abbrev,
    id: game.homeTeam.id,
    name: game.homeTeam.name.default,
    record: game.homeTeam.record,
    logo: game.homeTeam.logo,
  };

  return {
    awayTeam,
    homeTeam,
    id: game.id,
    isCurrentlyInProgress: false,
    scoringPlays: [],
    startTime: game.startTimeUTC,
    status: {
      abstract: "Preview",
      detailed: "Scheduled",
    },
    type: apiGameTypeToGameType[game.gameType],
  };
};

const apiGameTypeToGameType: Record<number, Game["type"]> = {
  1: "PR",
  2: "R",
  3: "P",
};

const normalizeLiveGame = (game: LiveApigame): LiveGame => {
  const awayTeam: LiveGame["awayTeam"] = {
    abbreviation: game.awayTeam.abbrev,
    id: game.awayTeam.id,
    name: game.awayTeam.name.default,
    score: game.awayTeam.score,
    logo: game.awayTeam.logo,
  };

  const homeTeam: LiveGame["homeTeam"] = {
    abbreviation: game.homeTeam.abbrev,
    id: game.homeTeam.id,
    name: game.homeTeam.name.default,
    score: game.homeTeam.score,
    logo: game.homeTeam.logo,
  };

  // const linescore: LiveGame["linescore"] = {
  //   away: {
  //     goals: game.awayTeam.score,
  //     isGoaliePulled:
  //       game.situation?.awayTeam.situationDescriptions?.some(
  //         (d) => d === "EN"
  //       ) ?? false,
  //     isOnPowerPlay:
  //       game.situation?.awayTeam.situationDescriptions?.some(
  //         (d) => d === "PP"
  //       ) ?? false,
  //     shotsOnGoal: game.awayTeam.sog,
  //   },
  //   home: {
  //     goals: game.homeTeam.score,
  //     isGoaliePulled:
  //       game.situation?.homeTeam.situationDescriptions?.some(
  //         (d) => d === "EN"
  //       ) ?? false,
  //     isOnPowerPlay:
  //       game.situation?.homeTeam.situationDescriptions?.some(
  //         (d) => d === "PP"
  //       ) ?? false,
  //     shotsOnGoal: game.homeTeam.sog,
  //   },
  //   periods: [],
  // };

  return {
    awayTeam,
    currentPeriod: game.period,
    currentPeriodTimeRemaining: game.clock.inIntermission
      ? "END"
      : game.clock.timeRemaining,
    homeTeam,
    id: game.id,
    isCurrentlyInProgress: true,
    // linescore,
    scoringPlays: game.goals.map((g) => ({
      description: "",
      goals: {
        away: g.awayScore,
        home: g.homeScore,
      },
      goalScorer: {
        id: g.playerId,
        name: g.name.default,
        seasonGoals: g.goalsToDate,
        mugshot: g.mugshot,
      },
      id: "",
      period: g.period,
      periodOrdinalNum: "",
      periodTime: g.timeInPeriod,
      scoringTeamId:
        g.teamAbbrev === game.awayTeam.abbrev
          ? game.awayTeam.id
          : game.homeTeam.id,
      strength: "EVEN",
    })),
    startTime: game.startTimeUTC,
    status: {
      abstract: "Live",
      detailed: "In Progress",
    },
    type: apiGameTypeToGameType[game.gameType],
  };
};

const normalizeLiveBoxscoreGame = (gameDetails: BoxscoreLiveGame): LiveGame => {
  const linescore: Linescore = {
    away: {
      goals: gameDetails.awayTeam.score,
      isGoaliePulled: false,
      isOnPowerPlay: false,
      shotsOnGoal: gameDetails.awayTeam.sog,
    },
    home: {
      goals: gameDetails.homeTeam.score,
      isGoaliePulled: false,
      isOnPowerPlay: false,
      shotsOnGoal: gameDetails.homeTeam.sog,
    },
    periods: gameDetails.summary.linescore.byPeriod.map((p, index) => ({
      away: {
        goals: p.away,
        shotsOnGoal: gameDetails.summary.shotsByPeriod[index].away,
      },
      home: {
        goals: p.home,
        shotsOnGoal: gameDetails.summary.shotsByPeriod[index].home,
      },
      num: p.period,
      ordinalNum: "",
      periodType: p.periodDescriptor.periodType,
    })),
  };

  return {
    awayTeam: normalizeLiveTeam(gameDetails.awayTeam),
    currentPeriod: 0,
    currentPeriodTimeRemaining: gameDetails.clock.inIntermission
      ? "END"
      : gameDetails.clock.timeRemaining,
    homeTeam: normalizeLiveTeam(gameDetails.homeTeam),
    id: gameDetails.id,
    isCurrentlyInProgress: true,
    linescore,
    scoringPlays: [],
    startTime: gameDetails.startTimeUTC,
    status: {
      abstract: "Live",
      detailed: "In Progress",
    },
    type: apiGameTypeToGameType[gameDetails.gameType],
  };
};

export const normalizeGame = (game: ApiGame): Game => {
  if (isLiveGame(game)) {
    return normalizeLiveGame(game);
  }

  if (isFutureGame(game)) {
    return normalizeFutureGame(game);
  }

  return normalizeFinalGame(game);
};

const normalizeFutureBoxscoreGame = (
  game: BoxscoreFutureGame
): ScheduledGame => {};

const normalizeFinalBoxscoreGame = (game: BoxscoreFinalGame): FinalGame => {};

export const normalizeGameDetails = (gameDetails: BoxscoreResponse): Game => {
  if (isLiveBoxscoreGame(gameDetails)) {
    return normalizeLiveBoxscoreGame(gameDetails);
  }

  if (isFutureBoxscoreGame(gameDetails)) {
    return normalizeFutureBoxscoreGame(gameDetails);
  }

  return normalizeFinalBoxscoreGame(gameDetails);
};

export const normalizeGames = (games: ApiGame[]): Game[] =>
  games.map(normalizeGame);
