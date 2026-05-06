import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import TalkShow from "./pages/TalkShow";
import Seminar from "./pages/Seminar";
import Workshop from "./pages/WorkShop";
import Competition from "./pages/Competition";
import MainLayout from "./layouts/MainLayouts";
import RegisterForm from "./pages/RegisterForm";
import Home from "./pages/Home";
// import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthLayout from "./layouts/AuthLayout";
import LoginForm from "./pages/LoginForm";
import DashboardIndex from "./pages/HomePage";
import DashboardLayout from "./layouts/DashboardLayouts";
import CategoryIndex from "./pages/CategoryIndex";
import Pembicara from "./pages/PembicaraIndex";
import CategoryCreate from "./pages/CategoryCreate";
function App() {
  return (
    <BrowserRouter>

        <Routes>
          <Route element= {<MainLayout/>}>
              <Route path="/" element={<Home />} />
              <Route path = "/talkshow" element={<TalkShow/>}/>
              <Route path = "/seminar" element={<Seminar/>}/>
              <Route path = "/competition" element={<Competition/>}/>
              <Route path = "/workshop" element={<Workshop/>}/>
        </Route> 

          <Route element = {<AuthLayout/>}>
                <Route path="/register" element={<RegisterForm/>}></Route>
                <Route path="/login" element={<LoginForm/>}></Route>
                
          </Route>
           <Route element={<ProtectedRoute/>}>
                <Route element = {<DashboardLayout/>}>
                <Route path="/dashboard" element={<DashboardIndex/>}/>
                <Route path="/dashboard/category" element={<CategoryIndex/>}></Route>
                <Route path="/dashboard/category/create" element={<CategoryCreate/>}></Route>
                <Route path="/dashboard/pembicara" element={<Pembicara/>}></Route>
                
              </Route>
              </Route>
        </Routes>
        
    </BrowserRouter>
    
  );
}

export default App;