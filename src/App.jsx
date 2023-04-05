import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";


import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import { isAutenticated } from "./helpers/autentication";
import { useStore } from "./store/StoreContext";



const RoutesAfterLogin = ()=>{

  return (
    <>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/cart"
          element={<Cart />}
        />
        <Route
          path="/product/:id"
          element={<Product />}
        />
      </Routes>
    </>
  );
};



function App() {
 const navigation = useNavigate()

 useEffect(()=>{
if(!isAutenticated()) navigation('/login')
 },[isAutenticated()])
    

  return (
    <>
      <Routes>
        <Route path="/*" element={<RoutesAfterLogin/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;
