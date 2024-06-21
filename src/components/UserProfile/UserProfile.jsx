import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNav from '../UserNav/UserNav';
import './UserProfile.css';

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const userId = localStorage.getItem('userId');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getapi(); // Initial fetch
  }, [userId]); // Run effect whenever userId changes

  const getapi = async () => {
    try {
      const response = await axios.post(
        "https://ertdemo.azurewebsites.net/api/User/GetUseProfil1",
        { userId: userId },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setUserData(response.data);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data);
    }
  };

  const handleSubmit = async () => {
    await axios.post(
      "https://ertdemo.azurewebsites.net/api/User/UpdateUserUsername1",
      {
        userId: userId,
        newUsername: document.getElementById("name").value,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      console.log(response);
      getapi(); // Call getapi function after button press
    })
    .catch((error) => {
      console.log(error);
      setErrorMessage(error.response.data);
    });

    // Clear input after button press
    document.getElementById("name").value = "";
  };

  const handleChangeImage = async () => {
    if (!profileImage) {
      console.error("No image selected.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("file", profileImage);

    try {
      const response = await axios.post(
        "https://ertdemo.azurewebsites.net/api/Profileimge/profile-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      getapi(); // Call getapi function after button press
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data);
    }
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleChangePassword = async () => {
    await axios.post(
      "https://ertdemo.azurewebsites.net/api/password/change-password",
      {
        userId: userId,
        newPassword: newPassword,
        oldPassword: currentPassword,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      console.log(response);
      getapi(); // Call getapi function after button press
    })
    .catch((error) => {
      console.log(error);
      setErrorMessage(error.response.data);
    });

    // Clear inputs after button press
    setNewPassword('');
    setCurrentPassword('');
  };
  return (
    <>
      <UserNav />
      <div className="ddoctor d-flex align-items-center p-5">
        <div className="container w-50 p-5 rounded-4 shad">
          <div className="row">
            <div className="col-6 d-flex align-items-center">
              <div className="item">
                <h2 className="align-content-center">Edit Profile</h2>
              </div>
            </div>
            <div className="col-6">
              <div className="item text-end">
                <img
                  src={userData ? userData.profileImage : ''}
                  className="w-25 rounded-4"
                  alt="Profile"
                />
                <h4>{userData ? userData.username : ''}</h4>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <div className="item">
                <input
                  type="text"
                  id='name'
                  name="userName"
                  
                  placeholder="UserName"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="item">
                <input
                  type="text"
                  name="email"
                  value={userData ? userData.userEmail : ''}
                  placeholder="Email"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <button className='btn btn-primary mt-3' onClick={handleSubmit}>Submit</button>
          </div>
          <div className="row mt-3">
            <div className="item">
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="row mt-3">
            <button className='btn btn-primary mt-3' onClick={handleChangeImage}>Change Image</button>
          </div>
          <div className="row mt-3">
            <div className="item">
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current password"
                className="form-control"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="item">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className="form-control"
              />
            </div>
          </div>
          
          <div className="row mt-3">
            <button className='btn btn-primary mt-3' onClick={handleChangePassword}>Change Password</button>
          </div>
          {errorMessage && (
            <div className="row mt-3">
              <div className="item text-danger">{errorMessage}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
