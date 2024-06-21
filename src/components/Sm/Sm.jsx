import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

export default function Sm() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLoginClick = () => {
        setLoading(true);
        setTimeout(() => {
            navigate("/Login");
        }, 1000); // simulate a loading delay
    };
    return (
        <>
            <NavBar />
            <div className="vh-100 d-flex flex-wrap justify-content-center align-items-center text-success position-relative">
                <h2>
                    Data submitted successfully! Please go to <span onClick={handleLoginClick} className="text-decoration-none text-primary" style={{cursor: 'pointer'}}>Login</span>
                </h2>
                <h2 className='text-danger'>
                    your email is not activated wait to check your acount data from admin
                </h2>
                {loading && (
                    <div className="loading-screen position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bg-light">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
