import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DirectoryNavigator({
  userId,
  sessionId,
}: {
  userId: string;
  sessionId?: string;
}) {
  return (
    <div
      className={
        "flex w-full p-2 rounded border-green-200 border-2 items-center"
      }
    >
      <Link
        className={cn(buttonVariants({ variant: "ghost" }))}
        href={"/history"}
      >
        history
      </Link>
      <ChevronRight />
      <Link
        className={cn(
          buttonVariants({ variant: "ghost" }),
          userId && !sessionId && "underline underline-offset-2",
        )}
        href={`/history/${userId}`}
      >
        view sessions
      </Link>
      {sessionId && (
        <>
          <ChevronRight />
          <Link
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "underline underline-offset-2",
            )}
            href={`/history/${userId}/${sessionId}`}
          >
            view messages
          </Link>
        </>
      )}
    </div>
  );
}
