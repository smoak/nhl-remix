import { render, screen } from "@testing-library/react";
import {
  createFinalGame,
  createLiveGame,
  createPostponedGame,
  createScheduledGame,
} from "~/data/mocks";
import { CurrentGameStatus } from "./index";

describe("CurrentGameStatus", () => {
  describe("for a live game in period 1", () => {
    const game = createLiveGame({ currentPeriodTimeRemaining: "03:14" });

    beforeEach(() => {
      render(<CurrentGameStatus game={game} />);
    });

    it("should render the current period and the time remaining", () => {
      expect(screen.getByText("1st - 03:14")).toBeInTheDocument();
    });

    it("should render a live indicator", () => {
      expect(screen.getByText("Live")).toBeInTheDocument();
    });
  });

  describe("for a live game in 1st overtime", () => {
    const game = createLiveGame({
      currentPeriod: 4,
      currentPeriodTimeRemaining: "03:14",
    });

    beforeEach(() => {
      render(<CurrentGameStatus game={game} />);
    });

    it("should render the current period and the time remaining", () => {
      expect(screen.getByText("OT - 03:14")).toBeInTheDocument();
    });

    it("should render a live indicator", () => {
      expect(screen.getByText("Live")).toBeInTheDocument();
    });
  });

  describe("for a live playoff game in 2nd overtime", () => {
    const game = createLiveGame({
      currentPeriod: 5,
      currentPeriodTimeRemaining: "03:14",
      type: "P",
    });

    beforeEach(() => {
      render(<CurrentGameStatus game={game} />);
    });

    it("should render the current period and the time remaining", () => {
      expect(screen.getByText("2OT - 03:14")).toBeInTheDocument();
    });

    it("should render a live indicator", () => {
      expect(screen.getByText("Live")).toBeInTheDocument();
    });
  });

  describe("for a live playoff game in 3rd overtime", () => {
    const game = createLiveGame({
      currentPeriod: 6,
      currentPeriodTimeRemaining: "03:14",
      type: "P",
    });

    beforeEach(() => {
      render(<CurrentGameStatus game={game} />);
    });

    it("should render the current period and the time remaining", () => {
      expect(screen.getByText("3OT - 03:14")).toBeInTheDocument();
    });

    it("should render a live indicator", () => {
      expect(screen.getByText("Live")).toBeInTheDocument();
    });
  });

  describe("for a game that finished in 1st overtime", () => {
    const game = createFinalGame({ currentPeriod: 4 });

    beforeEach(() => {
      render(<CurrentGameStatus game={game} />);
    });

    it("should say that the game finished in overtime", () => {
      expect(screen.getByText("Final/OT")).toBeInTheDocument();
    });
  });

  describe("for a game that finished in a shootout", () => {
    const game = createFinalGame({ currentPeriod: 5 });

    beforeEach(() => {
      render(<CurrentGameStatus game={game} />);
    });

    it("should say that the game finished in overtime", () => {
      expect(screen.getByText("Final/SO")).toBeInTheDocument();
    });
  });

  describe("for a playoff game that finished in 3rd overtime", () => {
    const game = createFinalGame({ currentPeriod: 6, type: "P" });

    beforeEach(() => {
      render(<CurrentGameStatus game={game} />);
    });

    it("should say that the game finished in 3rd overtime", () => {
      expect(screen.getByText("Final/3OT")).toBeInTheDocument();
    });
  });

  describe("for a game that finished in regulation", () => {
    const game = createFinalGame({ currentPeriod: 3 });

    beforeEach(() => {
      render(<CurrentGameStatus game={game} />);
    });

    it("should say that the game finished", () => {
      expect(screen.getByText("Final")).toBeInTheDocument();
    });
  });

  describe("for a game that has not started yet", () => {
    const game = createScheduledGame({ startTime: "2022-04-10T21:00:00Z" });

    beforeEach(() => {
      render(<CurrentGameStatus game={game} />);
    });

    it("should show the start time", () => {
      expect(screen.getByText("9:00 PM")).toBeInTheDocument();
    });
  });

  describe("for a game that has been postponed", () => {
    const game = createPostponedGame();

    beforeEach(() => {
      render(<CurrentGameStatus game={game} />);
    });

    it("should indicate the game has been postponed", () => {
      expect(screen.getByText("Postponed")).toBeInTheDocument();
    });
  });
});
