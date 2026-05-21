import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import InputText from "../ui/InputText";
import Button from "../components/Button";
import { API_URL } from "../services/api";

type CategoryForm = {
  name: string;
};

export default function CategoryUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryForm>();

  useEffect(() => {
     fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        const category = data.data ?? data;

        reset({
          name: category.name,
        });
      })
      .catch((error) => {
        console.error("Gagal mengambil detail category:", error);
      });
  }, [id, reset]);

  const onSubmit = async (data: CategoryForm) => {
    try {
      const response = await fetch(`${API_URL}/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal update category");
      }

      alert("Category berhasil diupdate");
      navigate("/dashboard/category");
    } catch (error) {
      console.error("UPDATE CATEGORY ERROR:", error);
      alert("Category gagal diupdate");
    }
  };

  return (
    <div className="py-10">
      <h1 className="text-center mb-10 font-bold text-3xl">
        Edit Category
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

        <Button title="Update Category" type="submit" />
      </form>
    </div>
  );
}