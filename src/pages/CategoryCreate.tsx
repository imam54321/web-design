import { useForm } from "react-hook-form";
import InputText from "../ui/InputText";
import Button from "../components/Button";

type CategoryForm = {
  name: string;
};

export default function CategoryCreate() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryForm>();

  const onSubmit = async (data: CategoryForm) => {
    try {
      const response = await fetch(`http://localhost:3000/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal menambahkan category");
      }

      const result = await response.json();
      console.log("Category berhasil ditambahkan:", result);

      alert("Category berhasil ditambahkan");
      reset();
    } catch (error) {
      console.error("CREATE CATEGORY ERROR:", error);
      alert("Category gagal ditambahkan");
    }
  };

  return (
    <div className="py-10">
      <h1 className="text-center mb-10 font-bold text-3xl">
        Tambah Category
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-100 mx-auto"
      >
        <InputText<CategoryForm>
          label="Category"
          name="name"
          register={register}
          error={errors.name?.message}
        />

        <Button title="Tambah Category" type="submit" />
      </form>
    </div>
  );
}