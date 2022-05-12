import { render, screen } from "@testing-library/react";
import { TeamInfo } from "./index";

const teamId = 23;
const teamName = "Canucks";
const losses = 28;
const ot = 10;
const wins = 35;

describe("TeamInfo", () => {
  beforeEach(() => {
    render(
      <TeamInfo
        wins={wins}
        losses={losses}
        ot={ot}
        teamId={teamId}
        teamName={teamName}
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
