import React, { useState } from "react";
import "./NavBar.scss";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function NavBar({ chosenProducts }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const userToken = localStorage.getItem("token");
  const user = jwtDecode(userToken);

  return (
    <header className="navigation">
      <nav className="navbar">
        <ul className=" navbar-list">
          <div>
            <li>
              <Link to="/">Home</Link>
            </li>
          </div>
          <div className="cart-login">
            <li>
              <Link to="/cart">
                Cart{" "}
                <span
                  style={{
                    color: chosenProducts.length === 0 && "red",
                  }}
                >
                  {chosenProducts.length}
                </span>
              </Link>
            </li>
            <li>
              <Link to={"/profile"}>
                <img src={user.image} width="40px" alt="UserAvatar" />{" "}
                {user.firstName}
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
