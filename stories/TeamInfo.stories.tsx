import type { Meta, StoryObj } from "@storybook/react";

import { TeamInfo } from "~/components/TeamInfo";

const meta: Meta<typeof TeamInfo> = {
  component: TeamInfo,
};

export default meta;

type Story = StoryObj<typeof TeamInfo>;

export const Default: Story = {
  args: {
    isGoaliePulled: false,
    isOnPowerPlay: false,
    logoUrl: "https://assets.nhle.com/logos/nhl/svg/VAN_light.svg",
    teamName: "Canucks",
  },
};

export const PowerPlay: Story = {
  args: {
    isGoaliePulled: false,
    isOnPowerPlay: true,
    logoUrl: "https://assets.nhle.com/logos/nhl/svg/VAN_light.svg",
    teamName: "Canucks",
  },
};

export const EmptyNet: Story = {
  args: {
    isGoaliePulled: true,
    isOnPowerPlay: false,
    logoUrl: "https://assets.nhle.com/logos/nhl/svg/VAN_light.svg",
    teamName: "Canucks",
  },
};
