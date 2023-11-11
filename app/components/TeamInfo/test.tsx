import { render, screen } from "@testing-library/react";
import { TeamInfo } from "./index";

describe("TeamInfo", () => {
  beforeEach(() => {
    render(
      <TeamInfo
        teamAbbrev="VAN"
        teamName="Canucks"
        teamRecord="35-28-10"
        isGoaliePulled={false}
        isOnPowerPlay={false}
      />
    );
  });

  it("displays the team logo", () => {
    expect(
      screen.getByRole("img", { name: "Canucks logo" })
    ).toBeInTheDocument();
  });

  it("displays the team name", () => {
    expect(screen.getByText("Canucks")).toBeInTheDocument();
  });

  it("displays the team record", () => {
    expect(screen.getByText("35-28-10")).toBeInTheDocument();
  });
});
