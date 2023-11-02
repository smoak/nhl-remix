import { render, screen } from "@testing-library/react";
import { createLiveGame } from "~/data/mocks";
import { AwayTeamInfo } from ".";

describe("AwayTeamInfo", () => {
  describe("for a live game with the goalie pulled", () => {
    const linescore = {
      away: {
        isGoaliePulled: true,
        goals: 0,
        isOnPowerPlay: false,
        shotsOnGoal: 0,
      },
      home: {
        isGoaliePulled: false,
        goals: 0,
        isOnPowerPlay: false,
        shotsOnGoal: 0,
      },
      periods: [],
    };
    const game = createLiveGame({ linescore });

    beforeEach(() => {
      render(<AwayTeamInfo game={game} />);
    });

    it("displays the team logo", () => {
      expect(
        screen.getByRole("presentation", { hidden: true })
      ).toBeInTheDocument();
    });

    it("displays that the net is empty", () => {
      expect(screen.getByText("EN")).toBeInTheDocument();
    });
  });

  describe("for a live game with the team on a power play", () => {
    const linescore = {
      away: {
        isGoaliePulled: false,
        goals: 0,
        isOnPowerPlay: true,
        shotsOnGoal: 0,
      },
      home: {
        isGoaliePulled: false,
        goals: 0,
        isOnPowerPlay: false,
        shotsOnGoal: 0,
      },
      periods: [],
    };
    const game = createLiveGame({ linescore });

    beforeEach(() => {
      render(<AwayTeamInfo game={game} />);
    });

    it("displays the team logo", () => {
      expect(
        screen.getByRole("presentation", { hidden: true })
      ).toBeInTheDocument();
    });

    it("displays that the net is empty", () => {
      expect(screen.getByText("PP")).toBeInTheDocument();
    });
  });
});
