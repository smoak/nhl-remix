import type { Meta, StoryObj } from "@storybook/react";

import { TeamLogo } from "~/components/TeamLogo";

const meta: Meta<typeof TeamLogo> = {
  component: TeamLogo,
};

export default meta;

type Story = StoryObj<typeof TeamLogo>;

export const Default: Story = {
  args: {
    teamName: "Canucks",
    logoUrl: "https://assets.nhle.com/logos/nhl/svg/VAN_light.svg",
  },
};
