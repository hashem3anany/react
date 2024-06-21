import './UserHome.css'
import logo from "../../images/homelogo.png";
import dr from "../../images/needdoc.png";
import nur from "../../images/neednurse.png";
import bone from "../../images/bone.png"
import brain from "../../images/brain.png"
import breast from "../../images/breast.png"
import { Link} from "react-router-dom";
import UserNav from '../UserNav/UserNav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function UserHome() {
  const [topRated, setTopRated] = useState([]);

useEffect(() => {
  const fetchTopRated = async () => {
    try {
      const response = await axios.get('https://ertdemo.azurewebsites.net/api/Rating/top-rated');
      setTopRated(response.data);
      console.log(response);
      
    } catch (error) {
      console.error('Error fetching top-rated:', error);
    }
  };

  fetchTopRated();
}, []);
   return(<>
   {
    <>
    <UserNav />
      <div className="homesection">
      <div className="home text-white vh-100">
        <div className="layer d-flex align-items-center justify-content-center">
          <div className="content">
            <div className="logo text-center">
              <img src={logo} alt="" />
            </div>
            <div className="hometext mt-4 text-center">
              <h1 className="mb-5">Medico</h1>
              <p className="">
                Know results of your x-ray <br /> Consult appropriate doctor
              </p>
            </div>
          </div>
        </div>
      </div>
     <div className="crdoctor p-5">
      <div className="container my-5 position-relative">
        <div id="carouselExampleIndicators" className="carousel slide">
          <div className="carousel-indicators position-absolute">
            {topRated.map((item, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : ''}
                aria-current={index === 0 ? 'true' : 'false'}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner text-center">
            {topRated.map((item, index) => (
              <div
                key={item.userId}
                className={`carousel-item p-4 rounded-3 mb-3 ${index === 0 ? 'active' : ''}`}
              >
                <div className="imgd mx-auto text-center rounded-circle w-25">
                  <img src={item.userprofileimge} alt={item.username} />
                </div>
                <Link className='text-decoration-none text-black' onClick={()=>localStorage.setItem("chat",item.userId)} to={`${item.userType === "N" ? "/NrProfile": "/DrProfile"}`}>
                <h2 className="drname mt-3">
                  {item.userType.toLowerCase() === 'd' ? 'Dr. ' : 'Nurse '}
                  {item.username}
                </h2>
                </Link>
                <p className="drdesc w-75 mx-auto mt-3">
                  {item.description}
                </p>
                <div className="text-center d-inline-block mx-auto mb-3">
                  <div className="rate d-flex justify-content-center">
                    {Array.from({ length: 5  }).map((_, i) => (
                      <div key={i} className={i <= item.mostFrequentRating ? "star me-2" : "gray me-2"}>
                        <FontAwesomeIcon icon={faStar} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

      <div className="need-doctor my-5">
        <div className="container">
          <div className="row my-5">
            <div className="col-6 d-flex align-items-center justify-content-center">
              <div className="item text-center">
                <h2>Need Doctors?</h2>
                <p className="my-5 w-75 mx-auto">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <Link to="/DoctorList"><button className="btn w-50 rounded-5 text-white px-5 py-3 ">
                  View All Doctors
                </button></Link>
              </div>
            </div>
            <div className="col-6">
              <div className="item text-end">
                <img src={dr} alt=""/>
              </div>
            </div>
          </div>
          <div className="row my-5">
            <div className="col-6">
              <div className="item">
                <img src={nur} alt="" />
              </div>
            </div>
            <div className="col-6 d-flex align-items-center justify-content-center  ">
              <div className="item text-center">
                <h2>Need Health Care?</h2>
                <p className="my-5 mx-auto w-75 ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <Link to="/NurseList"><button className="btn w-50 rounded-5 text-white px-5 py-3 ">
                  View All nurses
                </button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="services text-center p-5 my-5">
        <h2 className="mb-3">Our Services</h2>
        <p className="servicetext">You can know results of x-ray of these specialties</p>
        <div className="container">
          <div className="row justify-content-evenly my-5 text-white">
          <div className="col-3"><Link className='text-decoration-none text-white'  to={"/Bone"}><div className="item rounded-3 py-4 text-center"><img src={bone} alt="" /><p className="mb-5 mt-4">Bone fractures</p></div></Link></div>
            <div className="col-3"><Link className='text-decoration-none text-white' to={"/Brain"}><div className="item rounded-3 py-4 text-center"><img src={brain} alt="" /><p className="mb-5 mt-4">Brain tumor</p></div></Link></div>
            <div className="col-3"><Link className='text-decoration-none text-white' to={"/Breast"}><div className="item rounded-3 py-4 text-center"><img src={breast} alt="" /><p className="mb-5 mt-4"> Breast cancer</p></div></Link></div>
          </div>
        </div>
      </div>
    </div>
    </>
    
   }
   </>
    )
}
export default UserHome;