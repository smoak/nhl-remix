import { render, screen } from "@testing-library/react";
import { PlayffBracket } from ".";
import type { PlayoffBracket } from "../types";

describe("PlayoffBracket", () => {
  const bracket: PlayoffBracket = {
    eastern: {
      "1": { matchups: [] },
      "2": { matchups: [] },
      "3": { matchups: [] },
    },
    western: {
      "1": { matchups: [] },
      "2": { matchups: [] },
      "3": { matchups: [] },
    },
    finalRound: {
      id: "finalRound",
    },
  };

  beforeEach(() => {
    render(<PlayffBracket bracket={bracket} />);
  });

  it("renders round 1", () => {
    expect(screen.getAllByText("Round 1")).toHaveLength(2);
  });

  it("renders round 2", () => {
    expect(screen.getAllByText("Round 2")).toHaveLength(2);
  });

  it("renders round 3", () => {
    expect(screen.getAllByText("Round 3")).toHaveLength(2);
  });

  it("renders the SCF", () => {
    expect(screen.getByText("SCF")).toBeInTheDocument();
  });
});
