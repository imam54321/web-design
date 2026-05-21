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
import Events from "./pages/EventIndex";
import EventsCreate from "./pages/EventCreate";
import PembicaraCreate from "./pages/pembicaraCreate";
import PembicaraUpdate from "./pages/pembicaraUpdate";
import CategoryUpdate from "./pages/CategoryUpdate";
import EventUpdate from "./pages/eventUpdate";
import BiodataIndex from "./pages/BiodataIndex";
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
                <Route path="/dashboard/biodata" element={<BiodataIndex/>}/>
                <Route path="/dashboard/category" element={<CategoryIndex/>}></Route>
                <Route path="/dashboard/category/create" element={<CategoryCreate/>}></Route>
                <Route path = "/dashboard/category/edit/:id" element = {<CategoryUpdate/>}></Route>
                <Route path="/dashboard/pembicara" element={<Pembicara/>}></Route>
                <Route path = "/dashboard/pembicara/create" element = {<PembicaraCreate/>}></Route>
                <Route path = "/dashboard/pembicara/edit/:id" element = {<PembicaraUpdate/>}></Route>
                <Route path="/dashboard/event" element={<Events/>}></Route>
                <Route path="/dashboard/event/create" element={<EventsCreate/>}></Route>
                <Route path="/dashboard/event/edit/:id" element={<EventUpdate />} />
                
              </Route>
              </Route>
        </Routes>
        
    </BrowserRouter>
    
  );
}

export default App;