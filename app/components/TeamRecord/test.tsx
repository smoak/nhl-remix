import { render, screen } from "@testing-library/react";
import { TeamRecord } from "./index";

describe("TeamRecord", () => {
  describe("for a regular season game", () => {
    beforeEach(() => {
      render(<TeamRecord gameType="R" record="5-0-1" />);
    });

    it("renders correctly", () => {
      expect(screen.getByText("5-0-1")).toBeInTheDocument();
    });
  });

  describe("for a playoff game", () => {
    let container: HTMLElement;

    beforeEach(() => {
      container = render(<TeamRecord gameType="P" record="" />).container;
    });

    it("renders empty", () => {
      expect(container).toBeEmptyDOMElement();
    });
  });
});
