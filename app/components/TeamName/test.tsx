import { render, screen } from "@testing-library/react";
import { TeamName } from "./index";

describe("TeamName", () => {
  describe("when there is no goalie pulled or power play", () => {
    beforeEach(() => {
      render(
        <TeamName
          isOnPowerPlay={false}
          isGoaliePulled={false}
          name="Test team"
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
          isGoaliePulled={true}
          isOnPowerPlay={false}
          name="Test team"
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
          isGoaliePulled={false}
          isOnPowerPlay={true}
          name="Test team"
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
