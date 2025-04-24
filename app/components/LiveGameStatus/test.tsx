import { render, screen } from "@testing-library/react";
import { LiveGameStatus } from "./index";
import type { GameClock } from "../types";

describe("LiveGameStatus", () => {
  describe.each([
    [1, "1st"],
    [2, "2nd"],
    [3, "3rd"],
  ])("when the current period is %i", (periodNumber, expected) => {
    const gameClock: GameClock = {
      currentPeriod: periodNumber,
      isIntermission: false,
      isRunning: true,
      timeRemaining: "02:00",
    };

    beforeEach(() => {
      render(
        <LiveGameStatus gameClock={gameClock} isRegularSeasonGame={true} />,
      );
    });

    it("displays the correct period with ordinal", () => {
      expect(screen.getByText(`${expected}`)).toBeInTheDocument();
    });

    it("displays the correct time remaining", () => {
      expect(screen.getByText("02:00")).toBeInTheDocument();
    });
  });

  describe("when the game is in overtime", () => {
    const gameClock: GameClock = {
      currentPeriod: 4,
      isIntermission: false,
      isRunning: true,
      timeRemaining: "02:00",
    };

    beforeEach(() => {
      render(
        <LiveGameStatus isRegularSeasonGame={true} gameClock={gameClock} />,
      );
    });

    it("displays that the game is in overtime", () => {
      expect(screen.getByText("OT - 02:00")).toBeInTheDocument();
    });
  });

  describe("when the game is a regular season game and in a shootout", () => {
    const gameClock: GameClock = {
      currentPeriod: 5,
      isIntermission: false,
      isRunning: false,
      timeRemaining: "00:00",
    };

    beforeEach(() => {
      render(
        <LiveGameStatus isRegularSeasonGame={true} gameClock={gameClock} />,
      );
    });

    it("displays that the game is in a shootout", () => {
      expect(screen.getByText("SO - 00:00")).toBeInTheDocument();
    });
  });

  describe("when the game is a playoff game and past the first overtime", () => {
    const gameClock: GameClock = {
      currentPeriod: 5,
      isIntermission: false,
      isRunning: true,
      timeRemaining: "02:00",
    };

    beforeEach(() => {
      render(
        <LiveGameStatus isRegularSeasonGame={false} gameClock={gameClock} />,
      );
    });

    it("displays that the game is in the correct overtime period", () => {
      expect(screen.getByText("2OT - 02:00")).toBeInTheDocument();
    });
  });
});
