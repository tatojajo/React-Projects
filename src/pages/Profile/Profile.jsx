import React from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { Box,Typography,Button } from "@mui/material";
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
    <Box className="user__profile">
      <Box className="user__profile--header">
        <img src={user.image} alt="Avatar" />
        <h3>
          <strong>
            {user.firstName} {user.lastName}
          </strong>
        </h3>
        <Typography>
          Email: <strong>{user.email}</strong>
        </Typography>
      </Box>
      <Box className="user__profile--body">
        <Typography>
          User Name: <span>{user.username}</span>
        </Typography>
        <Typography>
          Expiration Time: <span>{Date(user.exp).toString()}</span>
        </Typography>
        <Box className="user__profile--btns">
          <Button variant='contained' onClick={handleHomePage}>Back Home</Button>
          <Button variant="contained" onClick={handleCartPage}>Cart</Button>
          <Button variant="contained" onClick={handleLogout}>Log Out</Button>
        </Box>
      </Box>
    </Box>
  </>
  );
}

export default Profile;
