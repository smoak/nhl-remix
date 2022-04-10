import { render, screen } from "@testing-library/react";
import { GameStatus } from "~/types";
import { TeamScore } from ".";

describe("TeamScore", () => {
  describe("when the game has not started yet", () => {
    const gameStatus: GameStatus = {
      abstractGameState: "Preview",
      codedGameState: "2",
      detailedState: "Pre-Game",
      startTimeTBD: false,
      statusCode: "2",
    };
    let container: HTMLElement;

    beforeEach(() => {
      container = render(
        <TeamScore score={0} gameStatus={gameStatus} />
      ).container;
    });

    it("renders empty", () => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("when the game has started or finished", () => {
    const gameStatus: GameStatus = {
      abstractGameState: "Final",
      codedGameState: "7",
      detailedState: "Final",
      startTimeTBD: false,
      statusCode: "7",
    };

    beforeEach(() => {
      render(<TeamScore score={5} gameStatus={gameStatus} />);
    });

    it("should render the score", () => {
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });
});
