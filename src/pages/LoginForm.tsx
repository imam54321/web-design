import { useForm } from "react-hook-form";
import { InputText } from "../ui/InputText";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod" ;
import { InputPassword } from "../ui/InputPass";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
type FormLogin ={
    email:string;
    password:string;
};

const schema = z.object({
    email : z.string().min(1, "Email harus diisi"),
    password : z.string().min(8, "Password minimal 8 Karakter"),
});


export default function LoginForm() {

    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const { register, handleSubmit, reset, formState:{errors} } = useForm<FormLogin>({
        resolver : zodResolver(schema)
    });
    // console.log(errors  )

    const onSubmit = (data: FormLogin) => {
        console.log("Regist Succes" ,data);
        if(data.email == "fauzanimam955@gmail.com" && data.password == "admin1234"){
            alert("Login berhasil")
        login(data.email);
        // localStorage.setItem("isLogin", "true");
        reset();
        navigate("/dashboard");
        } else {
            alert("Email atau Password anda salah !")
            console.log("Regist Gagal", data)
        }
    };
    return (
        <div className="flex justify-center mt-10">
             <div className="w-120 max-w-7xl bg-white p-5 rounded-2xl shadow-xl">
                <h1 className="text-center text-2xl font-bold mb-10 ">Silahkan Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputText 
                    label = "Email"
                    name = "email"
                    register = {register}
                    error = {errors.email?.message}
                    />
                    <InputPassword 
                    label = "Password"
                    name = "password"
                    register = {register}
                    error = {errors.password?.message}
                    />
                    
                    <div>
                        <Button title= "Login" variant="primary" type="submit"/>
                    </div>
                    <div> 
                         Belum punya akun? <Link to="/register">Daftar Disini</Link>
                    </div> 
                </form>
            </div>
        </div>
    )
}