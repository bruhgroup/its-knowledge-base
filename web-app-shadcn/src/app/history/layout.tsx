import React from "react";

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={"container"}>
      <div className={"flex flex-col my-5 items-center gap-5"}>{children}</div>
    </section>
  );
}
