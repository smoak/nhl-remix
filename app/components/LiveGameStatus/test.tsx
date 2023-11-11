import { render, screen } from "@testing-library/react";
import { LiveGameStatus } from "./index";

describe("LiveGameStatus", () => {
  describe.each([
    [1, "1st"],
    [2, "2nd"],
    [3, "3rd"],
  ])("when the current period is %i", (periodNumber, expected) => {
    beforeEach(() => {
      render(
        <LiveGameStatus
          currentPeriod={periodNumber}
          currentPeriodTimeRemaining="02:00"
          isRegularSeasonGame={true}
          isInIntermission={false}
        />
      );
    });

    it("displays the correct period with ordinal", () => {
      expect(screen.getByText(`${expected} - 02:00`)).toBeInTheDocument();
    });
  });

  describe("when the game is in overtime", () => {
    beforeEach(() => {
      render(
        <LiveGameStatus
          currentPeriod={4}
          currentPeriodTimeRemaining="02:00"
          isRegularSeasonGame={true}
          isInIntermission={false}
        />
      );
    });

    it("displays that the game is in overtime", () => {
      expect(screen.getByText("OT - 02:00")).toBeInTheDocument();
    });
  });

  describe("when the game is a regular season game and in a shootout", () => {
    beforeEach(() => {
      render(
        <LiveGameStatus
          currentPeriod={5}
          currentPeriodTimeRemaining="00:00"
          isRegularSeasonGame={true}
          isInIntermission={false}
        />
      );
    });

    it("displays that the game is in a shootout", () => {
      expect(screen.getByText("SO - 00:00")).toBeInTheDocument();
    });
  });

  describe("when the game is a playoff game and past the first overtime", () => {
    beforeEach(() => {
      render(
        <LiveGameStatus
          currentPeriod={5}
          currentPeriodTimeRemaining="02:00"
          isRegularSeasonGame={false}
          isInIntermission={false}
        />
      );
    });

    it("displays that the game is in the correct overtime period", () => {
      expect(screen.getByText("2OT - 02:00")).toBeInTheDocument();
    });
  });
});
