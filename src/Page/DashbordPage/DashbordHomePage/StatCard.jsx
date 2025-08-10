import { TrendingUp, TrendingDown } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, color, change, className = "" }) => {
  const isPositive = change >= 0;
  return (
    <div className={`bg-white  rounded-lg p-4 flex flex-col gap-2 `}>
      <div className="flex items-center justify-between">
        <div className="text-gray-500 text-sm">{title}</div>
        <div
          className={`flex items-center text-sm font-medium ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {Math.abs(change).toFixed(2)}%
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className={`text-xl font-bold ${color} ${className} font-bold `}>{value}</div>
      </div>
      <div className="flex justify-end">
        <Icon size={32} className={color} />
      </div>
    </div>
  );
};

export default StatCard;
