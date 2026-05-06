import { useForm } from "react-hook-form";
import InputText from "../ui/InputText";
import Button from "../components/Button";

type CategoryForm = {
  category: string;
};

export default function CategoryCreate() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryForm>();

  const onSubmit = (data: CategoryForm) => {
    console.log("Category:", data.category);
    reset();
  };

  return (
    <div className="py-10 ">
      <h1 className="text-center mb-10 font-bold text-3xl">Tambah Category</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  gap-4 w-100 mx-auto">
        <InputText<CategoryForm>
          label="Category"
          name="category"
          register={register}
          error={errors.category?.message}
        />

        <Button title="Tambah Category" type="submit" />
      </form>

      {/* <p>Tambahkan Category yang diperlukan</p> */}
    </div>
  );
}