import formatString from "@/app/functions/formatString";
import Link from "next/link";
import { UserType, getUsers } from "@/app/functions/getUsers";
import Image from "next/image";
import { slugify } from "@/app/functions/slugify";

export default async function AuthorsList() {
  const data: UserType = await getUsers();
  console.log(data);

  return (
    <div className="flex flex-col max-w-[95rem] w-full mx-auto py-8 lg:pt-24 lg:pb-48">
      {data.data.map((authors, index) => (
        <div key={authors.id}>
          <article className="flex flex-col md:flex-row justify-between md:items-center gap-2 md:gap-0">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-16">
              <Image
                className="h-[9.375rem] w-[9.375rem]"
                src={`http://localhost:3000/uploads/images/${authors.image}`}
                alt={authors.full_name}
                width={150}
                height={150}
              />
              <h2 className="heading3-title">{authors.full_name}</h2>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-24">
              <div className="flex gap-2">
                <p className="font-semibold">Job</p>
                <p>{authors.job}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold">City</p>
                <p>{authors.city}</p>
              </div>
              <Link
                className="flex gap-2"
                href={`authors/${slugify(authors.full_name)}`}
              >
                <span className="uppercase font-semibold">About</span>
                <img
                  src="/icons/ri_arrow-right-line.svg"
                  alt="An arrow pointing right"
                />
              </Link>
            </div>
          </article>
          {index < data.data.length - 1 && (
            <div className="border border-black my-6" />
          )}
        </div>
      ))}
    </div>
  );
}
