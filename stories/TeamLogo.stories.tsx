import type { Meta, StoryObj } from "@storybook/react";

import { TeamLogo } from "~/components/TeamLogo";

const meta: Meta<typeof TeamLogo> = {
  component: TeamLogo,
  argTypes: {
    teamId: {
      options: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
        22, 23, 24, 25, 26, 28, 29, 30, 52, 53, 54, 55,
      ],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TeamLogo>;

export const Default: Story = {
  args: {
    size: 48,
    teamAbbreviation: "VAN",
    teamId: 23,
  },
};
