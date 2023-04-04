import React from "react";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";


import "./Card.scss";

import { Badge, Typography, Button,Card,CardMedia, CardContent, CardActions} from "@mui/material";
import { useStore } from "../../store/StoreContext";

export const CartItems = ({ product }) => {
  const {chosenProducts, setChosenProducts}= useStore()
  const [quantity, setQuantity] = useState(product.quantity);

  // * Product Quantity Up
  const handleQuantityUp = (product) => {
    setQuantity((prev) => prev + 1);
    updateQuantity({ ...product, quantity: quantity + 1 });
  };
  // * Product Quantity Down
  const handleQuantityDown = (product) => {
    setQuantity((prev) => prev - 1);
    updateQuantity({ ...product, quantity: quantity - 1 });
  };
  const updateQuantity = (updatedProduct) => {
    const updateProducts = chosenProducts.map((item) => {
      if (item.id === updatedProduct.id) {
        return updatedProduct;
      } else {
        return item;
      }
    });
    setChosenProducts(updateProducts);
  };

  // *Remove Item From Cart

  const handleRemoveItem = (product) => {
    const myCartItems = chosenProducts.filter((item) => item.id !== product.id);
    setChosenProducts(myCartItems);
  };

  return (
    <Card className="card">
      <Badge className="quantity-number">{product.quantity}</Badge>
      <CardMedia className="card-header">
        <img src={product?.images?.[0]} width="50px" height="100px" alt="" />
        <Typography>
          <Link to={`/product/${product.id}`}>
            <strong>{product.title}</strong>
          </Link>
        </Typography>
        <Button variant='outlined' color="error"
          onClick={() => handleRemoveItem(product)}
          style={{ color: "red" }}
        >
          Remove
        </Button>
      </CardMedia>
      <CardMedia className="card-body">
        <Typography>
          Brend: <strong>{product.brand}</strong>
        </Typography>
        <Typography>
          category: <strong>{product.category}</strong>
        </Typography>
      </CardMedia>
      <CardActions className="cart-btns">
        <Button variant="outlined" color='secondary'          onClick={() => {
            handleQuantityDown(product);
          }}
        >
          -
        </Button>
        <Typography>Quantity</Typography>
        <Button variant="outlined" color="secondary"
          onClick={() => {
            handleQuantityUp(product);
          }}
        >
          +
        </Button>
      </CardActions>
    </Card>
  );
};

function ProductCard({ product, handleDeleteProduct }) {
  const {handleChosenProduct} = useStore()
  return (
    <Card className="card">
      <CardMedia className="card-header">
        <img src={product.images[0]} width="50px" height="100px" alt="" />
        <Typography>
          <Link to={`/product/${product.id}`}>
            <strong>{product.title}</strong>
          </Link>
        </Typography>
        <Button variant="contained" color="error"
          
          onClick={() => {
            handleDeleteProduct(product.id);
          }}
        >
          Delete
        </Button>
      </CardMedia>
      <CardContent className="card-body">
        <Typography>
          Brend: <strong>{product.brand}</strong>
        </Typography>
        <Typography>
          category: <strong>{product.category}</strong>
        </Typography>
      </CardContent>
      <CardActions className="card-btns">
        <Button variant="contained" color='success' onClick={() => handleChosenProduct(product)}>
          Add To Cart
        </Button>
        <Button variant='contained' color='info' >Edit Product</Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
