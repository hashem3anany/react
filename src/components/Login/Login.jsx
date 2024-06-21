import "./Login.css";
import loginimage from "../../images/signup.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import NavBar from "../NavBar/NavBar";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  let getapi = async () => {
    setLoading(true);

    await axios
      .post(
        "https://ertdemo.azurewebsites.net/api/Login/login",
        {
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("reciver", response.data.userId);
        localStorage.setItem("userType", response.data.userType);

        if (response.data.userType === "A") {
          navigate('/Admin');
        } else {
          navigate('/UserHome');
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <NavBar />
      <div className="Login py-5">
        <div className="Login justify-content-between py-5 d-flex">
          <div className="col-6">
            <div className="item">
              <img src={loginimage} className="w-100" alt="" />
            </div>
          </div>
          <div className="col-5">
            <div className="item p-5">
              <h2 className="">Login</h2>
              <p className="">Enter your details below</p>
              <input id='email' type="email" placeholder='Enter Your Email' className='w-100 mt-4 py-2' />
              <input id='password' type="password" placeholder='Password' className='w-100 mt-4 py-2' />
              {errorMessage && (
            <div className="row mt-3">
              <div className="item text-danger">{errorMessage}</div>
            </div>
          )}
              <button onClick={getapi} className='bt rounded-5 border-0 py-4 px-3 mt-5 w-25 text-white'>Login</button>
              
              <p className="mt-3">Don't have an account? 
                {loading ? (
                  <span>Loading...</span>
                ) : (
                  <Link className="text-decoration-none" to={"/SignUp"}>Create Account</Link>
                )}
              </p>
            </div>
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
    </>
  );
}

export default Login;
