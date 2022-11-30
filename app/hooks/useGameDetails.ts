import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { Game } from "~/components/types";
import { isLiveGame } from "~/components/types";
import { useRevalidateOnInterval } from "./useRevalidateOnInterval";
import { useRevalidateOnVisible } from "./useRevalidateOnVisible";

const WAIT = 10000;

type Options = {
  readonly route: string;
  readonly preloadedGame: Game;
};

export const useGameDetails = ({ route, preloadedGame }: Options) => {
  const fetcher = useFetcher<Game>();
  const [game, setGame] = useState(preloadedGame);
  const revalidate = () => {
    if (isLiveGame(preloadedGame)) {
      fetcher.load(route);
    }
  };
  useEffect(() => {
    if (fetcher.data) {
      setGame(fetcher.data);
    }
  }, [fetcher.data]);

  useRevalidateOnVisible(revalidate);
  useRevalidateOnInterval({ interval: WAIT, revalidateCallback: revalidate });
  useEffect(() => {
    setGame(preloadedGame);
  }, [route, preloadedGame]);

  return game;
};
