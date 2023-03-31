import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.scss";


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
    <section className="login__page-container">
      <div className="login__page-container-inpurs">
        <div>
          <label htmlFor="usename">User Name</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="UserName"
            value={user.username}
            onChange={handleInputValues}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={user.password}
            onChange={handleInputValues}
          />
        </div>
      </div>
      <div className="login__page-container-btn">
        <button onClick={handleLogin}>Log In</button>
      </div>
    </section>
  );
}

export default Login;
