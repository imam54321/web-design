interface InputTextProps {
    label : string;
    name : string;
    error?: string;
    register : any ;
}

export const InputText : React.FC<InputTextProps> = ({
    label,
    name,
    error,
    register,
}) => {
    return (
                    <div className="flex flex-col gap-1 mb-4">
                        <label className="pr-10 text-sm font-semibold " htmlFor={label}>{label}</label>
                        <input className="border text-sm rounded-xl p-2"
                        type="text"
                        {...register(name)}
                        placeholder="  Masukan Nama Anda" />
                        {error && <p className="text-red-600">{error}</p>}
                    </div>
    )
}