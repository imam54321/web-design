import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { API_URL } from "../services/api";

type Event = {
  id: number;
  title: string;
  category: string;
  date: string;
  location: string;
  image: string;
};

export default function EventIndex() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/events`)
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA EVENTS:", data);
        setEvents(Array.isArray(data) ? data : data.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data events:", error);
      });
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus event ini?");

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/events`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Event gagal dihapus");
        return;
      }

      setEvents((prev) => prev.filter((event) => event.id !== id));

      alert("Event berhasil dihapus");
    } catch (error) {
      console.error("DELETE EVENT ERROR:", error);
      alert("Event gagal dihapus");
    }
  };

  return (
    <div className="py-5 px-4">
      <h1 className="mb-6 font-bold text-center text-4xl">Event</h1>

      <div className="flex flex-col gap-4 pt-5">
        <h1 className="text-2xl font-mono">Tambahkan Event</h1>

        <Link to="/dashboard/event/create" className="w-fit">
          <Button type="button" title="Create New" variant="primary" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {events.map((event) => (
          <div key={event.id} className="border rounded-xl shadow p-4">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <h2 className="text-xl font-bold">{event.title}</h2>
            <p className="text-sm text-red-600 font-semibold">
              {event.category}
            </p>
            <p className="text-gray-600">{event.date}</p>
            <p className="text-gray-600">{event.location}</p>
            <div className="flex gap-3 mt-4">
              <Link to={`/dashboard/event/edit/${event.id}`}>
                <Button title="Edit" variant="outline" type="button" />
              </Link>

              <Button
                title="Delete"
                variant="primary"
                type="button"
                onClick={() => handleDelete(event.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
