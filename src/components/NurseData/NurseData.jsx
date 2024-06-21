import axios from 'axios';
import './NurseData.css';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

const governorates = [
    'Cairo', 'Alexandria', 'Port Said', 'Suez', 'Damietta', 'Dakahlia', 'Beheira',
    'Gharbia', 'Kafr El Sheikh', 'Sharkia', 'Monufia', 'Qalyubia', 'Minya', 'Giza',
    'Faiyum', 'Beni Suef', 'Asyut', 'Sohag', 'Qena', 'Luxor', 'Aswan', 'Red Sea',
    'New Valley', 'Matrouh', 'North Sinai', 'South Sinai', 'Ismailia'
];

export default function NurseData() {
    const [selectedGov, setSelectedGov] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const userId = location.state.userId;
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');


    const clearInputs = () => {
        document.getElementById('Whours').value = '';
        document.getElementById('gov').value = '';
        document.getElementById('hours').value = '';
        document.getElementById('address').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('description').value = '';
        setSelectedGov('');
    };

    let getapi = async () => {
        setLoading(true);

        await axios.post(
            "https://ertdemo.azurewebsites.net/api/MakeAnAccount/AddNurseInfo",
            {
                userId: userId,
                governorates: document.getElementById("gov").value,
                priceperhour: document.getElementById("Whours").value,
                address: document.getElementById("address").value,
                description: document.getElementById("description").value,
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
            console.log(response);
            clearInputs();
            navigate('/Sm');
        })
        .catch((error) => {
            console.log(error);
            if (error.response.data === "Invalid phone number format") {
                setErrorMessage(error.response.data);
            }
            else{
                setErrorMessage("all inputs are required")
            }
        })
        .finally(() => {
            setLoading(false);
        });
    };
    return (
        <>
            <NavBar />
            <div className="py-5 n-data">
                <div className="container position-relative">
                    <div className="row">
                        <div className="col-8">
                            <div className="item">
                                <h2>Nurse DATA</h2>
                                <input type="text" id="Whours" placeholder="Price Per Hour Of work" className="w-100 mt-4 py-2" />
                                <select id="gov" className="w-100 mt-4 py-2" value={selectedGov} onChange={(e) => setSelectedGov(e.target.value)}>
                                    <option value="" disabled>Select Governorate</option>
                                    {governorates.sort().map((gov, index) => (
                                        <option key={index} value={gov}>{gov}</option>
                                    ))}
                                </select>
                                <input type="text" id="hours" placeholder="Work Hours" className="w-100 mt-4 py-2" />
                                <input type="text" id="address" placeholder="Address" className="w-100 mt-4 py-2" />
                                <input type="text" id="phone" placeholder="Phone Number" className="w-100 mt-4 py-2" />
                                <label htmlFor="description" className="mt-4">Description</label>
                                <textarea name="description" rows="6" className="w-100 my-4 rounded-3" id="description"></textarea>
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
