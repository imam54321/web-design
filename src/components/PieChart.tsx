import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PieChartCardProps {
  data: { name: string; value: number }[];
}

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

const PieChartCard = ({ data }: PieChartCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full h-80">
      <h3 className="text-sm font-semibold mb-4">Distribusi Registrasi</h3>

      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={90}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartCard;