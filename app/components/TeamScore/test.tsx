import { render, screen } from "@testing-library/react";
import { TeamScore } from ".";

describe("TeamScore", () => {
  describe("when rendered", () => {
    beforeEach(() => {
      render(<TeamScore score={5} />);
    });

    it("should render the score", () => {
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });
});
