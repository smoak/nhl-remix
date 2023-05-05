import { createLiveGame, createScoringPlay } from "~/api/mocks";
import { normalizeScheduleGame } from "./normalization";

describe("normalization", () => {
  describe("#normalizeScheduleGame when missing players in the scoring play", () => {
    const game = createLiveGame({
      scoringPlays: [
        createScoringPlay({
          players: undefined,
        }),
      ],
    });
    let result: ReturnType<typeof normalizeScheduleGame>;

    beforeEach(() => {
      result = normalizeScheduleGame(game);
    });

    it("ignores the scoring play", () => {
      expect(result.scoringPlays).toHaveLength(0);
    });
  });
});
