import type {
  FinalGame,
  Game,
  GameType,
  LiveGame,
  ScheduledGame,
  Team,
} from "~/components/types";
import {
  type ScheduleGame,
  type GameType as ApiGameType,
  type ScheduleFinishedGame,
  type ScheduleLiveGame,
  type ScheduleGameTeam,
  type GameSituation,
  type ScoreboardGame,
  type ScheduleFutureGame,
  type ScoreboardLiveGame,
  type ScoreboardFutureGame,
} from "~/api/types";

type NormalizeGamesOptions = {
  readonly scheduledGames: ScheduleGame[];
  readonly scoreboardGames: Record<number, ScoreboardGame>;
};
type NormalizeGames = (options: NormalizeGamesOptions) => Game[];
export const normalizeGames: NormalizeGames = ({
  scheduledGames,
  scoreboardGames,
}) =>
  scheduledGames.reduce<Game[]>((accum, apiGame) => {
    const g = normalizeGame(apiGame, scoreboardGames[apiGame.id]);

    accum.push(g);

    return accum;
  }, []);

const ApiGameTypeToGameType: Record<ApiGameType, GameType> = {
  "1": "PR",
  "2": "R",
  "3": "P",
};

type NormalizeTeam = (
  team: ScheduleGameTeam,
  situation?: GameSituation
) => Team;
const normalizeTeam: NormalizeTeam = (team, situation) => {
  // const isOnPowerPlay =
  //   situation?.teamAbbrev === team.abbrev && situation.situationCode === "PP";

  return {
    abbreviation: team.abbrev,
    id: team.id,
    isGoaliePulled: false,
    isOnPowerPlay: false,
    name: team.placeName.default,
    score: 0,
    record: "",
  };
};

// type NormalizeTeamWithScore = (
//   team: TeamWithScore<ApiTeam>,
//   situation?: GameSituation
// ) => Team;
// const normalizeTeamWithScore: NormalizeTeamWithScore = (team, situation) => {
//   return {
//     ...normalizeTeam(team, situation),
//     score: team.score,
//   };
// };

type NormalizeScheduledGame = (
  game: ScheduleFutureGame,
  scoreboardGame: ScoreboardFutureGame
) => ScheduledGame;
const normalizeScheduledGame: NormalizeScheduledGame = (
  game,
  scoreboardGame
) => {
  return {
    awayTeam: {
      ...normalizeTeam(game.awayTeam),
      record: scoreboardGame.awayTeam.record,
      name: scoreboardGame.awayTeam.name.default,
    },
    homeTeam: {
      ...normalizeTeam(game.homeTeam),
      record: scoreboardGame.homeTeam.record,
      name: scoreboardGame.homeTeam.name.default,
    },
    id: game.id,
    isCurrentlyInProgress: false,
    startTime: game.startTimeUTC,
    gameState: "Scheduled",
    type: ApiGameTypeToGameType[game.gameType],
  };
};

type NormalizeFinalGame = (game: ScheduleFinishedGame) => FinalGame;
const normalizeFinalGame: NormalizeFinalGame = (game) => {
  return {
    awayTeam: normalizeTeam(game.awayTeam),
    homeTeam: normalizeTeam(game.homeTeam),
    id: game.id,
    isCurrentlyInProgress: false,
    startTime: game.startTimeUTC,
    gameState: "Final",
    type: ApiGameTypeToGameType[game.gameType],
    endedInPeriod: 1,
  };
};

type NormalizeLiveGame = (
  game: ScheduleLiveGame,
  scoreboardGame: ScoreboardLiveGame
) => LiveGame;
const normalizeLiveGame: NormalizeLiveGame = (game, scoreboardGame) => {
  return {
    awayTeam: {
      abbreviation: game.awayTeam.abbrev,
      id: game.awayTeam.id,
      name: scoreboardGame.awayTeam.name.default,
      record: "",
      isGoaliePulled: false,
      isOnPowerPlay: false,
      score: scoreboardGame.awayTeam.score,
    },
    currentPeriod: scoreboardGame.period,
    currentPeriodTimeRemaining: scoreboardGame.clock.inIntermission
      ? "END"
      : scoreboardGame.clock.timeRemaining,
    homeTeam: {
      ...normalizeTeam(game.homeTeam),
      name: scoreboardGame.homeTeam.name.default,
      isGoaliePulled: false,
      isOnPowerPlay: false,
      score: scoreboardGame.homeTeam.score,
    },
    id: game.id,
    isCurrentlyInProgress: true,
    startTime: game.startTimeUTC,
    gameState: "Live",
    sog: {
      away: scoreboardGame.awayTeam.sog,
      home: scoreboardGame.homeTeam.sog,
    },
    type: ApiGameTypeToGameType[game.gameType],
  };
};

type NormalizeGame = (
  game: ScheduleGame,
  scoreboardGame: ScoreboardGame
) => Game;
export const normalizeGame: NormalizeGame = (game, scoreboardGame) => {
  if (game.gameState === "FINAL" || game.gameState === "OFF") {
    return normalizeFinalGame(game);
  }

  if (game.gameState === "LIVE" || game.gameState === "CRIT") {
    return normalizeLiveGame(game, scoreboardGame as ScoreboardLiveGame);
  }

  return normalizeScheduledGame(
    game as ScheduleFutureGame,
    scoreboardGame as ScoreboardFutureGame
  );
};

// const normalizeAssist = (
//   assist?: GamecenterScoringGoalAssist
// ): ScoringPlayAssister | undefined => {
//   if (assist == null) {
//     return;
//   }

//   return {
//     firstName: assist.firstName,
//     id: assist.playerId,
//     lastName: assist.lastName,
//     seasonAssists: assist.assistsToDate,
//   };
// };

// type NormalizeScoringPlays = (
//   scoring: GamecenterScoring[]
// ) => Record<number, ScoringPlay[]>;
// const normalizeScoringPlays: NormalizeScoringPlays = (scoring) => {
//   return scoring.reduce<Record<number, ScoringPlay[]>>((accum, scoring) => {
//     accum[scoring.period] = scoring.goals.map((g) => ({
//       awayScore: g.awayScore,
//       goalScorer: {
//         firstName: g.firstName,
//         id: g.playerId,
//         lastName: g.lastName,
//         seasonGoals: g.goalsToDate,
//         name: g.name,
//         headshot: g.headshot,
//       },
//       highlightClip: g.highlightClip,
//       homeScore: g.homeScore,
//       leadingTeamAbbrev: g.leadingTeamAbbrev,
//       teamAbbrev: g.teamAbbrev,
//       period: scoring.period,
//       timeInPeriod: g.timeInPeriod,
//       primaryAssist: normalizeAssist(g.assists[0]),
//       secondaryAssist: normalizeAssist(g.assists[1]),
//     }));
//     return accum;
//   }, {});
// };

// type NormalizeGameDetails = (response: GamecenterResponse) => GameDetails;
// export const normalizeGameDetails: NormalizeGameDetails = (response) => {
//   if (isFutureGame(response)) {
//     return {
//       game: normalizeScheduledGame(response),
//       scoringPlays: [],
//       periodSummaries: [],
//     };
//   }

//   const scoringPlays = normalizeScoringPlays(response.summary.scoring);
//   const periodSummaries: PeriodSummary[] =
//     response.summary.linescore.byPeriod.map((p) => ({
//       awayScore: p.away,
//       homeScore: p.home,
//       periodNumber: p.period,
//     }));

//   if (isFinishedGame(response)) {
//     return {
//       game: {
//         ...normalizeFinalGame(response),
//         endedInPeriod:
//           response.summary.linescore.byPeriod[
//             response.summary.linescore.byPeriod.length - 1
//           ].period,
//       },
//       scoringPlays,
//       periodSummaries,
//     };
//   }

//   return {
//     game: normalizeLiveGame(response),
//     scoringPlays,
//     periodSummaries,
//   };
// };
