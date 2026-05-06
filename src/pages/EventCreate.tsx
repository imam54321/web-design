import { useForm } from "react-hook-form";
import InputText from "../ui/InputText";
import Button from "../components/Button";

type FormData = {
  title: string;
  description: string;
};

export default function MyForm() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-100 py-10 ">
      <InputText<FormData>
        label="Title"
        name="title"
        register={register}
        error={errors.title?.message}
      />

      <InputText<FormData> 
        label="Description"
        name="description"
        register={register}
        error={errors.description?.message}
        
        />

      <Button 
      type="submit"
      title="Tambah Event Baru"
      variant="primary" 
      className="mt-10" />
    </form>
  );
}