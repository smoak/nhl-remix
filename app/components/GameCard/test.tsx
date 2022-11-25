import { render, screen } from "@testing-library/react";
import { createScheduledGame } from "~/data/mocks";
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

describe("GameCard", () => {
  describe("for a regular season or playoff game", () => {
    beforeEach(() => {
      render(<GameCard game={createScheduledGame({ homeTeam, awayTeam })} />);
    });

    it("should render the home team name", () => {
      expect(screen.getByText("Hurricanes")).toBeInTheDocument();
    });

    it("should render the away team name", () => {
      expect(screen.getByText("Bruins")).toBeInTheDocument();
    });
  });
});
