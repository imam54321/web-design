import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string ;
  change?: string;
  color?: string;
  icon?: ReactNode;
}

const Card: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  color = "bg-gray-200",
  icon,
}) => {
  const isNegative = change?.includes("-");

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-64">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-8 h-8 flex items-center justify-center rounded ${color}`}>
          {icon}
        </div>
        <h4 className="text-sm text-gray-500">{title}</h4>
      </div>

      <h2 className="text-2xl font-bold">{value}</h2>

      {change && (
        <p className={`text-xs mt-2 ${isNegative ? "text-red-400" : "text-green-400"}`}>
          {change}
        </p>
      )}
    </div>
  );
};

export default Card;