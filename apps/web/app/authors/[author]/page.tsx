import formatString from "@/app/functions/formatString";
import { getArticles } from "@/app/functions/getArticles";
import { getUsers, Magazine, User, UserType } from "@/app/functions/getUsers";
import { slugify } from "@/app/functions/slugify";
import PostNavigation from "@/components/PostNavigation";
import SocialSharing from "@/components/SocialSharing";
import Link from "next/link";



export async function generateMetadata({
  params,
}: {
  params: { author: string };
}) {
  const authors: UserType = await getUsers();

  const decodedAuthor = decodeURIComponent(params.author);

  const authorData = authors.data.find(
    (author: User) => slugify(author.full_name) === decodedAuthor
  );

  if (!authorData) {
    return {
      title: "Author Not Found",
    };
  }

  return {
    title: `${authorData.full_name} | Fyrre Magazine`,
  };
}

export default async function AuthorDetails({
  params,
}: {
  params: { author: string };
}) {
  try {
    const authors: UserType = await getUsers();

    const decodedAuthor = decodeURIComponent(params.author);

    const authorData = authors.data.find(
      (author: User) => slugify(author.full_name) === decodedAuthor
    );

    console.log(authorData)

    if (!authorData) {
      return <p>Author not found</p>;
    }

    return (
      <main className="max-w-[95rem] w-full mx-auto px-4 sm:pt-4 xs:pt-2 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2">
        <PostNavigation href="/authors">Author</PostNavigation>
        <article className="max-w-[75rem] w-full mx-auto grid lg:grid-cols-[300px_680px] gap-8 md:gap-6 justify-around">
          <div className="w-fit">
            <img src={`http://localhost:3000/uploads/images/${authorData.image}`} alt={authorData.full_name} />
            <div className="flex justify-between border-top border-t border-black mt-12 pt-6">
              <p className="uppercase font-semibold text-lg">Follow</p>
              <SocialSharing
                links={[
                  {
                    href: "#",
                    ariaLabel: "Visit our Instagram page",
                    src: "/icons/ri_instagram-line.svg",
                    alt: "Instagram logo",
                  },
                  {
                    href: "#",
                    ariaLabel: "Visit our Twitter page",
                    src: "/icons/ri_twitter-fill.svg",
                    alt: "Twitter logo",
                  },
                  {
                    href: "#",
                    ariaLabel: "Visit our YouTube page",
                    src: "/icons/ri_youtube-fill.svg",
                    alt: "YouTube logo",
                  },
                ]}
              />
            </div>
          </div>
          <article>
            <h1 className="text-subheading pb-8">{authorData.full_name}</h1>
            <p className="text-blog-summary pb-12">
              {authorData.short_description}
            </p>
             <div
              className="prose max-w-none" // Tailwind typography plugin (optional, for styling)
              dangerouslySetInnerHTML={{ __html: authorData.description }}
            />
            
          </article>
        </article>
        <div className="pb-12 md:pb-48">
          <h2 className="text-blog-subheading mt-[9.5rem] pt-12 pb-12 md:pb-24">
            Articles by {authorData.full_name}
          </h2>
          <AuthorArticles articles={authorData.Magazine} />
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching author details:", error);
    return <p>Error fetching author details</p>;
  }
}

function AuthorArticles({ articles }: { articles: Magazine[] }) {
  return (
    <div className="grid md:grid-cols-2 border border-black border-collapse">
      {articles?.map((article, index) => (
        <article
          className="flex items-center gap-2 md:gap-12 p-8 border border-black"
          key={index}
        >
          <Link href={`/magazine/${slugify(article.magazine_name)}`}>
            <img
              className="h-[9.375rem] w-[9.375rem] hover:scale-105 transition"
              src={`http://localhost:3000/uploads/images/${article.image}`}
              alt={article.magazine_name}
            />
          </Link>
          <div>
            <p className="heading3-title pb-4">
              <Link href={`/magazine/${slugify(article.magazine_name)}`}>{article.magazine_name}</Link>
            </p>
            <div className="flex gap-8">
              <span className="flex">
                <p className="font-semibold pr-2">Date</p>
                <time dateTime={article.publish_date}>{article.publish_date}</time>
              </span>
              <span className="flex">
                <p className="font-semibold pr-2">City</p>
                <p className="">{article.category.category_name}</p>
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
