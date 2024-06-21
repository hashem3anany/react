import React, { useState } from 'react';
import './DoctorData.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

const specializations = [
    'Pediatrics', 'Cardiology', 'Oncology', 'Neurology', 'Orthopedics', 'Dermatology',
    'Gynecology', 'Psychiatry', 'Ophthalmology', 'Urology'
];

const governorates = [
    'Cairo', 'Alexandria', 'Port Said', 'Suez', 'Damietta', 'Dakahlia', 'Beheira',
    'Gharbia', 'Kafr El Sheikh', 'Sharkia', 'Monufia', 'Qalyubia', 'Minya', 'Giza',
    'Faiyum', 'Beni Suef', 'Asyut', 'Sohag', 'Qena', 'Luxor', 'Aswan', 'Red Sea',
    'New Valley', 'Matrouh', 'North Sinai', 'South Sinai', 'Ismailia'
];

function DoctorData() {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedSpec, setSelectedSpec] = useState('');
    const [selectedGov, setSelectedGov] = useState('');
    const [loading, setLoading] = useState(false);
    const userId = location.state.userId;
    const [errorMessage, setErrorMessage] = useState('');

    const clearInputs = () => {
        setSelectedSpec('');
        setSelectedGov('');
    };

    const getapi = async () => {
        setLoading(true);

        await axios.post(
            "https://ertdemo.azurewebsites.net/api/MakeAnAccount/AddDoctorInfo",
            {
                userId: userId,
                speciality: selectedSpec,
                governorates: selectedGov,
                description: document.getElementById("description").value,
                address: document.getElementById("address").value,
                workTime: document.getElementById("hours").value,
                phoneNumber: document.getElementById("phone").value
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )
        .then((response) => {
            clearInputs();
            setLoading(false);
            navigate('/Sm'); // Navigate to Sm component
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
            if (error.response.data === "Invalid phone number format") {
                setErrorMessage(error.response.data);
            }
            else{
                setErrorMessage("all inputs are required")
            }
            
        });
    };
    return (
        <>
            <NavBar/>
            <div className="py-5 d-data">
                <div className="container position-relative">
                    <div className="row">
                        <div className="col-8">
                            <div className="item">
                                <h2>DOCTORS DATA</h2>
                                <select id="spec" className="w-100 mt-4 py-2" value={selectedSpec} onChange={(e) => setSelectedSpec(e.target.value)} required>
                                    <option value="" disabled>Select Specialization</option>
                                    {specializations.sort().map((spec, index) => (
                                        <option key={index} value={spec}>{spec}</option>
                                    ))}
                                </select>
                                <select id="gov" className="w-100 mt-4 py-2" value={selectedGov} onChange={(e) => setSelectedGov(e.target.value)} required>
                                    <option value="" disabled>Select Governorate</option>
                                    {governorates.sort().map((gov, index) => (
                                        <option key={index} value={gov}>{gov}</option>
                                    ))}
                                </select>
                                <input type="text" id="hours" placeholder="Work Hours" className="w-100 mt-4 py-2" required/>
                                <input type="text" id="address" placeholder="Address" className="w-100 mt-4 py-2" required/>
                                <input type="text" id="phone" placeholder="Phone Number" className="w-100 mt-4 py-2" required/>
                                <label htmlFor="description" className="mt-4">Description</label>
                                <textarea name="description" rows="6" className="w-100 my-4 rounded-3" id="description" required></textarea>
                            </div>
                        </div>
                    </div>
                    {errorMessage && (
            <div className="row mt-3">
              <div className="item text-danger">{errorMessage}</div>
            </div>
          )}
                    <div className="row justify-content-end">
                        <div className="col-3">
                            <div className="item">
                                <button className="btn w-75 mb-5 py-3 rounded-5 text-white" onClick={getapi}>Submit</button>
                            </div>
                        </div>
                    </div>
                    {loading && (
                        <div className="loading-screen position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bg-light">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default DoctorData;
