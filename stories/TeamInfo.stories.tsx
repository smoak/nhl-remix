import type { Meta, StoryObj } from "@storybook/react";

import { TeamInfo } from "~/components/TeamInfo";

const meta: Meta<typeof TeamInfo> = {
  component: TeamInfo,
};

export default meta;

type Story = StoryObj<typeof TeamInfo>;

export const Default: Story = {
  args: {
    isGameInProgress: false,
    isGoaliePulled: false,
    isOnPowerPlay: false,
    teamAbbrev: "VAN",
    teamName: "Canucks",
  },
};

export const PowerPlay: Story = {
  args: {
    isGameInProgress: true,
    isGoaliePulled: false,
    isOnPowerPlay: true,
    teamAbbrev: "VAN",
    teamName: "Canucks",
  },
};

export const EmptyNet: Story = {
  args: {
    isGameInProgress: true,
    isGoaliePulled: true,
    isOnPowerPlay: false,
    teamAbbrev: "VAN",
    teamName: "Canucks",
  },
};
