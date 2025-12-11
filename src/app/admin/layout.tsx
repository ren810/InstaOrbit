import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Admin Panel | InstaOrbit',
  description: 'Admin panel for InstaOrbit API testing and management',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
