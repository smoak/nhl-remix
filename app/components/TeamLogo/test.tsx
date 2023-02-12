import { render, screen } from "@testing-library/react";
import { TeamLogo } from ".";

describe("TeamLogo", () => {
  describe("when there is no logo for the team", () => {
    beforeEach(() => {
      render(<TeamLogo teamAbbreviation="TT" teamId={100} />);
    });

    it("renders the team abbreviation", () => {
      expect(screen.getByText("TT")).toBeInTheDocument();
    });
  });

  describe("when there is a logo for the team", () => {
    beforeEach(() => {
      render(<TeamLogo teamAbbreviation="VAN" teamId={23} />);
    });

    it("renders the team logo", () => {
      expect(
        screen.getByRole("img", { name: "Vancouver Canucks Logo" })
      ).toBeInTheDocument();
    });
  });
});
