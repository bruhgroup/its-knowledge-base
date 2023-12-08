"use client";

import { Pie } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export type LabelAndData = { labels: String[]; data: Number[] };
const data = (label: string, labels: String[], data: Number[]) => ({
  labels,
  datasets: [
    {
      label,
      data,
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 2,
    },
  ],
});

export default function GeneratedCharts({
  ratings,
}: {
  ratings: LabelAndData;
}) {
  return (
    <div
      className={
        "grid sm:grid-cols-3 sm:grid-rows-1 grid-col-1 grid-rows-3 gap-4"
      }
    >
      <div className={"border border-gray-400 rounded-xl shadow-lg p-3"}>
        <h1 className={"text-center font-bold"}>Message Ratings</h1>
        <Pie data={data("rating", ratings.labels, ratings.data)} />
      </div>
      <div className={"border border-gray-400 rounded-xl shadow-lg p-3"}>
        <h1 className={"text-center font-bold"}>Message Ratings</h1>
        <Pie data={data("What", ratings.labels, ratings.data)} />
      </div>
      <div className={"border border-gray-400 rounded-xl shadow-lg p-3"}>
        <h1 className={"text-center font-bold"}>Message Ratings</h1>
        <Pie data={data("What", ratings.labels, ratings.data)} />
      </div>
    </div>
  );
}
