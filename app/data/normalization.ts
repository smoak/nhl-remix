import type { ScheduleGame } from "~/api/types";
import { isLiveGame } from "~/api/types";
import type { Game, GameList, ScoringPlay } from "~/components/types";

type NormalizeScheduleGames = (games: ScheduleGame[]) => GameList;
export const normalizeScheduleGames: NormalizeScheduleGames = (games) => {
  return {
    games: games.map(normalizeScheduleGame),
  };
};

type NormalizedScoringPlayers = {
  readonly goalScorer: ScoringPlay["goalScorer"];
  readonly primaryAssist: ScoringPlay["primaryAssist"];
  readonly secondaryAssist: ScoringPlay["secondaryAssist"];
};
type NormalizeScoringPlayers = (
  players: ScheduleGame["scoringPlays"][0]["players"]
) => NormalizedScoringPlayers;
const normalizeScoringPlayers: NormalizeScoringPlayers = (players) => {
  const [scorer, primaryAssistOrGoalie, secondaryAssistOrGoalie] = players;
  const primaryAssist =
    primaryAssistOrGoalie?.playerType === "Assist"
      ? {
          id: primaryAssistOrGoalie.player.id,
          name: primaryAssistOrGoalie.player.fullName,
          seasonAssists: primaryAssistOrGoalie.seasonTotal,
        }
      : undefined;
  const secondaryAssist =
    secondaryAssistOrGoalie?.playerType === "Assist"
      ? {
          id: secondaryAssistOrGoalie.player.id,
          name: secondaryAssistOrGoalie.player.fullName,
          seasonAssists: secondaryAssistOrGoalie.seasonTotal,
        }
      : undefined;
  const goalScorer = {
    id: scorer.player.id,
    name: scorer.player.fullName,
    seasonGoals: scorer.seasonTotal,
  };

  return {
    goalScorer,
    primaryAssist,
    secondaryAssist,
  };
};

type NormalizeScoringPlay = (
  scoringPlay: ScheduleGame["scoringPlays"][0]
) => ScoringPlay;
const normalizeScoringPlay: NormalizeScoringPlay = ({
  about,
  players,
  result,
  team,
}) => {
  const { goalScorer, primaryAssist, secondaryAssist } =
    normalizeScoringPlayers(players);

  return {
    description: result.description,
    id: result.eventCode,
    goals: about.goals,
    period: about.period,
    periodOrdinalNum: about.ordinalNum,
    periodTime: about.periodTime,
    goalScorer,
    primaryAssist,
    secondaryAssist,
    scoringTeamId: team.id,
    strength: result.strength.code,
  };
};

type NormalizeScoringPlays = (
  scoringPlays: ScheduleGame["scoringPlays"]
) => ScoringPlay[];
const normalizeScoringPlays: NormalizeScoringPlays = (scoringPlays) => {
  return scoringPlays.map<ScoringPlay>(normalizeScoringPlay);
};

type NormalizeScheduleGame = (game: ScheduleGame) => Game;
export const normalizeScheduleGame: NormalizeScheduleGame = (game) => {
  const {
    gamePk,
    gameDate,
    gameType,
    linescore,
    teams,
    status,
    seriesSummary,
    scoringPlays,
  } = game;

  const homeTeam = {
    id: teams.home.team.id,
    name: teams.home.team.teamName,
    score: teams.home.score,
    record: teams.home.leagueRecord,
    abbreviation: teams.home.team.abbreviation,
  };
  const awayTeam = {
    id: teams.away.team.id,
    name: teams.away.team.teamName,
    score: teams.away.score,
    record: teams.away.leagueRecord,
    abbreviation: teams.away.team.abbreviation,
  };

  const baseGame = {
    id: gamePk,
    currentPeriod: linescore.currentPeriod,
    startTime: gameDate,
    awayTeam,
    homeTeam,
    type: gameType,
    seriesStatusShort: seriesSummary?.seriesStatusShort,
    scoringPlays: normalizeScoringPlays(scoringPlays),
  };

  if (isLiveGame(game)) {
    return {
      ...baseGame,
      isCurrentlyInProgress: true,
      status: {
        abstract: "Live",
        detailed: game.status.detailedState,
      },
      currentPeriodTimeRemaining: game.linescore.currentPeriodTimeRemaining,
      currentPeriodOrdinal: game.linescore.currentPeriodOrdinal,
      linescore: {
        periods: linescore.periods,
        away: {
          isGoaliePulled: linescore.teams.away.goaliePulled,
          isOnPowerPlay: linescore.teams.away.powerPlay,
          goals: linescore.teams.away.goals,
          shotsOnGoal: linescore.teams.away.shotsOnGoal,
        },
        home: {
          isGoaliePulled: linescore.teams.home.goaliePulled,
          isOnPowerPlay: linescore.teams.home.powerPlay,
          goals: linescore.teams.home.goals,
          shotsOnGoal: linescore.teams.home.shotsOnGoal,
        },
      },
    };
  }

  if (
    status.abstractGameState === "Preview" &&
    (status.detailedState === "Scheduled" ||
      status.detailedState === "Pre-Game")
  ) {
    return {
      ...baseGame,
      isCurrentlyInProgress: false,
      status: {
        abstract: "Preview",
        detailed: "Scheduled",
      },
    };
  }

  if (
    status.abstractGameState === "Preview" &&
    status.detailedState === "Postponed"
  ) {
    return {
      ...baseGame,
      isCurrentlyInProgress: false,
      status: {
        abstract: "Preview",
        detailed: "Postponed",
      },
    };
  }

  return {
    ...baseGame,
    status: {
      abstract: "Final",
      detailed: "Final",
    },
    linescore: {
      periods: linescore.periods,
      away: {
        isGoaliePulled: linescore.teams.away.goaliePulled,
        isOnPowerPlay: linescore.teams.away.powerPlay,
        goals: linescore.teams.away.goals,
        shotsOnGoal: linescore.teams.away.shotsOnGoal,
      },
      home: {
        isGoaliePulled: linescore.teams.home.goaliePulled,
        isOnPowerPlay: linescore.teams.home.powerPlay,
        goals: linescore.teams.home.goals,
        shotsOnGoal: linescore.teams.home.shotsOnGoal,
      },
    },
    isCurrentlyInProgress: false,
  };
};
