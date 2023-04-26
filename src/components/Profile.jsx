import React, { useEffect, useState } from "react";
import "./css/Profile.css";
import { profile } from "./js/Login";
import { updateProfile } from "./js/Login";

const Profile = () => {
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState([]);

  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [address, setAddress] = useState(userData.address);
  const [city, setCity] = useState(userData.city);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchData = async () => {
    const profileData = await profile(userId);
    setUserData(profileData);
  };

  const handleUpdateProfile = async () => {
    const response = await updateProfile(
      { name, email, address, city },
      userId
    );
    if (response && response.status === 200) {
      setSuccessMessage(response.data.message);
      fetchData();

      setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <body>
      <div className="container-profile">
        {userData && (
          <>
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            <div className="mb-3 row">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Nombre
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="staticEmail"
                  onChange={(event) => setName(event.target.value)}
                  defaultValue={userData.name}
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="inputPassword"
                className="col-sm-2 col-form-label"
              >
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword"
                  onChange={(event) => setEmail(event.target.value)}
                  defaultValue={userData.email}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="inputPassword"
                className="col-sm-2 col-form-label"
              >
                address
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword"
                  onChange={(event) => setAddress(event.target.value)}
                  defaultValue={userData.address}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="inputPassword"
                className="col-sm-2 col-form-label"
              >
                birthdate
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword"
                  defaultValue={userData.birthdate}
                  readOnly
                  disabled
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="inputPassword"
                className="col-sm-2 col-form-label"
              >
                City
              </label>
              <div className="col-sm-10">
                <input
                  type="location"
                  className="form-control"
                  id="inputPassword"
                  onChange={(event) => setCity(event.target.value)}
                  defaultValue={userData.city}
                />
              </div>
            </div>
          </>
        )}
        <div className="d-flex actions-buttons row">
              <button
                className="btn btn-primary btn-sm col"
                onClick={() => handleUpdateProfile()}
              >
                Actualizar
              </button>
              <a href="/home"><button className="btn btn-danger btn-sm col">Atras</button></a>
            </div>
      </div>
      
    </body>
  );
};

export default Profile;
