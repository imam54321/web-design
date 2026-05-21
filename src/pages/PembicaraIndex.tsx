import SpeakerCard from "../ui/SpeakerCard";
import useInView from "../hooks/useInView";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { API_URL } from "../services/api";

type Speaker = {
  id: number;
  name: string;
  role: string;
  image: string;
};

export default function Pembicara() {
  const [speakerRef, speakerShow] = useInView();
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/speakers`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setSpeakers(data.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data speakers:", error);
      });
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus pembicara ini?");

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/speakers/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus pembicara");
      }

      setSpeakers((prev) => prev.filter((speaker) => speaker.id !== id));
      alert("Pembicara berhasil dihapus");
    } catch (error) {
      console.error(error);
      alert("Pembicara gagal dihapus");
    }
  };

  return (
    <section
      ref={speakerRef}
      className="py-16 px-6 min-h-screen flex flex-col items-center"
    >
      <h1 className="mb-16 text-4xl md:text-5xl font-bold text-center">
        Narasumber Invofest
      </h1>

      <div
        className={`w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 transition-all duration-700 ${
          speakerShow ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {speakers.map((speaker) => (
          <div key={speaker.id} className="flex flex-col items-center gap-3">
            <SpeakerCard
              name={speaker.name}
              role={speaker.role}
              image={speaker.image}
            />

            <div className="flex gap-3">
              <Link to={`/dashboard/pembicara/edit/${speaker.id}`}>
                <Button title="Edit" variant="outline" type="button" />
              </Link>

              <Button
                title="Delete"
                variant="primary"
                type="button"
                onClick={() => handleDelete(speaker.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <Link
        to="/dashboard/pembicara/create"
        className="inline-block mb-6 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        + Tambah Pembicara
      </Link>
    </section>
  );
}
