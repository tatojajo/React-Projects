import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.scss";

import { Box, InputLabel, Input, FormLabel, Button } from "@mui/material";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
      const { data } = await axios.post("https://dummyjson.com/auth/login", {
        username: user.username,
        password: user.password,
      });
      localStorage.setItem("token", data.token);
      navigate("/");
    }catch(err){
      alert(err.message)
    }


    
  };

  const handleInputValues = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Box className="login__page-container">
      <Box className="login__page-container-inpurs">
        <Box>
          <InputLabel htmlFor="usename">User Name</InputLabel>
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="UserName"
            value={user.username}
            onChange={handleInputValues}
          />
        </Box>
        <Box>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={user.password}
            onChange={handleInputValues}
          />
        </Box>
      </Box>
      <Box className="login__page-container-btn">
        <Button onClick={handleLogin}>Log In</Button>
      </Box>
    </Box>
  );
}

export default Login;
