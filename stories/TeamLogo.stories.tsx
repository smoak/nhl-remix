import type { Meta, StoryObj } from "@storybook/react";

import { TeamLogo } from "~/components/TeamLogo";

const meta: Meta<typeof TeamLogo> = {
  component: TeamLogo,
  argTypes: {
    teamAbbreviation: {
      options: [
        "ANA",
        "ARI",
        "BOS",
        "BUF",
        "CAR",
        "CBJ",
        "CGY",
        "CHI",
        "COL",
        "DAL",
        "DET",
        "EDM",
        "FLA",
        "LAK",
        "MIN",
        "MTL",
        "NJD",
        "NSH",
        "NYI",
        "NYR",
        "OTT",
        "PHI",
        "PIT",
        "SEA",
        "SJS",
        "STL",
        "TBL",
        "TOR",
        "VAN",
        "VGK",
        "WPG",
        "WSH",
      ],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TeamLogo>;

export const Default: Story = {
  args: {
    teamAbbreviation: "VAN",
    teamName: "Canucks",
  },
};
