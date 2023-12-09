import { SessionProvider } from "@/components/auth-provider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beta list",
  description: "🚀 Accelerating tool launches & beta testing for solopreneurs.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className="bg-dark-main text-white">
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
