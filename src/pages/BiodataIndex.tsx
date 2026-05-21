import { useState } from "react";
import gueh from "../assets/gueh.jpeg"

type Biodata = {
  id: number;
  nim : string;
  name: string;
  role: string;
  email: string;
  kelas: string;
  image: string;
};

export default function BiodataIndex() {
  const [biodata] = useState<Biodata[]>([
    {
      id: 1,
      nim:"24090084",
      name: "Imam Arif Fauzan",
      role: "Fullstack Dev",
      kelas: "4C",
      email: "fauzanimam955@gmail.com",
      image: gueh,
    }
  ]);

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Biodata
          </h1>
        </div>
      </div>

      {/* CARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {biodata.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-5">
              <h2 className="text-2xl font-bold">
                {item.name}
              </h2>

              <p className="text-red-600 font-medium mt-1">
                {item.nim}
              </p>
              <p className="text-red-600 font-medium mt-1">
                {item.kelas}
              </p>
              <p className="text-red-600 font-medium mt-1">
                {item.role}
              </p>

              <p className="text-gray-500 mt-3">
                {item.email}
              </p>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}