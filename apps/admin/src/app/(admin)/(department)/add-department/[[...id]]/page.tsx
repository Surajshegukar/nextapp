import AddDepartmentForm from "./add-department";

 


export const metadata = {
  title: "Add User | Admin Panel",
  description: "Create new user with roles, credentials, and profile details.",
  keywords: ["Next.js", "User Management", "Admin Panel", "React Form"],
  authors: [{ name: "Suraj" }],
  openGraph: {
    title: "Add User",
    description: "Securely onboard new user with role-based access.",
    url: "https://yourdomain.com/add-user",
    siteName: "Your App Name",
    images: [
      {
        url: "https://yourdomain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Add User Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <AddDepartmentForm />;
}