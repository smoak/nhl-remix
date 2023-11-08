import { render, screen } from "@testing-library/react";
import { ScoringDetail } from ".";
import { createScoringPlay /* , createTeam  */ } from "~/data/mocks";

describe("ScoringDetail", () => {
  describe("with no assists", () => {
    beforeEach(() => {
      render(
        <ScoringDetail
          // awayTeam={createTeam()}
          // homeTeam={createTeam()}
          scoringPlay={createScoringPlay()}
        />
      );
    });

    it("should show the goal scorer's name and the season goals so far", () => {
      expect(screen.getByText("Goal scorer (1)")).toBeInTheDocument();
    });

    it("should show the period time and the period", () => {
      expect(screen.getByText("10:00 / 1st")).toBeInTheDocument();
    });
  });

  // describe("with a primary assist", () => {
  //   const scoringPlay = createScoringPlay({
  //     primaryAssist: {
  //       id: 5,
  //       name: "Primary Assist",
  //       seasonAssists: 2,
  //     },
  //   });

  //   beforeEach(() => {
  //     render(
  //       <ScoringDetail
  //         awayTeam={createTeam()}
  //         homeTeam={createTeam()}
  //         scoringPlay={scoringPlay}
  //       />
  //     );
  //   });

  //   it("should display the primary assist's name and season assist total", () => {
  //     expect(screen.getByText("Primary Assist (2)")).toBeInTheDocument();
  //   });
  // });

  // describe("with a primary and secondary assist", () => {
  //   const scoringPlay = createScoringPlay({
  //     primaryAssist: {
  //       id: 5,
  //       name: "Primary Assist",
  //       seasonAssists: 2,
  //     },
  //     secondaryAssist: {
  //       id: 6,
  //       name: "Secondary Assist",
  //       seasonAssists: 5,
  //     },
  //   });

  //   beforeEach(() => {
  //     render(
  //       <ScoringDetail
  //         awayTeam={createTeam()}
  //         homeTeam={createTeam()}
  //         scoringPlay={scoringPlay}
  //       />
  //     );
  //   });

  //   it("should display the primary and secondary assist's name and season assist total", () => {
  //     expect(
  //       screen.getByText("Primary Assist (2), Secondary Assist (5)")
  //     ).toBeInTheDocument();
  //   });
  // });

  // describe("a power play goal", () => {
  //   const scoringPlay = createScoringPlay({
  //     strength: "PPG",
  //   });

  //   beforeEach(() => {
  //     render(
  //       <ScoringDetail
  //         awayTeam={createTeam()}
  //         homeTeam={createTeam()}
  //         scoringPlay={scoringPlay}
  //       />
  //     );
  //   });

  //   it("display that a power play goal was scored", () => {
  //     expect(screen.getByText("PPG")).toBeInTheDocument();
  //   });
  // });
});
