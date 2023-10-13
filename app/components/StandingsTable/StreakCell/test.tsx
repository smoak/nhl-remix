import { render, screen } from "@testing-library/react";
import { StreakCell } from ".";
import type { TeamRecord } from "~/api/types";

describe("StreakCell", () => {
  describe("when rendered without a streak", () => {
    beforeEach(() => {
      render(
        <table>
          <tbody>
            <tr>
              <StreakCell streak={undefined} />
            </tr>
          </tbody>
        </table>
      );
    });

    it("should render dashes", () => {
      expect(screen.getByText("--")).toBeInTheDocument();
    });
  });

  describe("when rendered with a streak", () => {
    const streak: TeamRecord["streak"] = {
      streakCode: "W1",
      streakNumber: 1,
      streakType: "wins",
    };

    beforeEach(() => {
      render(
        <table>
          <tbody>
            <tr>
              <StreakCell streak={streak} />
            </tr>
          </tbody>
        </table>
      );
    });

    it("should render the streak code", () => {
      expect(screen.getByText("W1")).toBeInTheDocument();
    });
  });
});
