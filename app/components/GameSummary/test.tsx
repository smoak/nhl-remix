import { render, screen } from "@testing-library/react";
import { GameSummary } from "./index";
import { createScheduledGame } from "~/data/mocks";

describe("GameSummary", () => {
  describe("when a scheduled game is rendered", () => {
    const game = createScheduledGame();

    beforeEach(() => {
      render(<GameSummary game={game} periodSummaries={[]} />);
    });

    it("should render correctly", () => {
      expect(screen.getByText("Game has not started.")).toBeInTheDocument();
    });
  });
});
