import { Inter } from "next/font/google";
import React from "react";
import NavigationMenu from "@/components/navigation/NavigationMenu";
import AuthProvider from "@/components/authentication/AuthProvider";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useServerSession } from "@/lib/authOptions";
import { LogoutButton } from "@/components/authentication/LogoutButton";

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
          <div className="flex h-20 items-center px-4 bg-green-900 overflow-auto">
            <NavigationMenu />
            {session ? (
              <LogoutButton
                className={
                  "text-md ml-auto flex items-center text-white hover:underline"
                }
              />
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
