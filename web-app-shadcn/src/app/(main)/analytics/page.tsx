import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

import { statsMessageRatings } from "@/lib/prisma/queries/messageRating";
import GeneratedCharts, {
  LabelAndData,
} from "@/components/analytics/GeneratedCharts";
import { useServerSession } from "@/lib/authOptions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLatestQuestions } from "@/lib/prisma/queries/chatSessions";
import QuestionsRows from "@/components/analytics/QuestionsRows";

const ratingLookup: { [key: number]: string } = {
  0: "downvote",
  1: "upvote",
};

export default async function AnalyticsPage() {
  const session = await useServerSession();

  // Non-admins are not able to view this page.
  if (session?.user?.role !== UserRole.ADMIN) {
    return redirect("/");
  }

  const [ratings, questions] = await Promise.all([
    statsMessageRatings(),
    getLatestQuestions(5),
  ]);

  return (
    <>
      <h1 className={"text-center font-bold text-3xl pb-3"}>Analytics</h1>
      <div className={"flex flex-col gap-4"}>
        <GeneratedCharts
          ratings={ratings.reduce(
            (accumulator, { _count, rating }) => {
              accumulator.labels.push(
                rating == null ? "no vote" : ratingLookup[rating],
              );
              accumulator.data.push(_count);
              return accumulator;
            },
            { labels: [], data: [] } as LabelAndData,
          )}
        />
        <div className={"border border-gray-400 rounded-xl shadow-lg p-3"}>
          <h1 className={"text-center font-bold"}>Recent Questions</h1>
          <Table>
            <TableCaption>Showing last 5 questions asked</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">User ID</TableHead>
                <TableHead>Session ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Question</TableHead>
                <TableHead className="text-right">View Session</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <QuestionsRows questions={questions} />
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
