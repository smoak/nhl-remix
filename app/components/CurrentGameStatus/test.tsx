import { render, screen } from "@testing-library/react";
import {
  GameLinescore,
  GameStatus,
  LinescoreTeam,
  ScheduleGame,
} from "~/types";
import { CurrentGameStatus } from ".";

const linescoreHomeTeam: LinescoreTeam = {
  goaliePulled: false,
  goals: 0,
  numSkaters: 5,
  powerPlay: false,
  shotsOnGoal: 0,
  team: {
    id: 30,
    link: "/api/v1/teams/30",
    name: "Minnesota Wild",
  },
};
const linescoreAwayTeam: LinescoreTeam = {
  goaliePulled: false,
  goals: 0,
  numSkaters: 5,
  powerPlay: false,
  shotsOnGoal: 0,
  team: {
    id: 19,
    link: "/api/v1/teams/19",
    name: "St. Louis Blues",
  },
};

describe("CurrentGameStatus", () => {
  describe("for a live game in period 1", () => {
    const status: GameStatus = {
      abstractGameState: "Live",
      codedGameState: "3",
      detailedState: "In Progress",
      startTimeTBD: false,
      statusCode: "3",
    };
    const startTime: ScheduleGame["gameDate"] = "2022-04-09T00:00:00Z";
    const linescore: GameLinescore = {
      currentPeriod: 1,
      currentPeriodOrdinal: "1st",
      currentPeriodTimeRemaining: "03:14",
      powerPlayInfo: {
        situationTimeElapsed: 0,
        situationTimeRemaining: 0,
        inSituation: false,
      },
      powerPlayStrength: "Even",
      hasShootout: false,
      intermissionInfo: {
        intermissionTimeRemaining: 0,
        intermissionTimeElapsed: 0,
        inIntermission: false,
      },
      teams: {
        home: linescoreHomeTeam,
        away: linescoreAwayTeam,
      },
    };

    beforeEach(() => {
      render(
        <CurrentGameStatus
          status={status}
          startTime={startTime}
          linescore={linescore}
        />
      );
    });

    it("should render the current period and the time remaining", () => {
      expect(screen.getByText("1st - 03:14")).toBeInTheDocument();
    });

    it("should render a live indicator", () => {
      expect(screen.getByText("Live")).toBeInTheDocument();
    });
  });

  describe("for a game that finished in overtime", () => {
    const status: GameStatus = {
      abstractGameState: "Final",
      codedGameState: "6",
      detailedState: "Final",
      startTimeTBD: false,
      statusCode: "6",
    };
    const startTime: ScheduleGame["gameDate"] = "2022-04-08T23:00:00Z";
    const linescore: GameLinescore = {
      currentPeriod: 4,
      currentPeriodOrdinal: "OT",
      currentPeriodTimeRemaining: "Final",
      hasShootout: false,
      intermissionInfo: {
        inIntermission: false,
        intermissionTimeElapsed: 0,
        intermissionTimeRemaining: 0,
      },
      powerPlayInfo: {
        situationTimeElapsed: 217,
        inSituation: false,
        situationTimeRemaining: 0,
      },
      powerPlayStrength: "Even",
      teams: {
        away: linescoreAwayTeam,
        home: linescoreHomeTeam,
      },
    };

    beforeEach(() => {
      render(
        <CurrentGameStatus
          status={status}
          startTime={startTime}
          linescore={linescore}
        />
      );
    });

    it("should say that the game finished in overtime", () => {
      expect(screen.getByText("Final/OT")).toBeInTheDocument();
    });
  });

  describe("for a game that finished in a shootout", () => {
    const status: GameStatus = {
      abstractGameState: "Final",
      codedGameState: "6",
      detailedState: "Final",
      startTimeTBD: false,
      statusCode: "6",
    };
    const startTime: ScheduleGame["gameDate"] = "2022-04-08T23:00:00Z";
    const linescore: GameLinescore = {
      currentPeriod: 4,
      currentPeriodOrdinal: "SO",
      currentPeriodTimeRemaining: "Final",
      hasShootout: false,
      intermissionInfo: {
        inIntermission: false,
        intermissionTimeElapsed: 0,
        intermissionTimeRemaining: 0,
      },
      powerPlayInfo: {
        situationTimeElapsed: 217,
        inSituation: false,
        situationTimeRemaining: 0,
      },
      powerPlayStrength: "Even",
      teams: {
        away: linescoreAwayTeam,
        home: linescoreHomeTeam,
      },
    };

    beforeEach(() => {
      render(
        <CurrentGameStatus
          status={status}
          startTime={startTime}
          linescore={linescore}
        />
      );
    });

    it("should say that the game finished in overtime", () => {
      expect(screen.getByText("Final/SO")).toBeInTheDocument();
    });
  });

  describe("for a game that finished in regulation", () => {
    const status: GameStatus = {
      abstractGameState: "Final",
      codedGameState: "6",
      detailedState: "Final",
      startTimeTBD: false,
      statusCode: "6",
    };
    const startTime: ScheduleGame["gameDate"] = "2022-04-08T23:00:00Z";
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
        situationTimeElapsed: 217,
        inSituation: false,
        situationTimeRemaining: 0,
      },
      powerPlayStrength: "Even",
      teams: {
        away: linescoreAwayTeam,
        home: linescoreHomeTeam,
      },
    };

    beforeEach(() => {
      render(
        <CurrentGameStatus
          status={status}
          startTime={startTime}
          linescore={linescore}
        />
      );
    });

    it("should say that the game finished", () => {
      expect(screen.getByText("Final")).toBeInTheDocument();
    });
  });

  describe("for a game that has not started yet", () => {
    const status: GameStatus = {
      abstractGameState: "Preview",
      codedGameState: "2",
      detailedState: "Pre-Game",
      startTimeTBD: false,
      statusCode: "2",
    };
    const startTime: ScheduleGame["gameDate"] = "2022-04-10T21:00:00Z";
    const linescore: GameLinescore = {
      currentPeriod: 1,
      currentPeriodOrdinal: "1st",
      currentPeriodTimeRemaining: "20:00",
      hasShootout: false,
      intermissionInfo: {
        inIntermission: false,
        intermissionTimeElapsed: 0,
        intermissionTimeRemaining: 0,
      },
      powerPlayInfo: {
        situationTimeElapsed: 0,
        inSituation: false,
        situationTimeRemaining: 0,
      },
      powerPlayStrength: "Even",
      teams: {
        away: linescoreAwayTeam,
        home: linescoreHomeTeam,
      },
    };

    beforeEach(() => {
      render(
        <CurrentGameStatus
          status={status}
          startTime={startTime}
          linescore={linescore}
        />
      );
    });

    it("should show the start time", () => {
      expect(screen.getByText("2:00 PM")).toBeInTheDocument();
    });
  });
});
