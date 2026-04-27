// import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "../ui/InputText";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod" ;
import { InputPassword } from "../ui/InputPass";
import Button from "../components/Button";
import { InputTextArea } from "../ui/InputTextArea";
import { Link, useNavigate } from "react-router-dom";
import { SelectInput } from "../ui/SelectInput";

type FormRegist ={
    nama:string
    email:string;
    password:string;
    password_confirm : string;
    biodata_singkat : string;
    pilih_event : string;
};
const schema = z.object({
    nama: z.string().min(1, "Nama harus diisi"),
    email: z.string().min(1, "Email harus diisi"),
    password: z.string().min(8, "Password minimal 8 Karakter"),
    password_confirm: z.string().min(8, "Password minimal 8 Karakter"),
    biodata_singkat: z.string().min(10, "Minimal isi dengan 10 Karakter"),
    pilih_event : z.string().min(1, "Minimal Pilih 1 event"),
    }).refine((data) => data.password === data.password_confirm, {
    message: "Password tidak sama",
    path: ["password_confirm"],
});

export default function RegisterForm() {

    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState:{errors} } = useForm<FormRegist>({
        resolver : zodResolver(schema)
    });
    // console.log(errors  )

    const onSubmit = (data: FormRegist) => {
        console.log("Regist Succes" ,data);
        localStorage.setItem("isLogin", "true");
        reset();
        navigate("/");
    };

    return (
        <div className="flex justify-center mt-10">
            <div className="w-120 max-w-7xl bg-white p-5 rounded-2xl shadow-xl">
                
                <h1 className="text-center text-2xl font-bold mb-5">
                    Form Register
                </h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputText 
                        label="Nama" 
                        name="nama" 
                        register={register} 
                        error={errors.nama?.message} 
                        />
                    <InputText 
                        label="Email" 
                        name="email" 
                        register={register} 
                        error={errors.email?.message} 
                        />
                    <InputTextArea 
                        label="Biodata Singkat" 
                        name="biodata_singkat" 
                        register={register} 
                        errors={errors.biodata_singkat?.message} 
                        />
                    <SelectInput
                        label = "Pilih Event"
                        name = "pilih_event"
                        register={register}
                        errors = {errors.pilih_event?.message}
                        options={[
                            {label : " IT Competition", value:"IT Competition"},
                            {label : "IT Seminar", value:"IT Seminar"},
                            {label : "IT TalskShow", value: " IT TalkShow"},
                            {label : " IT Workshop", value : "IT Workshop"}
                        ]
                        }
                        />
                    <InputPassword 
                        label="Password" 
                        name="password" 
                        register={register} 
                        error={errors.password?.message} 
                        />
                    <InputPassword 
                        label="Password Confirm" 
                        name="password_confirm" 
                        register={register} 
                        error={errors.password_confirm?.message} />
                <div className=" h-20 flex flex-col justify-center items-center">
                    <Button title="Register" variant="primary" type="submit"/>
                       <div> 
                         Atau sudah punya akun? <Link to="/login">Masuk disini</Link>
                       </div> 
                </div>
                </form>
            </div>
        </div>
    );
}