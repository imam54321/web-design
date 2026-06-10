import { useForm } from "react-hook-form";
import  InputText  from "../ui/InputText";
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
    email : z.string().min(1, "email harus diisi"),
    password : z.string().min(8, "Password minimal 8 Karakter"),
});


export default function LoginForm() {

    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const { register, handleSubmit, reset, formState:{errors} } = useForm<FormLogin>({
        resolver : zodResolver(schema)
    });
    // console.log(errors  )
const onSubmit = async (data: FormLogin) => {
  try {
    const response = await fetch(
      "http://localhost:3000/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email, // sementara nim dipakai sebagai email
          password: data.password,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      alert(result.message);
      return;
    }

    console.log("Login Success", result);

    localStorage.setItem("token", result.token);

    login(result.user.name);

    reset();
    navigate("/dashboard");

  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan saat login");
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