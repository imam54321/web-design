import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import InputText from "../ui/InputText";
import Button from "../components/Button";

type EventForm = {
  title: string;
  description: string;
  location: string;
  dateEvent: string;
  categoryId: string;
  pembicaraId: string;
};

type Category = {
  id: number;
  name: string;
};

type Pembicara = {
  id: number;
  name: string;
};

export default function EventUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [pembicara, setPembicara] = useState<Pembicara[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventForm>();

  useEffect(() => {
    fetch(`http://localhost:3000/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(Array.isArray(data) ? data : data.data);
      });

    fetch(`http://localhost:3000/speakers`)
      .then((res) => res.json())
      .then((data) => {
        setPembicara(Array.isArray(data) ? data : data.data);
      });

    fetch(`http://localhost:3000/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const event = data.data ?? data;

        reset({
          title: event.title,
          description: event.description,
          location: event.location,
          dateEvent: event.dateEvent?.split("T")[0],
          categoryId: String(event.categoryId),
          pembicaraId: String(event.pembicaraId),
        });
      })
      .catch((error) => {
        console.error("Gagal mengambil detail event:", error);
      });
  }, [id, reset]);

  const onSubmit = async (data: EventForm) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          location: data.location,
          dateEvent: data.dateEvent,
          categoryId: Number(data.categoryId),
          pembicaraId: Number(data.pembicaraId),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Event gagal diupdate");
        return;
      }

      alert("Event berhasil diupdate");
      navigate("/dashboard/event");
    } catch (error) {
      console.error("UPDATE EVENT ERROR:", error);
      alert("Event gagal diupdate");
    }
  };

  return (
    <div className="py-10">
      <h1 className="text-center mb-10 font-bold text-3xl">
        Edit Event
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-100 mx-auto flex flex-col gap-4"
      >
        <InputText<EventForm>
          label="Title"
          name="title"
          register={register}
          error={errors.title?.message}
        />

        <InputText<EventForm>
          label="Description"
          name="description"
          register={register}
          error={errors.description?.message}
        />

        <InputText<EventForm>
          label="Location"
          name="location"
          register={register}
          error={errors.location?.message}
        />

        <InputText<EventForm>
          label="Date Event"
          name="dateEvent"
          register={register}
          error={errors.dateEvent?.message}
        />

        <select
          {...register("categoryId")}
          className="border p-3 rounded-lg"
        >
          <option value="">Pilih Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          {...register("pembicaraId")}
          className="border p-3 rounded-lg"
        >
          <option value="">Pilih Pembicara</option>
          {pembicara.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <Button
          type="submit"
          title="Update Event"
          variant="primary"
          className="mt-6"
        />
      </form>
    </div>
  );
}