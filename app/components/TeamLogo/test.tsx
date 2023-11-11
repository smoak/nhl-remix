import { render, screen } from "@testing-library/react";
import { TeamLogo } from "./index";

describe("TeamLogo", () => {
  describe("when there is a logo for the team", () => {
    beforeEach(() => {
      render(<TeamLogo teamAbbreviation="VAN" teamName="Canucks" />);
    });

    it("renders the team logo", () => {
      expect(
        screen.getByRole("img", {
          name: "Canucks logo",
        })
      ).toBeInTheDocument();
    });
  });
});
