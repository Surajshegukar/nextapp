import AddPodcastForm from "./add-podcast";

 


export const metadata = {
  title: "Add Podcast | Admin Panel",
  description: "Create new user with roles, credentials, and profile details.",
  keywords: ["Next.js", "Podcast Management", "Admin Panel", "React Form"],
  authors: [{ name: "Suraj" }],
  openGraph: {
    title: "Add Podcast",
    description: "Securely onboard new user with role-based access.",
    url: "https://yourdomain.com/add-user",
    siteName: "Your App Name",
    images: [
      {
        url: "https://yourdomain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Add Podcast Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <AddPodcastForm />;
}