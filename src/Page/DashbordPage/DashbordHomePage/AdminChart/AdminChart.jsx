import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Map from '../../../../assets/bangladeshHigh.svg';

const AdminChart = ({ revenueChartData }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 bg-white p-2 rounded-md h-full">
        <nav className="flex items-center justify-between py-4 border-b border-gray-200 mb-4">
          <h2 className="text-lg font-semibold font-rubik text-gray-800">
            Statistical Report
          </h2>
        </nav>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueChartData}>
              <CartesianGrid stroke="#f0f0f0" />
              <XAxis dataKey="carModel" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="price" fill="#8884d8" />
              <Bar dataKey="status" fill="#82ca9d" />
              <Bar dataKey="userName" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-2 rounded-md lg:col-span-1">
          <nav className="flex items-center justify-between py-4 border-b border-gray-200 mb-4">
          <h2 className="text-lg font-semibold font-rubik text-gray-800">
           Locations
          </h2>
        </nav>
        <img src={'https://static.vecteezy.com/system/resources/previews/034/992/069/large_2x/isolated-illustration-of-simplified-administrative-map-of-bangladesh-borders-and-names-of-the-regions-black-line-silhouettes-vector.jpg'} alt="Bangladesh Map" className="h-80 w-full object-contain" />
      
      </div>
    </div>
  );
};

export default AdminChart;
