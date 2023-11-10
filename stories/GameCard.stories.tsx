import type { Meta, StoryObj } from "@storybook/react";
import { GameCard } from "~/components/GameCard";
import {
  createFinalGame,
  createLiveGame,
  createScheduledGame,
  createTeam,
} from "~/data/mocks";

const meta: Meta<typeof GameCard> = {
  component: GameCard,
  decorators: [
    (Story) => (
      <div className="grid grid-cols-auto-fill gap-5">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof GameCard>;

const homeTeam = createTeam({ record: "10-2-1" });
const awayTeam = createTeam({
  abbreviation: "SEA",
  name: "Kraken",
  record: "5-6-3",
  id: 55,
});
const senators = createTeam({
  abbreviation: "OTT",
  name: "Senators",
  record: "",
  id: 9,
});

const scheduledGame = createScheduledGame({
  startTime: new Date().toISOString(),
  homeTeam,
  awayTeam,
});

const liveGame = createLiveGame({
  homeTeam,
  awayTeam,
  gameStats: {
    awayTeam: {
      sog: 5,
      score: 0,
    },
    homeTeam: {
      sog: 10,
      score: 2,
    },
  },
});

const finishedGame = createFinalGame({
  awayTeam: homeTeam,
  homeTeam: senators,
  id: 2023020197,
  gameStats: {
    homeTeam: {
      score: 2,
      sog: 30,
    },
    awayTeam: {
      score: 5,
      sog: 16,
    },
  },
});

export const ScheduledGame: Story = {
  args: {
    game: scheduledGame,
  },
};

export const LiveGame: Story = {
  args: {
    game: liveGame,
  },
};

export const FinishedGame: Story = {
  args: {
    game: finishedGame,
  },
};
