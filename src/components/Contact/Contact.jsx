import React, { useState } from 'react';
import NavBar from "../NavBar/NavBar";
import "./Contact.css";
import axios from 'axios';
import qs from 'qs';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNum: '',
    message: ''
  });

  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phoneNum, message } = formData;

    try {
      const response = await axios.post(
        'https://ertdemo.azurewebsites.net/api/Admin/add-comment',
        qs.stringify({
          name,
          email,
          phoneNum,
          content: message
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      if (response.status === 200) {
        setStatusMessage('Message sent successfully');
        setFormData({
          name: '',
          email: '',
          phoneNum: '',
          message: ''
        });
      } else {
        setStatusMessage('Error sending message');
      }
    } catch (error) {
      console.error('Error sending message', error);
      setStatusMessage('Error sending message');
    }
  };

  return (
    <>
      <NavBar />
      <section className="contact d-flex flex-wrap justify-content-center align-items-center vh-100">
        <div className="container mb-5">
          <div className="head px-5 mb-5">
            <p>Home / <span>contact</span></p>
          </div>
          <div className="row justify-content-around">
            <div className="col-3 sh">
              <div className="item p-3">
                <div className="f py-3">
                  <h2>
                    <span className="rounded-circle p-3 text-white me-3">
                      <i className="fa-solid fa-phone"></i>
                    </span>
                    Call To Us
                  </h2>
                  <p className="mt-4">We are available 24/7, 7 days a week.</p>
                  <p>Phone: +8801611112222</p>
                </div>
                <div className="s mt-5">
                  <h2>
                    <span className="rounded-circle p-3 text-white me-3">
                      <i className="fa-regular fa-envelope"></i>
                    </span>
                    Write To Us
                  </h2>
                  <p className="mt-4">Fill out our form and we will contact you within 24 hours.</p>
                  <p>Emails: customer@xpert.com</p>
                  <p>Emails: support@xpert.com</p>
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="item p-4">
                <div className="container">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-4">
                        <div className="item">
                          <input
                            type="text"
                            name="name"
                            className="form-control gr"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="item">
                          <input
                            type="email"
                            name="email"
                            className="form-control gr"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="item">
                          <input
                            type="text"
                            name="phoneNum"
                            className="form-control gr"
                            placeholder="Your Phone"
                            value={formData.phoneNum}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="item my-4">
                          <textarea
                            rows="10"
                            name="message"
                            className="gr form-control"
                            placeholder="Your message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                          ></textarea>
                        </div>
                      </div>
                      <button
                        type="submit"
                        id="sendbtn"
                        className="btn ms-auto w-25 py-3 rounded-5"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                  {statusMessage && <p className="mt-3">{statusMessage}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
