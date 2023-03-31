import React from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import "./Profile.scss";

function Profile() {
  const userToken = localStorage.getItem("token");
  const user = jwtDecode(userToken);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleCartPage = () => {
    navigate("/cart");
  };

  const handleHomePage = () => {
    navigate("/");
  };

  return (
    <>
    <section className="user__profile">
      <div className="user__profile--header">
        <img src={user.image} alt="Avatar" />
        <h3>
          <strong>
            {user.firstName} {user.lastName}
          </strong>
        </h3>
        <p>
          Email: <strong>{user.email}</strong>
        </p>
      </div>
      <div className="user__profile--body">
        <p>
          User Name: <span>{user.username}</span>
        </p>
        <p>
          Expiration Time: <span>{Date(user.exp).toString()}</span>
        </p>
        <div className="user__profile--btns">
          <button onClick={handleHomePage}>Back Home</button>
          <button onClick={handleCartPage}>Cart</button>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </section>
  </>
  );
}

export default Profile;
