import { render, screen } from "@testing-library/react";
import { ScoringPlayList } from ".";
import { createScoringPlay } from "~/data/mocks";

describe("ScoringPlayList", () => {
  describe("when there are no scoring plays", () => {
    beforeEach(() => {
      render(
        <ScoringPlayList
          // awayTeam={createTeam()}
          // homeTeam={createTeam()}
          scoringPlays={[]}
        />
      );
    });

    it("should render a message about no goals", () => {
      expect(screen.getByText("No Goals")).toBeInTheDocument();
    });
  });

  describe("when there are scoring plays", () => {
    beforeEach(() => {
      render(
        <ScoringPlayList
          // awayTeam={createTeam()}
          // homeTeam={createTeam()}
          scoringPlays={[createScoringPlay()]}
        />
      );
    });

    it("should show the scoring details", () => {
      expect(screen.getByText("Goal scorer (1)")).toBeInTheDocument();
    });
  });
});
