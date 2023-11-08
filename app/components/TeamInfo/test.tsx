import { render, screen } from "@testing-library/react";
import type { Team } from "../types";
import { TeamInfo } from "./index";

const team: Team = {
  abbreviation: "VAN",
  id: 23,
  name: "Canucks",
  record: "35-28-10",
  score: 0,
  isGoaliePulled: false,
  isOnPowerPlay: false,
};

describe("TeamInfo", () => {
  beforeEach(() => {
    render(
      <TeamInfo
        teamAbbrev={team.abbreviation}
        teamName={team.name}
        teamRecord={team.record}
        isGoaliePulled={false}
        isOnPowerPlay={false}
      />
    );
  });

  it("displays the team logo", () => {
    expect(
      screen.getByRole("presentation", { hidden: true })
    ).toBeInTheDocument();
  });

  it("displays the team name", () => {
    expect(screen.getByText("Canucks")).toBeInTheDocument();
  });

  it("displays the team record", () => {
    expect(screen.getByText("35-28-10")).toBeInTheDocument();
  });
});
