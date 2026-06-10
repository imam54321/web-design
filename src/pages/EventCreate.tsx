import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputText from "../ui/InputText";
import Button from "../components/Button";

type EventForm = {
  title: string;
  description: string;
  location: string;
  dateEvent: string;
  image: string;
  categoryId: string;
  pembicaraId: string;
};

type Category = {
  id: number;
  name: string;
};

type Speaker = {
  id: number;
  name: string;
};

export default function EventCreate() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

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
        setSpeakers(Array.isArray(data) ? data : data.data);
      });
  }, []);

  const onSubmit = async (data: EventForm) => {
    try {
      const payload = {
        title: data.title,
        description: data.description,
        location: data.location,
        dateEvent: data.dateEvent,
        image: data.image,
        categoryId: Number(data.categoryId),
        pembicaraId: Number(data.pembicaraId),
      };

      console.log("PAYLOAD EVENT:", payload);

      const response = await fetch(`http://localhost:3000/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("RESPONSE EVENT:", result);

      if (!response.ok) {
        alert(result.message || "Gagal menambahkan event");
        return;
      }

      alert("Event berhasil ditambahkan");
      reset();
    } catch (error) {
      console.error("CREATE EVENT ERROR:", error);
      alert("Event gagal ditambahkan");
    }
  };

  return (
    <div className="py-10">
      <h1 className="text-center mb-10 font-bold text-3xl">
        Tambah Event
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

        <InputText<EventForm>
          label="Image"
          name="image"
          register={register}
          error={errors.image?.message}
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
          {speakers.map((speaker) => (
            <option key={speaker.id} value={speaker.id}>
              {speaker.name}
            </option>
          ))}
        </select>

        <Button
          type="submit"
          title="Tambah Event Baru"
          variant="primary"
          className="mt-6"
        />
      </form>
    </div>
  );
}