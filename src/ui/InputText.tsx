import type { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface InputTextProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  error?: string;
  register: UseFormRegister<T>;
}

export default function InputText<T extends FieldValues>({
  label,
  name,
  error,
  register,
}: InputTextProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>

      <input
        {...register(name)}
        className="border p-2 rounded"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}