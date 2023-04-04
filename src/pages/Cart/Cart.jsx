import React from "react";
import {CartItems} from "../../components/Card";
import './Cart.scss'
import { useStore } from "../../store/StoreContext";
import { Box,Typography } from "@mui/material";

function Cart() {
  const {chosenProducts, setChosenProducts} = useStore()
  return (
    <Box className="chosen__product--container">
      <Typography className="chosen__product--container-title">My Cart</Typography>
      <Box className="chosen__product--container-content">
        {chosenProducts.map((product) => {
          return <CartItems product={product} key={product.id}  setChosenProducts={setChosenProducts} chosenProducts={chosenProducts}/>;
        })}
      </Box>
    </Box>
  );
}

export default Cart;
