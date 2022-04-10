import { render, screen } from "@testing-library/react";
import { TeamScore } from ".";

describe("TeamScore", () => {
  describe("when the game has not started yet", () => {
    let container: HTMLElement;

    beforeEach(() => {
      container = render(<TeamScore score={0} gameState="Preview" />).container;
    });

    it("renders empty", () => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("when the game has started or finished", () => {
    beforeEach(() => {
      render(<TeamScore score={5} gameState="Final" />);
    });

    it("should render the score", () => {
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });
});
