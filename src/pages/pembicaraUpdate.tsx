import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import InputText from "../ui/InputText";
import Button from "../components/Button";

type SpeakerForm = {
  name: string;
  role: string;
  image: string;
};

export default function PembicaraUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SpeakerForm>();

  useEffect(() => {
    fetch(`http://localhost:3000/speakers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const speaker = data.data ?? data;

        reset({
          name: speaker.name,
          role: speaker.role,
          image: speaker.image,
        });
      })
      .catch((error) => {
        console.error("Gagal mengambil detail speaker:", error);
      });
  }, [id, reset]);

  const onSubmit = async (data: SpeakerForm) => {
    try {
      const response = await fetch(`http://localhost:3000/speakers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          role: data.role,
          image: data.image,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal update pembicara");
      }

      alert("Pembicara berhasil diupdate");
      navigate("/dashboard/pembicara");
    } catch (error) {
      console.error("UPDATE SPEAKER ERROR:", error);
      alert("Pembicara gagal diupdate");
    }
  };

  return (
    <div className="py-10">
      <h1 className="text-center mb-10 font-bold text-3xl">
        Edit Pembicara
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-100 mx-auto"
      >
        <InputText<SpeakerForm>
          label="Nama Pembicara"
          name="name"
          register={register}
          error={errors.name?.message}
        />

        <InputText<SpeakerForm>
          label="Role"
          name="role"
          register={register}
          error={errors.role?.message}
        />

        <InputText<SpeakerForm>
          label="Image"
          name="image"
          register={register}
          error={errors.image?.message}
        />

        <Button title="Update Pembicara" type="submit" />
      </form>
    </div>
  );
}