import React from "react";
import ReactApexChart from "react-apexcharts";

const AdminUsageChart = ({ data }) => {
  if (!data) return null;

  // Get all unique contact names
  const allNames = [
    ...new Set(
      data.flatMap(group =>
        group.contacts.map(contact => contact.name)
      )
    ),
  ];

  // Prepare series by type
  const series = data.map(group => {
    const usageMap = {};

    // Map contact usage by name
    group.contacts.forEach(contact => {
      usageMap[contact.name] = contact.totalUsed;
    });

    return {
      name: group.type.replace("new_", "").toUpperCase(),
      data: allNames.map(name => usageMap[name] || 0),
    };
  });

  const options = {
    chart: {
      type: "bar",
      height: 500,
      toolbar: { show: false },
    },
    title: {
      text: "Admin AI Contacts Usage By Type",
      align: "left",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
      },
    },
    xaxis: {
      categories: allNames,
      labels: {
        rotate: -40,
        trim: true,
      },
    },
    yaxis: {
      title: {
        text: "Usage Count",
      },
    },
    legend: {
      position: "top",
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={500}
      />
    </div>
  );
};

export default AdminUsageChart;