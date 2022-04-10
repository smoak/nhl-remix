import { render, screen } from "@testing-library/react";
import { TeamName } from "./index";
import { LinescoreTeam } from "../../types";

const linescoreTeam: LinescoreTeam = {
  goaliePulled: false,
  goals: 0,
  numSkaters: 5,
  powerPlay: false,
  shotsOnGoal: 0,
  team: { id: 1, link: "link", name: "Test team" },
};

describe("TeamName", () => {
  describe("when there is no goalie pulled or power play", () => {
    beforeEach(() => {
      render(
        <TeamName
          name="Test team"
          linescoreTeam={linescoreTeam}
          abstractGameState="Live"
        />
      );
    });

    it("should render the team name", () => {
      expect(screen.getByText("Test team")).toBeInTheDocument();
    });

    it("should not render the empty net signifier", () => {
      expect(screen.queryByText("EN")).not.toBeInTheDocument();
    });

    it("should not render the power play signifier", () => {
      expect(screen.queryByText("PP")).not.toBeInTheDocument();
    });
  });

  describe("when the goalie is pulled", () => {
    beforeEach(() => {
      render(
        <TeamName
          name="Test team"
          linescoreTeam={{ ...linescoreTeam, goaliePulled: true }}
          abstractGameState="Live"
        />
      );
    });

    it("should render the team name", () => {
      expect(screen.getByText("Test team")).toBeInTheDocument();
    });

    it("should render an empty net signifier", () => {
      expect(screen.getByText("EN")).toBeInTheDocument();
    });

    it("should not render the power play signifier", () => {
      expect(screen.queryByText("PP")).not.toBeInTheDocument();
    });
  });

  describe("when on the power play", () => {
    beforeEach(() => {
      render(
        <TeamName
          name="Test team"
          linescoreTeam={{ ...linescoreTeam, powerPlay: true }}
          abstractGameState="Live"
        />
      );
    });

    it("should render the team name", () => {
      expect(screen.getByText("Test team")).toBeInTheDocument();
    });

    it("should not render the empty net signifier", () => {
      expect(screen.queryByText("EN")).not.toBeInTheDocument();
    });

    it("should render the power play signifier", () => {
      expect(screen.getByText("PP")).toBeInTheDocument();
    });
  });
});
