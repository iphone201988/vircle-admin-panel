import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import MonthlyRevenueChart from "./MonthlyRevenueChart";
import { getAnalyticsInsights } from "../../utils";
import Loader from "../Loader";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  CandlestickController,
  CandlestickElement,
} from "chartjs-chart-financial";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  CandlestickController,
  CandlestickElement
);

const Overview = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getAnalyticsInsights();
      setData(res.data);
      setLoading(false);
    })();
  }, []);

  const month = data?.userGrowth?.map((item) => item.month);

  const userDataSet = data?.userGrowth?.map((item) => item.user);
  const aiDataSet = data?.userGrowth?.map((item) => item.aiContact);
  const lineData = {
    labels: month,
    datasets: [
      {
        label: "User Growth",
        data: userDataSet,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const aiGrowthData = {
    labels: month,
    datasets: [
      {
        label: "AI Contact Growth",
        data: aiDataSet,
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4">
        Dashboard Overview
      </h1>

      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-base sm:text-lg font-medium">Total Users</h2>
              <p className="text-xl sm:text-2xl font-bold">
                {data?.totalUsers}
              </p>
              {data?.userPercentageFromLastMonth !== undefined && (
                <p
                  className={`text-sm ${
                    data.userPercentageFromLastMonth < 0
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {data.userPercentageFromLastMonth > 0 ? "+" : ""}
                  {data.userPercentageFromLastMonth}% from last month
                </p>
              )}
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-base sm:text-lg font-medium">
                Total AI Contacts
              </h2>
              <p className="text-xl sm:text-2xl font-bold">
                {data?.totalAiContacts}
              </p>
              {data?.aiPercentageFromLastMonth !== undefined && (
                <p
                  className={`text-sm ${
                    data.aiPercentageFromLastMonth < 0
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {data.aiPercentageFromLastMonth > 0 ? "+" : ""}
                  {data.aiPercentageFromLastMonth}% from last month
                </p>
              )}
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-base sm:text-lg font-medium">Revenue</h2>
              <p className="text-xl sm:text-2xl font-bold">$5,000</p>
            </div>
          </div>

          {/* Line Charts */}
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="flex-1 bg-white p-4 rounded shadow">
              <h2 className="text-base sm:text-lg font-medium mb-2 sm:mb-4">
                User Growth Over Time
              </h2>
              <div className="relative w-full h-64 sm:h-72 md:h-80">
                <Line data={lineData} options={lineOptions} />
              </div>
            </div>
            <div className="flex-1 bg-white p-4 rounded shadow">
              <h2 className="text-base sm:text-lg font-medium mb-2 sm:mb-4">
                AI Contact Growth Over Time
              </h2>
              <div className="relative w-full h-64 sm:h-72 md:h-80">
                <Line data={aiGrowthData} options={lineOptions} />
              </div>
            </div>
          </div>

          {/* Monthly Revenue Chart */}
          <div className="bg-white p-4 rounded shadow">
            <MonthlyRevenueChart />
          </div>
        </>
      )}
    </div>
  );
};

export default Overview;
