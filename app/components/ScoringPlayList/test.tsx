import { render, screen } from "@testing-library/react";
import { ScoringPlayList } from "./index.js";
import { createScoringPlay } from "../../data/mocks";

describe("ScoringPlayList", () => {
  describe("when there are no scoring plays", () => {
    beforeEach(() => {
      render(<ScoringPlayList scoringPlays={[]} />);
    });

    it("should render a message about no goals", () => {
      expect(screen.getByText("No Goals")).toBeInTheDocument();
    });
  });

  describe("when there are scoring plays", () => {
    beforeEach(() => {
      render(<ScoringPlayList scoringPlays={[createScoringPlay()]} />);
    });

    it("should show the scoring details", () => {
      expect(screen.getByText("Some Body (100)")).toBeInTheDocument();
    });
  });
});
