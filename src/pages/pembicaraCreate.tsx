import { useForm } from "react-hook-form";
import InputText from "../ui/InputText";
import Button from "../components/Button";
import { API_URL } from "../services/api";

type SpeakerForm = {
  name: string;
  role: string;
  image: string;
};

export default function PembicaraCreate() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SpeakerForm>();

  const onSubmit = async (data: SpeakerForm) => {
    try {
      const response = await fetch(`${API_URL}/speakers`, {
        method: "POST",
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
        throw new Error("Gagal menambahkan pembicara");
      }

      const result = await response.json();
      console.log("Pembicara berhasil ditambahkan:", result);

      alert("Pembicara berhasil ditambahkan");
      reset();
    } catch (error) {
      console.error("CREATE SPEAKER ERROR:", error);
      alert("Pembicara gagal ditambahkan");
    }
  };

  return (
    <div className="py-10">
      <h1 className="text-center mb-10 font-bold text-3xl">
        Tambah Pembicara
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

        <Button title="Tambah Pembicara" type="submit" />
      </form>
    </div>
  );
}