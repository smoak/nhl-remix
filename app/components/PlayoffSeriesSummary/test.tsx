import { render, screen } from "@testing-library/react";
import { PlayoffSeriesSummary } from "./index";

describe("PlayoffSeriesSummary", () => {
  describe("when a regular game", () => {
    let container: HTMLElement;

    beforeEach(() => {
      container = render(<PlayoffSeriesSummary />).container;
    });

    it("renders empty", () => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("when a playoff game", () => {
    beforeEach(() => {
      render(<PlayoffSeriesSummary seriesStatusShort="CAR leads 2-0" />);
    });

    it("renders the series status", () => {
      expect(screen.getByText("CAR leads 2-0")).toBeInTheDocument();
    });
  });
});
