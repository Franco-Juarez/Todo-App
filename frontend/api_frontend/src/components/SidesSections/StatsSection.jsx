import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { ChartColumn, Users, Star } from "lucide-react";
import { useState } from "react";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StatsSection = () => {

  const [tasksByDay, setTasksByDay] = useState([2, 1, 5, 8, 4, 1, 2]);
  
  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Tasks Created",
        data: tasksByDay,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ["Completed", "Waiting"],
    datasets: [
      {
        data: [4, 5],
        backgroundColor: ["#4caf50", "#f44336"],
        hoverBackgroundColor: ["#66bb6a", "#e57373"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="lg:col-span-3 lg:row-span-2 lg:col-start-10 bg-gray-100 shadow-md rounded-md p-4 flex flex-col gap-4">
      {/* Header */}
      <header className="bg-gray-200 flex gap-2 justify-between items-center py-2 px-3 rounded-md">
        <h4 className="text-xl font-bold">Stats</h4>
        <span className="bg-violet-600 text-white p-2 rounded-full">
          <ChartColumn />
        </span>
      </header>

      {/* Pie Chart */}
      <div className="bg-white p-4 rounded-md shadow-md">
      <h4 className="text-left font-bold text-lg mb-2">Tasks Overview</h4>
      <Pie data={pieData} />
    </div>

      {/* Bar Chart */}
      <div className="bg-white p-4 rounded-md shadow-md">
        <h4 className="text-left font-bold text-lg mb-2">Tasks by Creation Day</h4>
        <Bar
          data={barData}
          options={{
            responsive: true,
            plugins: { legend: { position: "bottom" } },
            scales: {
              y: { beginAtZero: true },
            },
          }}
        />
      </div>
      
      {/* Additional Stats */}
      <div className="flex flex-col gap-4">
        <h4 className="text-left font-bold text-xl">Additional Info</h4>
        <div className="flex text-left items-center gap-3 bg-blue-100 p-3 rounded-md shadow-sm">
          <span className="bg-blue-500 text-white p-2 rounded-full">
            <Users />
          </span>
          <div>
            <p className="text-lg font-semibold">Team Members</p>
            <span className="text-gray-700 text-sm">8 active members</span>
          </div>
        </div>
        <div className="flex text-left items-center gap-3 bg-yellow-100 p-3 rounded-md shadow-sm">
          <span className="bg-yellow-500 text-white p-2 rounded-full">
            <Star />
          </span>
          <div>
            <p className="text-lg font-semibold">Top Priority Tasks</p>
            <span className="text-gray-700 text-sm text-left">5 tasks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
