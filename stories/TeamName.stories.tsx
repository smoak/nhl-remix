import type { Meta, StoryObj } from "@storybook/react";

import { TeamName } from "~/components/TeamName";

const meta: Meta<typeof TeamName> = {
  component: TeamName,
};

export default meta;

type Story = StoryObj<typeof TeamName>;

export const Default: Story = {
  args: {
    isGoaliePulled: false,
    isOnPowerPlay: false,
    name: "Canucks",
  },
};
