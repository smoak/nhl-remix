import { render, screen } from "@testing-library/react";
import { ScoringDetail } from ".";
import { createScoringPlay } from "~/data/mocks";

describe("ScoringDetail", () => {
  describe("with no assists", () => {
    beforeEach(() => {
      render(
        <ScoringDetail
          scoringPlay={createScoringPlay({
            goalScorer: {
              firstName: "Goal",
              headshot: "h",
              id: 1,
              lastName: "Scorer",
              name: "Goal Scorer",
              seasonGoals: 1,
            },
          })}
        />,
      );
    });

    it("should show the goal scorer's name and the season goals so far", () => {
      expect(screen.getByText("Goal Scorer (1)")).toBeInTheDocument();
    });

    it("should show the period time", () => {
      expect(screen.getByText("10:00")).toBeInTheDocument();
    });
  });

  describe("with a primary assist", () => {
    const scoringPlay = createScoringPlay({
      primaryAssist: {
        id: 5,
        firstName: "Primary",
        lastName: "Assist",
        seasonAssists: 2,
      },
    });

    beforeEach(() => {
      render(<ScoringDetail scoringPlay={scoringPlay} />);
    });

    it("should display the primary assist's name and season assist total", () => {
      expect(screen.getByText("Assist (2)")).toBeInTheDocument();
    });
  });

  describe("with a primary and secondary assist", () => {
    const scoringPlay = createScoringPlay({
      primaryAssist: {
        id: 5,
        firstName: "Primary",
        lastName: "Assist",
        seasonAssists: 2,
      },
      secondaryAssist: {
        id: 6,
        firstName: "Secondary",
        lastName: "Assist",
        seasonAssists: 5,
      },
    });

    beforeEach(() => {
      render(<ScoringDetail scoringPlay={scoringPlay} />);
    });

    it("should display the primary and secondary assist's name and season assist total", () => {
      expect(screen.getByText("Assist (2), Assist (5)")).toBeInTheDocument();
    });
  });
});
