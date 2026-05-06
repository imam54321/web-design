import { User } from "lucide-react";
import Card from "../components/CardDefault";
import PieChartCard from "../components/PieChart";

const data = [
  {
    title: "Registrasi IT Seminar",
    value: 200,
  },
  {
    title: "Registrasi IT Competition",
    value: 10, label: "10 TIM",
  },
  {
    title: "Registrasi IT Talkshow",
    value: 150,
  },
  {
    title: "Registrasi IT Workshop",
    value: 115,
  },
];
export default function DashboardIndex() {
  return (
    <>
      <div className="mt-10">
        <div className="flex felx-cols-4 gap-5 ">
            {data.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                value={item.label ?? item.value.toString()}
                change="+10%"
                color="bg-blue-300"
                icon={<User size={16} />}
              />
            ))}
          </div>
        </div>
        <div className="mt-10 text-center">
          <h1>Jumlah Peserta Registrasi</h1>
        </div>
         <div className="grid  gap-4">
            <PieChartCard
              data={data.map((item) => ({
                name: item.title,
                value: item.value,
              }))}
            />
        </div> 
    </>
  );
}