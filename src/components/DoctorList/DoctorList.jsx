import UserNav from "../UserNav/UserNav";
import "./DoctorList.css";
import drlist from "../../images/dlist.png";
import lg from "../../images/log2.png";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const specializations = [
  "Pediatrics",
  "Cardiology",
  "Oncology",
  "Neurology",
  "Orthopedics",
  "Dermatology",
  "Gynecology",
  "Psychiatry",
  "Ophthalmology",
  "Urology",
];

const governorates = [
  "Cairo",
  "Alexandria",
  "Port Said",
  "Suez",
  "Damietta",
  "Dakahlia",
  "Beheira",
  "Gharbia",
  "Kafr El Sheikh",
  "Sharkia",
  "Monufia",
  "Qalyubia",
  "Minya",
  "Giza",
  "Faiyum",
  "Beni Suef",
  "Asyut",
  "Sohag",
  "Qena",
  "Luxor",
  "Aswan",
  "Red Sea",
  "New Valley",
  "Matrouh",
  "North Sinai",
  "South Sinai",
  "Ismailia",
];

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [selectedSpec, setSelectedSpec] = useState("");
  const [selectedGov, setSelectedGov] = useState("");
  let getapi = async () => {
    await axios
      .post(
        "https://ertdemo.azurewebsites.net/api/User/GetDoctorsByLocationAndSpeciality1",
        {
          governorate: document.getElementById("gov").value,
          speciality: document.getElementById("spec").value,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        setDoctors(response.data.doctor);
        console.log(response);
        
        document.getElementById("ds").innerHTML = " ";
      })
      .catch((error) => {
        console.log(error.response.data.errorMessage);
        
        if(error.response.data.errorMessage === undefined){
            document.getElementById("ds").innerHTML ='"you should select the governrate and the Speciality "'
        }
        else{
            document.getElementById("ds").innerHTML =
          error.response.data.errorMessage;
        }
        document.getElementById("ls").innerHTML = " ";
      });
      
  };
  
  return (
    <>
      <UserNav />
      <div className="list">
        <div className="position-relative listdata">
          <img src={drlist} alt="" className="w-100" />
          <div className="layer position-absolute p-5 d-flex align-items-center">
            <div className="drtext d-flex flex-wrap  align-items-center w-100  text-white px-5">
              <img className="ms-5" src={lg} alt="" />
              <h2 className="w-50 ms-3">Mideco \ Doctors</h2>
              <div className="line mt-5"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="display container p-5">
        <h2 className="py-5">Doctors List</h2>
        <p>Search With governorate and spacific</p>
        <select
          id="spec"
          className="w-100 mt-4 py-2"
          value={selectedSpec}
          onChange={(e) => setSelectedSpec(e.target.value)}
        >
          <option value="" disabled>
            Select Specialization
          </option>
          {specializations.sort().map((spec, index) => (
            <option key={index} value={spec}>
              {spec}
            </option>
          ))}
        </select>
        <select
          id="gov"
          className="w-100 mt-4 py-2"
          value={selectedGov}
          onChange={(e) => setSelectedGov(e.target.value)}
        >
          <option value="" disabled>
            Select Governorate
          </option>
          {governorates.sort().map((gov, index) => (
            <option key={index} value={gov}>
              {gov}
            </option>
          ))}
        </select>
        <button className="btn btn-primary mt-4" on onClick={getapi}>
          search for doctor
        </button>
        <p className="text-danger mt-4" id="ds"></p>
        <div className="row flex-wrap " id="ls">
          {doctors.map((doctor, index) => (
            <div id="car" className="col-2" key={index}>
              <div  className="item text-center rounded-3 py-3">
                <img
                  className="w-50 rounded-circle "
                  src={doctor.profileImage}
                  alt={doctor.username}
                />
                <h2>{doctor.username}</h2>
                <p>{doctor.speciality}</p>
               <button id="rcv" onClick={()=>{localStorage.setItem("chat",doctor.id)}}  className="btn rounded-5 p-3" ><Link to={`/DrProfile`}>Appointment</Link></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
