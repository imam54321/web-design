import SpeakerCard from "../ui/SpeakerCard";
import useInView from "../hooks/useInView";
import { useState } from "react";

// images
import foto1 from "../assets/seminar sowam_20251115_104314_0002.png";
import foto2 from "../assets/Seminar Dery_20251115_104313_0001.png";
import foto3 from "../assets/talkshow cyber_20251115_104447_0002.png";
import foto4 from "../assets/talkshow daffa_20251115_104314_0003.png";
import foto5 from "../assets/talkshow ichsan_20251115_104446_0000.png";
import foto6 from "../assets/talkshow zaim.png";
import foto7 from "../assets/workshop mobile.png";
import foto8 from "../assets/workshop AI_20251115_104446_0001.png";

export default function Pembicara() {
  const [speakerRef, speakerShow] = useInView();

  const [speakers, setSpeakers] = useState([
    { name: "Dery", role: "AWS", imageUrl: foto2 },
    { name: "Cyber", role: "Talkshow", imageUrl: foto3 },
    { name: "Sowam", role: "Google", imageUrl: foto1 },
    { name: "Daffa", role: "Talkshow", imageUrl: foto4 },
    { name: "Ichsan", role: "Talkshow", imageUrl: foto5 },
    { name: "Zaim", role: "Talkshow", imageUrl: foto6 },
    { name: "Mobile", role: "Workshop", imageUrl: foto7 },
    { name: "AI", role: "Workshop", imageUrl: foto8 },
  ]);

  const [form, setForm] = useState({
    name: "",
    role: "",
  });

  const handleAdd = () => {
    if (!form.name || !form.role) return;

    setSpeakers((prev) => [
      ...prev,
      {
        name: form.name,
        role: form.role,
        imageUrl: foto1,
      },
    ]);

    setForm({ name: "", role: "" });
  };

  return (
    <section
      ref={speakerRef}
      className="py-16 min-h-screen flex flex-col items-center"
    >
      <h1 className="mb-16 text-5xl font-bold text-center">
        Narasumber Invofest
      </h1>

      {/* SPEAKER LIST */}
      <div
        className={` grid grid-cols-3 overflow-x-auto gap-5 transition-all duration-700 ${
          speakerShow ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {speakers.map((speaker, index) => (
          <div key={index} className="mx-5 w-64 flex-shrink-0">
            <SpeakerCard {...speaker} />
          </div>
        ))}
      </div>

      {/* FORM */}
      <div className="mb-10 mt-10 flex gap-4">
        <input
          type="text"
          placeholder="Nama"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Role"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
          className="border p-2 rounded"
        />

        <button
          onClick={handleAdd}
          className="bg-red-600 text-white px-4 rounded"
        >
          Tambah
        </button>
      </div>
    </section>
  );
}