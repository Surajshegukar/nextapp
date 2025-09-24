// app/userlist/page.tsx

import { Metadata } from 'next';
import UserList from './userlist';


export const metadata: Metadata = {
  title: "User List | Admin Panel",
  description: "View and manage all registered users in the system.",
  keywords: ["User List", "Admin Panel", "Next.js", "User Management"],
  openGraph: {
    title: "User List",
    description: "Browse and manage users with role-based access.",
    url: "https://yourdomain.com/userlist",
    siteName: "Your App Name",
    images: [
      {
        url: "https://yourdomain.com/og-userlist.png",
        width: 1200,
        height: 630,
        alt: "User List Overview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function Page() {
  return (
 
      <UserList />

  );
}