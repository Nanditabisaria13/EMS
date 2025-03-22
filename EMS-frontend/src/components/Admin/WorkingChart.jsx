import React, { useContext, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AdminContext } from "../../context/AdminContext";

const WorkingChart = () => {
  const { allEmployees } = useContext(AdminContext);

  if (!allEmployees) {
    return <div></div>;
  }
  const Onsite = allEmployees.filter((item) => item.workingType === "Onsite");
  const Remote = allEmployees.filter((item) => item.workingType === "Remote");
  const Hybrid = allEmployees.filter((item) => item.workingType === "Hybrid");

  // Data for the Pie chart
  const data = [
    { name: "On-Site", value: Onsite.length },
    { name: "Remote", value: Remote.length },
    { name: "Hybrid", value: Hybrid.length },
  ];
  const COLORS = ["#00C49F", "#FF8042", "#8e44ad"];
  return (
    <div className="w-full flex justify-center items-center text-xs sm:text-base">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkingChart;
