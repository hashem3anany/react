import axios from "axios";
import UserNav from "../UserNav/UserNav";
import "./NurseList.css";
import { useState } from "react";
import drlist from "../../images/dlist.png";
import lg from "../../images/log2.png";
import { Link } from "react-router-dom";

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

export default function NurseList() {
  const [nurse, setnurse] = useState([]);
  const [selectedGov, setSelectedGov] = useState("");

  let getapi = async () => {
    await axios
      .post(
        "https://ertdemo.azurewebsites.net/api/User/GetNurseByLocationAndSpeciality1",
        {
          governorate: document.getElementById("gov").value,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        setnurse(response.data.doctor);
        console.log(response);
        document.getElementById("ds").innerHTML = " ";
      })
      .catch((error) => {
        console.log(error.response.data.errorMessage);
        console.log(nurse);
        if(error.response.data.errorMessage === undefined){
          document.getElementById("ds").innerHTML ='"you should select the governrate"'
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
      <div className="display vh-100 container p-5">
        <h2 className="py-5">Nurses List</h2>
        <p>Search With governorate</p>
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
          search for nurse
        </button>
        <p className="text-danger mt-4" id="ds"></p>
        <div className="row mt-4 flex-wrap " id="ls car">
          {nurse.map((doctor, index) => (
            <div className="col-2" key={index}>
              <div className="item text-center rounded-3 py-3">
                <img
                  className="w-50 rounded-circle "
                  src={doctor.profileImage}
                  alt={doctor.username}
                />
                <h2>{doctor.username}</h2>
                <button id="rcv" onClick={()=>{localStorage.setItem("chat",doctor.id)}}  className="btn rounded-5 p-3" ><Link to={`/NrProfile`}>Appointment</Link></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
