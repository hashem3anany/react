import UserNav from "../UserNav/UserNav";
import "./DrProfile.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function DrProfile() {
  let id = localStorage.getItem("chat");
  let Ud =localStorage.getItem("userId");
  let [data, setData] = useState({});
  let [rating, setRating] = useState(0);
  let [showRatingPopup, setShowRatingPopup] = useState(false);
  let [hoverRating, setHoverRating] = useState(0);
  let [newRating, setNewRating] = useState(0);
  let [err,seterr]=useState()


  useEffect(() => {
    const getApi = async () => {
      try {
        const response = await axios.post(
          "https://ertdemo.azurewebsites.net/api/Doctor/GetDoctorProfil1",
          { userId: id },
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        setData(response.data);
        console.log(response.data);
        setRating(response.data.mostFrequentRating);
      } catch (error) {
        console.log(error);
      }
    };
    getApi();
  }, [id]);

  const renderStars = (rating, onClick, onMouseOver, onMouseOut) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa-solid fa-star${i < rating ? " star" : ""}`}
          onClick={() => onClick && onClick(i + 1)}
          onMouseOver={() => onMouseOver && onMouseOver(i + 1)}
          onMouseOut={() => onMouseOut && onMouseOut()}
        ></i>
      );
    }
    return stars;
  };

  const handleRatingSubmit = async () => {
    try {
      const response = await axios.post(
        "https://ertdemo.azurewebsites.net/api/Rating/AddRating1",
        { doctorOrnursId: id, ratingValue: newRating , userId:Ud },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      console.log(response.data);
      setShowRatingPopup(false);
      setRating(newRating);
    } catch (error) {
      seterr(error.response.data)
    }
  };

  return (
    <>
      <UserNav />
      <div className="dr-profile container vh-100">
        <p>Account / DOCTORS / {data.username}</p>
        <div className="row p-5 justify-content-between">
          <div className="col-4">
            <div className="item rounded-4">
              <img src={data.profileImage} className="w-100 h-100" alt="" />
            </div>
          </div>
          <div className="col-4">
            <div className="item rounded-4 p-5">
              <h2 className="text-center mb-3">Basic Information</h2>
              <h2>Name: {data.username}</h2>
              <p>{data.speciality}</p>
              <p>{data.description}</p>
              <p>Mon/Wed: {data.workTime}</p>
              <div className="rate my-3">{renderStars(rating)}</div>
              <Link to="/Chat" onClick={() => localStorage.setItem("reciver", id)}>
                <button className="btn text-white rounded-5 p-3 w-50 mx-auto" id="ap">
                  Chat With Me
                </button>
              </Link>
              <button className="btn text-white" onClick={() => setShowRatingPopup(true)}>
                <i className="fa-solid star ms-3 fa-star-half-stroke"></i> rate me
              </button>
            </div>
          </div>
          <div className="col-4">
            <div className="item rounded-4 p-5">
              <h2 className="text-center">Address</h2>
              <p>{data.address}</p>
              <p>{data.governorates}</p>
              <p>Phone Number: {data.phoneNumber}</p>
            </div>
          </div>
        </div>
        {showRatingPopup && (
          <div className="rating-popup">
            <div className="rating-popup-content w-25 h-25 rounded-4">
              <h3>Rate Me</h3>
              <div className="stars my-3">
                {renderStars(newRating, setNewRating, setHoverRating, () => setHoverRating(0))}
              </div>
              <button onClick={handleRatingSubmit} className="btn btn-primary">
                Submit
              </button>
              <button onClick={() => setShowRatingPopup(false)} className="btn ms-3 btn-secondary">
                Cancel
              </button>
              <h4 className="text-danger">{err}</h4>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
