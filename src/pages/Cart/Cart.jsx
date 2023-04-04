import React from "react";
import {CartItems} from "../../components/Card";
import './Cart.scss'

import { Box,Typography } from "@mui/material";

function Cart({ chosenProducts, setChosenProducts }) {
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
