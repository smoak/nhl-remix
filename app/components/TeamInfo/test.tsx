import { render, screen } from "@testing-library/react";
import { LeagueRecord, LinescoreTeam } from "~/types";
import { TeamInfo } from "./index";

const linescoreTeam: LinescoreTeam = {
  goaliePulled: false,
  goals: 0,
  numSkaters: 5,
  powerPlay: false,
  shotsOnGoal: 0,
  team: {
    id: 23,
    link: "/api/v1/teams/23",
    name: "Vancouver Canucks",
  },
};

const teamId = 23;
const teamName = "Canucks";
const leagueRecord: LeagueRecord = {
  losses: 28,
  ot: 10,
  type: "league",
  wins: 35,
};

describe("TeamInfo", () => {
  beforeEach(() => {
    render(
      <TeamInfo
        leagueRecord={leagueRecord}
        teamId={teamId}
        teamName={teamName}
        linescoreTeam={linescoreTeam}
        abstractGameState="Live"
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
