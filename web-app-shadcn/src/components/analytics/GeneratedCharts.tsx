"use client";

import { Bar, Pie } from "react-chartjs-2";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import {
  generateBarChartData,
  generatePieChartData,
  LabelsAndData,
} from "@/lib/analytics/generateChartData";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

export default function GeneratedCharts({
  ratings,
  elapsedTimes,
}: {
  ratings: LabelsAndData;
  elapsedTimes: LabelsAndData;
}) {
  return (
    <div
      className={
        "grid sm:grid-cols-3 sm:grid-rows-1 grid-col-1 grid-rows-3 gap-4"
      }
    >
      <div className={"border border-gray-400 rounded-xl shadow-lg p-3"}>
        <h1 className={"text-center font-bold"}>Message Ratings</h1>
        <Pie data={generatePieChartData("rating", ratings)} />
      </div>
      <div
        className={"col-span-2 border border-gray-400 rounded-xl shadow-lg p-3"}
      >
        <h1 className={"text-center font-bold"}>Time Elapsed per Session</h1>
        <Bar
          data={generateBarChartData("Chat Sessions", elapsedTimes)}
          options={{
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Time Elapsed (minutes)",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Messages Count",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
