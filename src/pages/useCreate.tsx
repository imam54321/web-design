import { useForm } from "react-hook-form";
import InputText from "../ui/InputText";
import { InputPassword } from "../ui/InputPass";
import Button from "../components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

type FormUser = {
  name: string;
  email: string;
  password: string;
};

const schema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  email: z.string().min(1, "Email harus diisi").email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export default function UserCreate() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormUser>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormUser) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          roleId: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal menambahkan user");
      }

      alert("User berhasil ditambahkan");
      reset();
      navigate("/dashboard/user");
    } catch (error) {
      console.error("CREATE USER ERROR:", error);
      alert("User gagal ditambahkan");
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-3xl font-bold mb-2">Tambah User</h1>
      <p className="text-gray-500 mb-6">Form tambah data user Invofest</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputText
          label="Nama"
          name="name"
          register={register}
          error={errors.name?.message}
        />

        <InputText
          label="Email"
          name="email"
          register={register}
          error={errors.email?.message}
        />

        <InputPassword
          label="Password"
          name="password"
          register={register}
          error={errors.password?.message}
        />

        <div className="flex gap-3 mt-5">
          <Button title="Simpan" variant="primary" type="submit" />

          <Button
            title="Batal"
            variant="outline"
            type="button"
            onClick={() => navigate("/dashboard/user")}
          />
        </div>
      </form>
    </div>
  );
}