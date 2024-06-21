import "./SignUp.css";
import { Link } from "react-router-dom";
import signupimage from "../../images/login.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBar from "../NavBar/NavBar";

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function cleardata() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("email").value = "";
    const radioButtons = document.getElementsByName("Type");
    radioButtons.forEach(radio => radio.checked = false);
  }

  function getSelectedRadioValue(name) {
    const radioButtons = document.getElementsByName(name);
    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        return radioButton.value;
      }
    }
    return null;
  }

  let getapi = async () => {
    const selectedType = getSelectedRadioValue("Type");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://ertdemo.azurewebsites.net/api/SignUp/signup",
        {
          username: document.getElementById("username").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
          type: selectedType
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data.userId != null) {
        document.getElementById("response").innerHTML = "Account has been created successfully";
        cleardata();
      }

      switch (response.data.userType) {
        case 'U':
          navigate('/Login');
          break;
        case 'D':
          navigate('/DoctorData', { state: { userId: response.data.userId } });
          break;
        case 'N':
          navigate('/NurseData', { state: { userId: response.data.userId } });
          break;
        default:
          navigate('/Error');
      }
    } catch (error) {
      console.log(error);

        setErrorMessage(error.response.data);
        cleardata();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="signup py-5">
        <div className="signup justify-content-between py-5 d-flex">
          <div className="col-6">
            <div className="item">
              <img src={signupimage} className="w-100" alt="" />
            </div>
          </div>
          <div className="col-5">
            <div className="item p-5">
              <h2 className=''>Create an account</h2>
              <p className=''>Enter your details below</p>
              <input id='username' type="text" placeholder='Name' className='w-100 mt-4 py-2' />
              <input id='email' type="email" placeholder='Enter Your Email' className='w-100 mt-4 py-2' />
              <input id='password' type="password" placeholder='password' className='w-100 mt-4 py-2' />
              <input className="mt-5" type="radio" id="User" name="Type" value="U" />
              <label htmlFor="User">Patient</label><br />
              <input className="mt-3" type="radio" id="Doctor" name="Type" value="D" />
              <label htmlFor="Doctor">Doctor</label><br />
              <input className="mt-3" type="radio" id="Nurse" name="Type" value="N" />
              <label htmlFor="Nurse">Nurse</label><br />
                {errorMessage && (
                <div className="row mt-3">
                  <div className="item text-danger">{errorMessage}</div>
                </div>
              )}
              <button onClick={getapi} className='bt rounded-5 border-0 py-4 px-3 mt-5 w-50 text-white'>Create Account</button>
              <p id='response' className='w-100 mt-4 py-2'></p>
              <p className='mt-3'> Do You Have Account?<Link className='text-decoration-none' to={"/Login"}>Login</Link></p>
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div className="loading-screen position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bg-light">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden"><i className="fa-solid fa-10x fa-spinner fa-spin"></i></span>
          </div>
        </div>
      )}
    </>
  );
}
