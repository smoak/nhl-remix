import { ScheduleGame } from "~/api/types";
import { getGamesByDate } from "./index";

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

    describe("when there are no games scheduled", () => {
      let games: ScheduleGame[];

      beforeEach(async () => {
        games = await getGamesByDate("2022-04-30");
      });

      it("should return an empty array", () => {
        expect(games).toHaveLength(0);
      });
    });
  });
});
