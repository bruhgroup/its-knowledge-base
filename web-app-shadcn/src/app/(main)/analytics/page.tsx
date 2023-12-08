import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

import { statsMessageRatings } from "@/lib/prisma/queries/messageRating";
import { useServerSession } from "@/lib/authOptions";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getLatestQuestions,
  getSessionElapsedTimes,
} from "@/lib/prisma/queries/chatSessions";
import QuestionsRows from "@/components/analytics/QuestionsRows";
import GeneratedCharts from "@/components/analytics/GeneratedCharts";
import { LabelsAndData } from "@/lib/analytics/generateChartData";

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

  const [ratings, questions, elapsedTimes] = await Promise.all([
    statsMessageRatings(),
    getLatestQuestions(5),
    getSessionElapsedTimes(),
  ]);

  // Accumulate the count of times each session has taken.
  const accumulateElapsedTimes = elapsedTimes.reduce(
    (accumulator: { [key: string]: number }, number) => {
      if (number == null) return accumulator;
      const half_minute = Math.floor(number / 30);
      accumulator[half_minute] = (accumulator[half_minute] || 0) + 1;
      return accumulator;
    },
    {},
  );

  // Sort the elapsed times in order
  const sortedElapsedTimeKeys = Object.keys(accumulateElapsedTimes).sort(
    (a, b) => Number(a) - Number(b),
  );

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
            { labels: [], data: [] } as LabelsAndData,
          )}
          elapsedTimes={sortedElapsedTimeKeys.reduce(
            (accumulator, key) => {
              accumulator.labels.push(String(key));
              accumulator.data.push(accumulateElapsedTimes[key]);
              return accumulator;
            },
            { labels: [], data: [] } as LabelsAndData,
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
