import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ScheduleGame } from "~/api/types";
import { useRevalidateOnInterval } from "./useRevalidateOnInterval";
import { useRevalidateOnVisible } from "./useRevalidateOnVisible";

const WAIT = 10000;

type Options = {
  readonly route: string;
  readonly preloadedGames: ScheduleGame[];
};

export const useGames = ({ route, preloadedGames }: Options) => {
  const fetcher = useFetcher<ScheduleGame[]>();
  const [games, setGames] = useState(preloadedGames);
  const revalidate = () => {
    if (preloadedGames.some((g) => g.status.abstractGameState === "Live")) {
      fetcher.load(route);
    }
  };
  useEffect(() => {
    if (fetcher.data) {
      setGames(fetcher.data);
    }
  }, [fetcher.data]);

  useRevalidateOnVisible(revalidate);
  useRevalidateOnInterval({ interval: WAIT, revalidateCallback: revalidate });
  useEffect(() => {
    setGames(preloadedGames);
  }, [route, preloadedGames]);

  return games;
};
