import React from "react";
import ReactApexChart from "react-apexcharts";

const MonthlyGrowthChart = ({ data }) => {
  // Full 12 months order
  const allMonths = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Map API data to object for quick lookup
  const growthMap = {};
  data?.userGrowth?.forEach(item => {
    growthMap[item.month] = item;
  });

  // Prepare series data for all 12 months
  const userData = allMonths.map(month => growthMap[month]?.user || 0);
  const aiContactData = allMonths.map(month => growthMap[month]?.aiContact || 0);

  const series = [
    {
      name: "Users",
      data: userData,
    },
    {
      name: "AI Contacts",
      data: aiContactData,
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },
    title: {
      text: "Monthly Growth (Users & AI Contacts)",
      align: "left",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        borderRadius: 6,
      },
    },
    xaxis: {
      categories: allMonths,
    },
    yaxis: {
      title: {
        text: "Count",
      },
    },
    colors: ["#3b82f6", "#10b981"],
    legend: {
      position: "top",
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default MonthlyGrowthChart;