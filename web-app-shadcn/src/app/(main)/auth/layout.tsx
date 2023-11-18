import { Metadata } from "next";
import Image from "next/image";
import itsLogo from "@/public/itsLogo.png";
import React from "react";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication to access other information",
};

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        {children}
      </div>
    </div>
  );
}
