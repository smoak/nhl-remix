import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { GameDetails } from "~/components/types";
import { isLiveGame } from "~/components/types";
import { useRevalidateOnInterval } from "./useRevalidateOnInterval";
import { useRevalidateOnVisible } from "./useRevalidateOnVisible";

const WAIT = 10000;

type Options = {
  readonly route: string;
  readonly preloadedGameDetails: GameDetails;
};

export const useGameDetails = ({ route, preloadedGameDetails }: Options) => {
  const fetcher = useFetcher<GameDetails>();
  const [gameDetails, setGameDetails] = useState(preloadedGameDetails);
  const revalidate = () => {
    if (isLiveGame(preloadedGameDetails.game)) {
      fetcher.load(route);
    }
  };
  useEffect(() => {
    if (fetcher.data) {
      setGameDetails(fetcher.data);
    }
  }, [fetcher.data]);

  useRevalidateOnVisible(revalidate);
  useRevalidateOnInterval({ interval: WAIT, revalidateCallback: revalidate });
  useEffect(() => {
    setGameDetails(preloadedGameDetails);
  }, [route, preloadedGameDetails]);

  return gameDetails;
};
