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


const RoutesBeforeLogin = ()=>{
  const [chosenProducts, setChosenProducts] = useState([]);
  // * Handle ChosenProduct

  const handleChosenProduct = (product) => {
    setChosenProducts((prev) => {
      const indexOfProduct = prev.findIndex((item) => item.id === product.id);
      if (indexOfProduct === -1) {
        return [...prev, { ...product, quantity: 1 }]};
      
      return prev;
    });
  };
  return (
    <>
      <Navigation chosenProducts={chosenProducts} />
      <Routes>
        <Route
          path="/"
          element={<Home handleChosenProduct={handleChosenProduct} />}
        />
        <Route
          path="/cart"
          element={<Cart chosenProducts={chosenProducts} setChosenProducts={setChosenProducts} />}
        />
        <Route
          path="/product/:id"
          element={<Product handleChosenProduct={handleChosenProduct} />}
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
        <Route path="/*" element={<RoutesBeforeLogin/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;
