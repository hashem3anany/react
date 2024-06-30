import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
// import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Error from "./components/Error/Error";
import Contact from "./components/Contact/Contact";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import DoctorData from "./components/DoctorData/DoctorData";
import NurseData from "./components/NurseData/NurseData"
import UserHome from "./components/UserHome/UserHome"
import DoctorList from "./components/DoctorList/DoctorList"
import NurseList from "./components/NurseList/NurseList"
import DrProfile from "./components/DrProfile/DrProfile";
import Bone from "./components/Bone/Bone";
import Brain from "./components/Brain/Brain";
import UserProfile from "./components/UserProfile/UserProfile"
import NrProfile from "./components/NrProfile/NrProfile";
import Chat from "./components/Chat/Chat"
import Admin from "./components/Admin/Admin";
import Breast from "./components/Breast/Breast";
import Sm from "./components/Sm/Sm";
import Ddoctor from "./components/Ddoctor/Ddoctor";
import Dnurse from "./components/Dnurse/Dnurse";
function App() {
  return (
    <>
      <Header/>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='Home' element ={<Home />} />
        <Route path='react/' element ={<Home />} />
        <Route path="Contact" element={<Contact/>}/>
        <Route path="SignUp" element={<SignUp/>}/>
        <Route path="Login"  element={<Login/>}/>
        <Route path="DoctorData"  element={<DoctorData/>}/>
        <Route path="NurseData"  element={<NurseData/>}/>
        <Route path="UserHome"  element={<UserHome/>}/>
        <Route path="DoctorList" element={<DoctorList/>}/>
        <Route path="NurseList" element={<NurseList/>}/>
        <Route path="/DrProfile/:id" element={<DrProfile/>}/>
        <Route path="/DrProfile" element={<DrProfile/>}/>
        <Route path="/UserProfile" element={<UserProfile/>}/>
        <Route path="/Bone" element = {<Bone/>}/>
        <Route path="/Brain" element={<Brain/>}/>
        <Route path="/Breast" element={<Breast/>}/>
        <Route path="/NrProfile" element={<NrProfile/>}/>
        <Route path="Chat" element={<Chat/>}/>
        <Route path="Admin" element={<Admin/>}/>
        <Route path="/Sm" element={<Sm/>}/>
        <Route path="/Ddoctor" element={<Ddoctor/>}/>
        <Route path="/Dnurse" element={<Dnurse/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
      <Footer/>

    </>
  );
}

export default App;
