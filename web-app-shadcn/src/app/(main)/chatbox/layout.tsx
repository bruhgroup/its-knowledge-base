import React from "react";

export default function ChatboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={"container py-5"}>{children}</section>;
}
