import React from "react";

export default function ChatboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
