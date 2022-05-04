import { render, screen } from "@testing-library/react";
import { CurrentGameStatus } from "./index";

describe("CurrentGameStatus", () => {
  describe("for a live game in period 1", () => {
    beforeEach(() => {
      render(
        <CurrentGameStatus
          currentPeriod={1}
          currentPeriodTimeRemaining="03:14"
          gameState="Live"
          gameType="R"
          startTime="2022-04-09T00:00:00Z"
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

  describe("for a live game in 1st overtime", () => {
    beforeEach(() => {
      render(
        <CurrentGameStatus
          currentPeriod={4}
          gameType="R"
          currentPeriodTimeRemaining="03:14"
          gameState="Live"
          startTime="2022-04-09T00:00:00Z"
        />
      );
    });

    it("should render the current period and the time remaining", () => {
      expect(screen.getByText("OT - 03:14")).toBeInTheDocument();
    });

    it("should render a live indicator", () => {
      expect(screen.getByText("Live")).toBeInTheDocument();
    });
  });

  describe("for a live game in 2nd overtime", () => {
    beforeEach(() => {
      render(
        <CurrentGameStatus
          currentPeriod={5}
          currentPeriodTimeRemaining="03:14"
          gameState="Live"
          gameType="P"
          startTime="2022-04-09T00:00:00Z"
        />
      );
    });

    it("should render the current period and the time remaining", () => {
      expect(screen.getByText("2OT - 03:14")).toBeInTheDocument();
    });

    it("should render a live indicator", () => {
      expect(screen.getByText("Live")).toBeInTheDocument();
    });
  });

  describe("for a live game in 3rd overtime", () => {
    beforeEach(() => {
      render(
        <CurrentGameStatus
          currentPeriod={6}
          currentPeriodTimeRemaining="03:14"
          gameState="Live"
          gameType="P"
          startTime="2022-04-09T00:00:00Z"
        />
      );
    });

    it("should render the current period and the time remaining", () => {
      expect(screen.getByText("3OT - 03:14")).toBeInTheDocument();
    });

    it("should render a live indicator", () => {
      expect(screen.getByText("Live")).toBeInTheDocument();
    });
  });

  describe("for a game that finished in 1st overtime", () => {
    beforeEach(() => {
      render(
        <CurrentGameStatus
          currentPeriod={4}
          currentPeriodTimeRemaining="Final"
          gameType="R"
          gameState="Final"
          startTime="2022-04-08T23:00:00Z"
        />
      );
    });

    it("should say that the game finished in overtime", () => {
      expect(screen.getByText("Final/OT")).toBeInTheDocument();
    });
  });

  describe("for a game that finished in a shootout", () => {
    beforeEach(() => {
      render(
        <CurrentGameStatus
          currentPeriod={5}
          gameType="R"
          currentPeriodTimeRemaining="Final"
          gameState="Final"
          startTime="2022-04-08T23:00:00Z"
        />
      );
    });

    it("should say that the game finished in overtime", () => {
      expect(screen.getByText("Final/SO")).toBeInTheDocument();
    });
  });

  describe("for a game that finished in 3rd overtime", () => {
    beforeEach(() => {
      render(
        <CurrentGameStatus
          currentPeriod={6}
          currentPeriodTimeRemaining="Final"
          gameType="P"
          gameState="Final"
          startTime="2022-04-08T23:00:00Z"
        />
      );
    });

    it("should say that the game finished in 3rd overtime", () => {
      expect(screen.getByText("Final/3OT")).toBeInTheDocument();
    });
  });

  describe("for a game that finished in regulation", () => {
    beforeEach(() => {
      render(
        <CurrentGameStatus
          currentPeriod={3}
          gameType="R"
          currentPeriodTimeRemaining="Final"
          gameState="Final"
          startTime="2022-04-08T23:00:00Z"
        />
      );
    });

    it("should say that the game finished", () => {
      expect(screen.getByText("Final")).toBeInTheDocument();
    });
  });

  describe("for a game that has not started yet", () => {
    beforeEach(() => {
      render(
        <CurrentGameStatus
          currentPeriod={1}
          gameType="R"
          currentPeriodTimeRemaining="20:00"
          gameState="Preview"
          startTime="2022-04-10T21:00:00Z"
        />
      );
    });

    it("should show the start time", () => {
      expect(screen.getByText("9:00 PM")).toBeInTheDocument();
    });
  });
});
