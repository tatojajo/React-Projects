import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

import { AppBar, Typography, Button,Box,Toolbar, List, ListItem, ListItemText,TextField, FormControl} from "@mui/material";

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
    <AppBar className="navigation" position="static">
      <Toolbar className="navbar">
        <List className=" navbar-list">
          <Box>
            <ListItem>
              <Link to="/">Home</Link>
            </ListItem>
          </Box>
          <Box>
            <form onSubmit={(e) => handleSearchReuslts(e, searchInput)}>
              <TextField
                type="search"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Button variant="contained" color='warning'>Search</Button>
            </form>
          </Box>
          <Box className="cart-login">
            <ListItem>
              <Link to="/cart">
                Cart{" "}
                <ListItemText
                  style={{
                    color: chosenProducts.length === 0 && "red",
                  }}
                >
                  {chosenProducts.length}
                </ListItemText>
              </Link>
            </ListItem>
            <ListItem>
              <Link to={"/profile"}>
                <img src={user.image} width="40px" alt="UserAvatar" />{" "}
                {user.firstName}
              </Link>
            </ListItem>
            <List>
              <Button variant="contained" color="error" onClick={handleLogout}>Log Out</Button>
            </List>
          </Box>
        </List>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
