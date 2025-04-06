import React, { useContext } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AdminContext } from "../../context/AdminContext";

const DepartmentChart = () => {
  const { departments } = useContext(AdminContext);
  const chartData = departments.map((department) => ({
    name: department.departmentName,
    value: department.employeeCount,
  }));

  const COLORS = [
    "#00C49F",
    "#FF8042",
    "#8e44ad",
    "#ff6347",
    "#2f4f4f",
    "#d2691e",
    "#ff1493",
    "#20b2aa",
    "#ffd700",
    "#ff4500",
    "#b8860b",
    "#556b2f",
  ];

  return (
    <div className="w-full flex justify-center items-center text-xs sm:text-base">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={85}
            innerRadius={60}
            paddingAngle={5}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
           
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepartmentChart;
