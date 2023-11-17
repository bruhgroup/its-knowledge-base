import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { UserAuthForm } from "@/components/authentication/UserAuthForm";
import itsLogo from "@/public/itsLogo.png";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <div
      className={
        "h-screen w-full grid lg:grid-cols-2 lg:grid-rows-1 grid-cols-1 grid-rows-2 justify-items-center items-center"
      }
    >
      <div
        className={
          "bg-slate-900 h-full w-full flex justify-center items-center"
        }
      >
        <Image src={itsLogo} alt={"its-logo"} />
      </div>
      <div className="flex flex-col justify-center h-1/2 lg:w-1/2 md:3/4 space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground">
            Log in using your Google account
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
