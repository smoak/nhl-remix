import { hasScoringPlayers, isLiveGame } from "~/api/types";
import type { Game, GameList, ScoringPlay, Team } from "~/components/types";
import type {
  ScoringPlay as ApiScoringPlay,
  DoubleAssist,
  GameTeam,
  ScheduleGame,
  SingleAssit,
  SingleScorer,
} from "~/api/types";

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
  players: SingleAssit | DoubleAssist | SingleScorer
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

type NormalizeScoringPlay = (scoringPlay: ApiScoringPlay) => ScoringPlay;
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
  return scoringPlays
    .filter(hasScoringPlayers)
    .map<ScoringPlay>(normalizeScoringPlay);
};

const normalizeTeamRecord = ({
  losses,
  wins,
  ot,
}: GameTeam["leagueRecord"]): string => {
  if (ot != null) {
    return [wins, losses, ot].join("-");
  }

  return [wins, losses].join("-");
};

const normalizeTeam = (team: GameTeam): Team => {
  const record = normalizeTeamRecord(team.leagueRecord);

  return {
    abbreviation: team.team.abbreviation,
    id: team.team.id,
    name: team.team.teamName,
    score: team.score,
    record,
  };
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

  const homeTeam = normalizeTeam(teams.home);
  const awayTeam = normalizeTeam(teams.away);

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
