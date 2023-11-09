import { getGamesByDate } from "./index";
import type { ScheduleGame } from "./types";

describe("api", () => {
  describe(".getGamesByDate", () => {
    describe("when a date is provided", () => {
      let games: ScheduleGame[];

      beforeEach(async () => {
        games = await getGamesByDate("2022-04-27");
      });

      it("should return the games", () => {
        expect(games).toHaveLength(5);
      });
    });

    describe("when there are no games scheduled", () => {
      let games: ScheduleGame[];

      beforeEach(async () => {
        games = await getGamesByDate("2023-09-07");
      });

      it("should return an empty array", () => {
        expect(games).toHaveLength(0);
      });
    });
  });
});
