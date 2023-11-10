import { render, screen } from "@testing-library/react";
import { createScheduledGame, createTeam } from "~/data/mocks";
import { GameCard } from "./index";

const homeTeam = createTeam({
  id: 12,
  name: "Hurricanes",
  record: "3-2",
  abbreviation: "CAR",
});

const awayTeam = createTeam({
  id: 6,
  name: "Bruins",
  record: "2-3",
  abbreviation: "BOS",
});

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
