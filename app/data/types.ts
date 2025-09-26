import type { Game, TeamRecords } from "~/components/types";

export type Schedule = {
  readonly games: Game[];
  readonly teamRecords: TeamRecords;
};

export type RootLoaderResponse = {
  readonly hasPlayoffs: boolean;
};
