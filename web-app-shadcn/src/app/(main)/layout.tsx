import { Inter } from "next/font/google";
import React from "react";
import NavigationMenu from "@/components/NavigationMenu";
import AuthProvider from "@/components/authentication/AuthProvider";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useServerSession } from "@/lib/authOptions";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await useServerSession();

  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <div className="flex h-20 items-center px-4 bg-green-900 overflow-y-scroll">
            <NavigationMenu />
            {session ? (
              <Link
                href="/auth/logout?callbackUrl=/"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "text-md ml-auto flex items-center text-white hover:underline",
                )}
              >
                Logout
              </Link>
            ) : (
              <Link
                href="/auth/login?callbackUrl=/"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "text-md ml-auto flex items-center text-white hover:underline",
                )}
              >
                Login
              </Link>
            )}
          </div>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
