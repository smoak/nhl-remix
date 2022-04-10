import { render, screen } from "@testing-library/react";
import { CurrentGameStatus } from "./index";

describe("CurrentGameStatus", () => {
  describe("for a live game in period 1", () => {
    beforeEach(() => {
      render(
        <CurrentGameStatus
          currentPeriod={1}
          currentPeriodOrdinal="1st"
          currentPeriodTimeRemaining="03:14"
          gameState="Live"
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

  describe("for a game that finished in overtime", () => {
    beforeEach(() => {
      render(
        <CurrentGameStatus
          currentPeriod={4}
          currentPeriodOrdinal="OT"
          currentPeriodTimeRemaining="Final"
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
          currentPeriodOrdinal="SO"
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

  describe("for a game that finished in regulation", () => {
    beforeEach(() => {
      render(
        <CurrentGameStatus
          currentPeriod={3}
          currentPeriodOrdinal="3rd"
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
          currentPeriodOrdinal="1st"
          currentPeriodTimeRemaining="20:00"
          gameState="Preview"
          startTime="2022-04-10T21:00:00Z"
        />
      );
    });

    it("should show the start time", () => {
      expect(screen.getByText("2:00 PM")).toBeInTheDocument();
    });
  });
});
