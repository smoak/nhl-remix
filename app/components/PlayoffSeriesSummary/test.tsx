import { render, screen } from "@testing-library/react";
import { GameTeam } from "~/types";
import { PlayoffSeriesSummary } from "./index";

const canucks: GameTeam["team"] = {
  abbreviation: "VAN",
  active: true,
  firstYearOfPlay: "1970",
  franchiseId: 20,
  id: 23,
  link: "/api/v1/teams/23",
  locationName: "Vancouver",
  name: "Vancouver Canucks",
  officialSiteUrl: "http://www.canucks.com/",
  shortName: "Vancouver",
  teamName: "Canucks",
};

const kraken: GameTeam["team"] = {
  abbreviation: "SEA",
  active: true,
  firstYearOfPlay: "2021",
  franchiseId: 39,
  id: 55,
  link: "/api/v1/teams/55",
  locationName: "Seattle",
  name: "Seattle Kraken",
  officialSiteUrl: "https://www.nhl.com/seattle",
  shortName: "Seattle",
  teamName: "Kraken",
};

const homeTeam: GameTeam = {
  leagueRecord: {
    losses: 0,
    wins: 0,
    type: "league",
    ot: 0,
  },
  score: 0,
  team: canucks,
};

const awayTeam: GameTeam = {
  leagueRecord: {
    losses: 0,
    wins: 0,
    type: "league",
    ot: 0,
  },
  score: 0,
  team: kraken,
};

const leadingAwayTeam: GameTeam = {
  ...awayTeam,
  leagueRecord: {
    losses: 0,
    wins: 1,
    type: "league",
  },
};

const leadingHomeTeam: GameTeam = {
  ...homeTeam,
  leagueRecord: {
    losses: 0,
    wins: 1,
    type: "league",
  },
};

const homeTeamWonSeries: GameTeam = {
  ...homeTeam,
  leagueRecord: {
    losses: 0,
    wins: 4,
    type: "league",
  },
};

const awayTeamWonSeries: GameTeam = {
  ...awayTeam,
  leagueRecord: {
    losses: 0,
    wins: 4,
    type: "league",
  },
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
          homeTeam={leadingHomeTeam}
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
          awayTeam={leadingAwayTeam}
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
          homeTeam={homeTeamWonSeries}
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
          awayTeam={awayTeamWonSeries}
        />
      );
    });

    it("should show that the away team won the series", () => {
      expect(screen.getByText("SEA wins 4-0")).toBeInTheDocument();
    });
  });
});
