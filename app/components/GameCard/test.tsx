import { render, screen } from "@testing-library/react";
import type { GameLinescore, GameStatus } from "~/api/types";
import { GameCard } from "./index";

const homeTeam = {
  id: 12,
  name: "Hurricanes",
  score: 5,
  record: {
    wins: 3,
    losses: 2,
  },
  abbreviation: "CAR",
};

const awayTeam = {
  id: 6,
  name: "Bruins",
  score: 1,
  record: {
    wins: 2,
    losses: 3,
  },
  abbreviation: "BOS",
};

const linescore: GameLinescore = {
  currentPeriod: 3,
  currentPeriodOrdinal: "3rd",
  currentPeriodTimeRemaining: "Final",
  hasShootout: false,
  intermissionInfo: {
    inIntermission: false,
    intermissionTimeElapsed: 0,
    intermissionTimeRemaining: 0,
  },
  powerPlayInfo: {
    inSituation: false,
    situationTimeElapsed: 220,
    situationTimeRemaining: 0,
  },
  powerPlayStrength: "Even",
  teams: {
    away: {
      goaliePulled: false,
      goals: 1,
      numSkaters: 5,
      powerPlay: false,
      shotsOnGoal: 34,
      team: {
        id: 6,
        link: "/api/v1/teams/6",
        name: "Boston Bruins",
      },
    },
    home: {
      goaliePulled: false,
      goals: 5,
      numSkaters: 5,
      powerPlay: false,
      shotsOnGoal: 38,
      team: {
        id: 12,
        link: "/api/v1/teams/12",
        name: "Carolina Hurricanes",
      },
    },
  },
};

const status: GameStatus = {
  abstractGameState: "Final",
  codedGameState: "7",
  detailedState: "Final",
  startTimeTBD: false,
  statusCode: "7",
};

const game = {
  id: 1,
  startTime: "",
  homeTeam,
  awayTeam,
  isCurrentlyInProgress: false,
};

describe("GameCard", () => {
  describe("for a regular season or playoff game", () => {
    beforeEach(() => {
      render(
        <GameCard
          gameType="R"
          linescore={linescore}
          status={status}
          seriesStatusShort=""
          game={game}
        />
      );
    });

    it("should render the home team name", () => {
      expect(screen.getByText("Hurricanes")).toBeInTheDocument();
    });

    it("should render the away team name", () => {
      expect(screen.getByText("Bruins")).toBeInTheDocument();
    });
  });
});
