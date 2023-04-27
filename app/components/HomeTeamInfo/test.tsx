import { render, screen } from "@testing-library/react";
import { createLiveGame, createScheduledGame } from "~/data/mocks";
import { HomeTeamInfo } from ".";

describe("HomeTeamInfo", () => {
  describe("for a game in progress", () => {
    beforeEach(() => {
      const game = createLiveGame();
      render(<HomeTeamInfo game={game} />);
    });

    it("should render the home team name", () => {
      expect(screen.getByText("Canucks")).toBeInTheDocument();
    });
  });

  describe("for a game not in progress", () => {
    beforeEach(() => {
      const game = createScheduledGame();
      render(<HomeTeamInfo game={game} />);
    });

    it("should render the home team name", () => {
      expect(screen.getByText("Canucks")).toBeInTheDocument();
    });
  });
});
