import Link from "next/link";
import { getPodcasts } from "@/app/functions/getPodcasts";
import Image from "next/image";
import { slugify } from "@/app/functions/slugify";

export default async function PodcastsList() {
  const data = await getPodcasts();

  return (
    <div className="flex flex-col max-w-[95rem] w-full mx-auto py-12 md:py-48">
      {data.data.map((podcasts, index) => (
        <div key={podcasts.id}>
          <div className="grid grid-cols-1 md:grid-cols-[auto_auto] justify-between md:items-center gap-3 md:gap-0">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-16">
              <p className="font-semibold">{podcasts.id}</p>
              <Image
                className="w-[15rem] h-[15rem]"
                src={`http://localhost:3000/uploads/images/${podcasts.image}`}
                alt={podcasts.podcast_name}
                width={240}
                height={240}
              />
              <h2 className="heading3-title">{podcasts.podcast_name}</h2>
            </div>
            <div className="flex flex-col md:flex-row md:items-center flex-wrap gap-2">
              <p>{podcasts.publish_date}</p>
              <p>{podcasts.duration}</p>
              <Link className="flex gap-2" href={`podcasts/${slugify(podcasts.podcast_name)}`}>
                <span className="uppercase font-semibold">Listen</span>
                <img
                  src="/icons/ri_arrow-right-line.svg"
                  alt="An arrow pointing right"
                />
              </Link>
            </div>
          </div>
          {index < data.data.length - 1 && (
            <div className="border border-black my-6" />
          )}
        </div>
      ))}
    </div>
  );
}
