import { render, screen } from "@testing-library/react";
import { FinalGameStatus } from ".";

describe("FinalGameStatus", () => {
  describe("when the game ends in a shootout", () => {
    beforeEach(() => {
      render(<FinalGameStatus endedInPeriod={5} gameType="RegularSeason" />);
    });

    it("should indicate that the game ended in a shootout", () => {
      expect(screen.getByText("Final/SO")).toBeInTheDocument();
    });
  });

  describe("when a regular season game ends in overtime", () => {
    beforeEach(() => {
      render(<FinalGameStatus endedInPeriod={4} gameType="RegularSeason" />);
    });

    it("should indicate that the game ended in overtime", () => {
      expect(screen.getByText("Final/OT")).toBeInTheDocument();
    });
  });

  describe("when a game ends in regulation", () => {
    beforeEach(() => {
      render(<FinalGameStatus endedInPeriod={3} gameType="RegularSeason" />);
    });

    it("should indicate that the game ended in regulation", () => {
      expect(screen.getByText("Final")).toBeInTheDocument();
    });
  });

  describe("when a playoff game ends in 2nd overtime", () => {
    beforeEach(() => {
      render(<FinalGameStatus endedInPeriod={5} gameType="Playoff" />);
    });

    it("should indicate that the game ended in 2nd overtime", () => {
      expect(screen.getByText("Final/2OT")).toBeInTheDocument();
    });
  });
});
