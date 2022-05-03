import { render, screen } from "@testing-library/react";
import { TeamRecord } from "./index";

describe("TeamRecord", () => {
  describe("for a regular season game", () => {
    beforeEach(() => {
      render(<TeamRecord wins={5} losses={0} otWins={1} gameType="R" />);
    });

    it("renders correctly", () => {
      expect(screen.getByText("5-0-1")).toBeInTheDocument();
    });
  });

  describe("for a playoff game", () => {
    let container: HTMLElement;

    beforeEach(() => {
      container = render(
        <TeamRecord wins={4} losses={0} gameType="P" />
      ).container;
    });

    it("renders empty", () => {
      expect(container).toBeEmptyDOMElement();
    });
  });
});
