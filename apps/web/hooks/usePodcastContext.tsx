import { createContext, useContext } from "react";
import { Podcast } from "@/app/functions/getPodcasts";

type PodcastContextType = {
  data: Podcast[];
  setData: React.Dispatch<React.SetStateAction<Podcast[]>>;
};

export const PodcastContext = createContext<PodcastContextType | null>(null);

export function usePodcastContext() {
  const podcastContext = useContext(PodcastContext);

  if (!podcastContext) {
    throw new Error(
      "usePodcastContext must be used within a PodcastContextProvider"
    );
  }

  return podcastContext;
}
