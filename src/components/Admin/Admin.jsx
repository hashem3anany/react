import axios from "axios";
import "./Admin.css";
import { useEffect, useState } from "react";

export default function Admin() {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [comments, setComments] = useState([]);

  const deleteNurse = async (userId) => {
    try {
      const response = await axios.post(
        "https://ertdemo.azurewebsites.net/api/Nurse/DeleteNurse",
        {
          id: userId
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setData(response.data); // Update the data after deletion
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDoctor = async (doctorId) => {
    try {
      const response = await axios.post(
        "https://ertdemo.azurewebsites.net/api/Doctor/DeleteDoctor",
        {
          id: doctorId
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setData(response.data); // Update the data after deletion
    } catch (error) {
      console.error(error);
    }
  };

  const inactiveUserd = async (userId) => {
    try {
      const response = await axios.post(
        "https://ertdemo.azurewebsites.net/api/Admin/InActivateUser",
        { id: userId },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setData(response.data);
      adoctor();
    } catch (error) {
      console.error(error);
    }
  };

  const inactiveUsern = async (userId) => {
    try {
      const response = await axios.post(
        "https://ertdemo.azurewebsites.net/api/Admin/InActivateUser",
        { id: userId },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setData(response.data);
      anurse();
    } catch (error) {
      console.error(error);
    }
  };

  const activeusern = async (e) => {
    await axios
      .post("https://ertdemo.azurewebsites.net/api/Admin/ActivateUser", {
        id: e
      }, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setData(response.data);
        inurse();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const activeuserd = async (e) => {
    await axios
      .post("https://ertdemo.azurewebsites.net/api/Admin/ActivateUser", {
        id: e
      }, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setData(response.data);
        idoctor();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const idoctor = async () => {
    setActiveTab("inactiveDoctors");
    await axios.get("https://ertdemo.azurewebsites.net/api/Admin/InactiveDoctors", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const adoctor = async () => {
    setActiveTab("activeDoctors");
    await axios
      .get("https://ertdemo.azurewebsites.net/api/Admin/ActiveDoctors", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        document.getElementById("fc").innerHTML = `<h2>no data</h2>`;
        console.log(error);
      });
  };

  const inurse = async () => {
    setActiveTab("inactiveNurses");
    await axios
      .get("https://ertdemo.azurewebsites.net/api/Admin/GetInactiveNurse", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const anurse = async () => {
    setActiveTab("activeNurses");
    await axios
      .get("https://ertdemo.azurewebsites.net/api/Admin/GetActiveNurse", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        document.getElementById("fc").innerHTML = `<h2>no data</h2>`;
        console.log(error);
      });
  };

  const getComments = async () => {
    setActiveTab("comments");
    await axios
      .get("https://ertdemo.azurewebsites.net/api/Admin/all-comments", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    idoctor();
  }, []);

  return (
    <>
      <div className="Admin vh-100 py-5 pe-5">
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-2">
              <div className="item">
                <ul className="tabs">
                  <li className="tablink" onClick={idoctor}>
                    Inactive Doctors
                  </li>
                  <li className="tablink mt-3" onClick={adoctor}>
                    Active Doctors
                  </li>
                  <li className="tablink mt-3" onClick={inurse}>
                    Inactive Nurses
                  </li>
                  <li className="tablink mt-3" onClick={anurse}>
                    Active Nurses
                  </li>
                  <li className="tablink mt-3" onClick={getComments}>
                    Comments
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-10 h-100">
              <div className="table h-100 rounded-3 overflow-scroll bg-white">
                <div className="table-responsive">
                  {activeTab === "activeDoctors" ? (
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Description</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Speciality</th>
                          <th scope="col">Address</th>
                        </tr>
                      </thead>
                      <tbody id="fc">
                        {Array.isArray(data) && data.map((doctor, index) => (
                          <tr key={index}>
                            <td>{doctor.username}</td>
                            <td>{doctor.userEmail}</td>
                            <td>{doctor.userDiscraption}</td>
                            <td>{doctor.phoneNumber}</td>
                            <td>{doctor.uesrSpeciality}</td>
                            <td>{doctor.address}</td>
                            <td>
                              <button className="btn btn-warning" onClick={() => { inactiveUserd(doctor.userId); }}>
                                Inactivate
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-danger" onClick={() => deleteDoctor(doctor.userId)}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : activeTab === "inactiveDoctors" ? (
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Description</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Speciality</th>
                          <th scope="col">Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(data) && data.map((doctor, index) => (
                          <tr key={index}>
                            <td>{doctor.username}</td>
                            <td>{doctor.userEmail}</td>
                            <td>{doctor.userDiscraption}</td>
                            <td>{doctor.phoneNumber}</td>
                            <td>{doctor.uesrSpeciality}</td>
                            <td>{doctor.address}</td>
                            <td>
                              <button className="btn btn-primary" onClick={() => { activeuserd(doctor.userId); }}>
                                Activate
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-danger" onClick={() => deleteDoctor(doctor.userId)}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : activeTab === "activeNurses" ? (
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Description</th>
                          <th scope="col">Phone</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(data) && data.map((nurse, index) => (
                          <tr key={index}>
                            <td>{nurse.username}</td>
                            <td>{nurse.userEmail}</td>
                            <td>{nurse.userDiscraption}</td>
                            <td>{nurse.phoneNumber}</td>
                            <td>
                              <button className="btn btn-warning" onClick={() => { inactiveUsern(nurse.userId); }}>
                                Inactivate
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-danger" onClick={() =>  deleteNurse(nurse.userId)}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : activeTab === "inactiveNurses" ? (
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Description</th>
                          <th scope="col">Phone</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(data) && data.map((nurse, index) => (
                          <tr key={index}>
                            <td>{nurse.username}</td>
                            <td>{nurse.userEmail}</td>
                            <td>{nurse.userDiscraption}</td>
                            <td>{nurse.phoneNumber}</td>
                            <td>
                              <button className="btn btn-primary" onClick={() => { activeusern(nurse.userId); }}>
                                Activate
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-danger" onClick={() => deleteNurse(nurse.userId)}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : activeTab === "comments" ? (
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Comment</th>
                          <th scope="col">Name</th>
                          <th scope="col">phone</th>
                          <th scope="col">Email</th>
                          <th scope="col">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(comments) && comments.map((comment, index) => (
                          <tr key={index}>
                            <td>{comment.content}</td>
                            <td>{comment.name}</td>
                            <td>{comment.phoneNum}</td>
                            <td>{comment.email}</td>
                            <td>{comment.timestamp}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : " "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
