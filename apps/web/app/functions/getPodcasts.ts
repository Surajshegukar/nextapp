export type PodcastType = {
  success: boolean;
  message: string;
  data: Podcast[]
};

export type Podcast ={

      id: number;
      podcast_name: string;
      image: string;
      publish_date: string;
      duration: string;
      description:string;
    }


export async function getPodcasts(): Promise<PodcastType> {
  const res = await fetch("http://localhost:3000/api/podcast/get-active-podcast");

  if (!res.ok) {
    throw new Error("Failed to fetch podcast data");
  }

  return res.json();
}
