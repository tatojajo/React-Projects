import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "./NavBar.scss";

function NavBar({ chosenProducts, setSearchResult }) {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  // *handleSearchResults
  const handleSearchReuslts = async (e, value) => {
    e.preventDefault();
    const searchEndpoint = await axios(
      `https://dummyjson.com/products/search?q=${value}`
    );
    const {
      data: { products },
    } = searchEndpoint;
    setSearchResult(products);
  };

  // * Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  // * Decode Token
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
          <div>
            <form onSubmit={(e) => handleSearchReuslts(e, searchInput)}>
              <input
                type="search"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button>Search</button>
            </form>
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
