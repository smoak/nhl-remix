import { ScheduleGame } from "~/types";
import { getGamesByDate } from ".";

describe("api", () => {
  describe(".getGamesByDate", () => {
    describe("when no date is provided", () => {
      let games: ScheduleGame[];

      beforeEach(async () => {
        games = await getGamesByDate();
      });

      it("should return the games", () => {
        expect(games).toHaveLength(13);
      });
    });

    describe("when a date is provided", () => {
      let games: ScheduleGame[];

      beforeEach(async () => {
        games = await getGamesByDate("2022-04-27");
      });

      it("should return the games", () => {
        expect(games).toHaveLength(5);
      });
    });
  });
});
