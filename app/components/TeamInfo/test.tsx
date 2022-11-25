import { render, screen } from "@testing-library/react";
import type { Team } from "../types";
import { TeamInfo } from "./index";

const team: Team = {
  abbreviation: "VAN",
  id: 23,
  name: "Canucks",
  record: {
    losses: 28,
    ot: 10,
    wins: 35,
  },
  score: 0,
};

describe("TeamInfo", () => {
  beforeEach(() => {
    render(
      <TeamInfo
        team={team}
        isGameInProgress={true}
        isGoaliePulled={false}
        isOnPowerPlay={false}
        gameType="R"
      />
    );
  });

  it("displays the team logo", () => {
    expect(
      screen.getByRole("img", { name: "Vancouver Canucks Logo" })
    ).toBeInTheDocument();
  });

  it("displays the team name", () => {
    expect(screen.getByText("Canucks")).toBeInTheDocument();
  });

  it("displays the team record", () => {
    expect(screen.getByText("35-28-10")).toBeInTheDocument();
  });
});
