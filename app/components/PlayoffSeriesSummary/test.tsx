import { render, screen } from "@testing-library/react";
import { PlayoffSeriesSummary } from "./index";

const homeTeam = {
  abbreviation: "VAN",
  wins: 0,
};

const awayTeam = {
  abbreviation: "SEA",
  wins: 0,
};

describe("PlayoffSeriesSummary", () => {
  describe("when a regular game", () => {
    let container: HTMLElement;

    beforeEach(() => {
      container = render(
        <PlayoffSeriesSummary
          gameType="R"
          awayTeam={awayTeam}
          homeTeam={homeTeam}
        />
      ).container;
    });

    it("renders empty", () => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("when a playoff game and the series is tied", () => {
    beforeEach(() => {
      render(
        <PlayoffSeriesSummary
          gameType="P"
          homeTeam={homeTeam}
          awayTeam={awayTeam}
        />
      );
    });

    it("should render the series score", () => {
      expect(screen.getByText("Series 0-0")).toBeInTheDocument();
    });
  });

  describe("when a playoff game and the home team is leading the series", () => {
    beforeEach(() => {
      render(
        <PlayoffSeriesSummary
          gameType="P"
          homeTeam={{ ...homeTeam, wins: 1 }}
          awayTeam={awayTeam}
        />
      );
    });

    it("should render that the home team is leading the series", () => {
      expect(screen.getByText("VAN leads 1-0")).toBeInTheDocument();
    });
  });

  describe("when a playoff game and the away team is leading the series", () => {
    beforeEach(() => {
      render(
        <PlayoffSeriesSummary
          gameType="P"
          homeTeam={homeTeam}
          awayTeam={{ ...awayTeam, wins: 1 }}
        />
      );
    });

    it("should render that the away team is leading the series", () => {
      expect(screen.getByText("SEA leads 1-0")).toBeInTheDocument();
    });
  });

  describe("when a playoff game and the home team has won the series", () => {
    beforeEach(() => {
      render(
        <PlayoffSeriesSummary
          gameType="P"
          homeTeam={{ ...homeTeam, wins: 4 }}
          awayTeam={awayTeam}
        />
      );
    });

    it("should show that the home team won the series", () => {
      expect(screen.getByText("VAN wins 4-0")).toBeInTheDocument();
    });
  });

  describe("when a playoff game and the away team has won the series", () => {
    beforeEach(() => {
      render(
        <PlayoffSeriesSummary
          gameType="P"
          homeTeam={homeTeam}
          awayTeam={{ ...awayTeam, wins: 4 }}
        />
      );
    });

    it("should show that the away team won the series", () => {
      expect(screen.getByText("SEA wins 4-0")).toBeInTheDocument();
    });
  });
});
