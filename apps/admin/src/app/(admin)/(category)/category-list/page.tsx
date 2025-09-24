import CategoryList from "./category-list";

export const metadata = {
  title: "Category List | Admin Panel",
  description: "Create new user with roles, credentials, and profile details.",
  keywords: ["Next.js", "Category Management", "Admin Panel", "React Form"],
  authors: [{ name: "Suraj" }],
  openGraph: {
    title: "Category List",
    description: "Securely onboard new user with role-based access.",
    url: "https://yourdomain.com/add-user",
    siteName: "Your App Name",
    images: [
      {
        url: "https://yourdomain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Category List Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <CategoryList />;
}