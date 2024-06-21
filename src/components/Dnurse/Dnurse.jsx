import "./Dnurse.css";
import UserNav from "../UserNav/UserNav";
import axios from "axios";
import { useEffect, useState } from "react";


const governorates = [
  'Cairo', 'Alexandria', 'Port Said', 'Suez', 'Damietta', 'Dakahlia', 'Beheira',
  'Gharbia', 'Kafr El Sheikh', 'Sharkia', 'Monufia', 'Qalyubia', 'Minya', 'Giza',
  'Faiyum', 'Beni Suef', 'Asyut', 'Sohag', 'Qena', 'Luxor', 'Aswan', 'Red Sea',
  'New Valley', 'Matrouh', 'North Sinai', 'South Sinai', 'Ismailia'
];

export default function Dnurse() {
  const [userData, setUserData] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const userId = localStorage.getItem('userId');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedGov, setSelectedGov] = useState('');

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
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data);
    }
  };

  const handleSubmit = async () => {
    await axios.post(
      "https://ertdemo.azurewebsites.net/api/Nurse/UpdateNurseUsername1",
      {
        userId: userId,
        newUsername: document.getElementById("name").value ,
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
  }
  const handlephone = async () => {
    await axios.post(
      "https://ertdemo.azurewebsites.net/api/Nurse/UpdateNursePhoneNum1",
      {
        userId: userId,
        PhoneNum: document.getElementById("phone").value,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      setErrorMessage(error.response.data);
    });

    // Clear input after button press
    document.getElementById("phone").value = "";
  }
  const handleadd = async () => {
    await axios.post(
      "https://ertdemo.azurewebsites.net/api/Nurse/UpdateNurseDescription1",
      {
        userId: userId,
        Description: document.getElementById("address").value,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      console.log(response);

    })
    .catch((error) => {
      console.log(error);
      setErrorMessage(error.response.data);
    });

    // Clear input after button press
    document.getElementById("address").value = "";
  }
  const handlework = async () => {
    await axios.post(
      "https://ertdemo.azurewebsites.net/api/Nurse/UpdateNurseWorkTime1",
      {
        userId: userId,
        WorkTime: document.getElementById("work").value,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      console.log(response);
 
    })
    .catch((error) => {
      console.log(error);
      setErrorMessage(error.response.data);
    });

    // Clear input after button press
    document.getElementById("work").value = "";
  } 
  const handleprice = async () => {
    await axios.post(
      "https://ertdemo.azurewebsites.net/api/Nurse/UpdateNursePriceperhour1",
      {
        userId: userId,
        priseperhour: document.getElementById("price").value,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      console.log(response);

    })
    .catch((error) => {
      console.log(error);
      setErrorMessage(error.response.data);
    });

    // Clear input after button press
    document.getElementById("price").value = "";
  }
  const handlegov = async () => {
    await axios.post(
      "https://ertdemo.azurewebsites.net/api/Nurse/UpdateNurseGovernorates1",
      {
        userId: userId,
        Governorates: selectedGov,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      console.log(response);

    })
    .catch((error) => {
      console.log(error);
      setErrorMessage(error.response.data);
    });

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
                <h4 className="text-end">{userData ? userData.username : ''}</h4>
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
                <button className='btn  btn-primary mt-3' onClick={handleSubmit}>Submit</button>
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
            <div className="col-6">
              <div className="item">
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  
                  placeholder="Phone"
                  className="form-control"
                />
                <button className='btn btn-primary mt-3' onClick={handlephone}>Submit</button>
              </div>
            </div>
            <div className="col-6">
              <div className="item">
                <input
                  type="text"
                  id="address"
                  name="Address"
                  placeholder="description"
                  className="form-control"
                />
                <button className='btn btn-primary mt-3' onClick={handleadd}>Submit</button>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
            <div className="item">
              <input
                type="text"
                id="work"
                placeholder="Work Time"
                className="form-control"
              />
              <button className='btn btn-primary mt-3' onClick={handlework}>Submit</button>
            </div>
            </div>    
            <div className="col-6">
            <div className="item">
              <input
                type="text"
                id="price"
                placeholder="Price per Hour"
                className="form-control"
              />
              <button className='btn btn-primary mt-3' onClick={handleprice}>Submit</button>
            </div>
            </div>    
            
          </div>
          <div className="row mt-3">    
            <div className="item">
            <select id="gov" className="w-100 mt-4 py-2" value={selectedGov} onChange={(e) => setSelectedGov(e.target.value)} required>
                                    <option value="" disabled>Select Governorate</option>
                                    {governorates.sort().map((gov, index) => (
                                        <option key={index} value={gov}>{gov}</option>
                                    ))}
                                </select>
              <button className='btn btn-primary mt-3' onClick={handlegov}>Submit</button>
            </div>
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

// Add the CSS content to Ddoctor.css as needed to style the component accordingly.
