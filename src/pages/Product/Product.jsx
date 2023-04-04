import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, Form } from "react-router-dom";
import axios from "axios";

import "./Product.scss";
import { Box,Typography, FormControl, FormLabel, Button } from "@mui/material";

function Product({ handleChosenProduct }) {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  console.log(product);

  useEffect(() => {
    const productDetails = async () => {
      const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
      console.log(data);
      setProduct(data);
    };
    productDetails();
  }, [id]);
  console.log(id);
  return (
    <Box className="product__container">
      <Link to={"/"}>
        <small>Back</small>
      </Link>
      <Box className="product__container-header">
        <h2>{product.brand}</h2>
        <img src={product?.images?.[0]} alt="Avatar" />
        <FormControl>
          <FormLabel>Model</FormLabel>
          <Typography className="description">
            <strong>{product.title}</strong>
          </Typography>
        </FormControl>
      </Box>
      <Box className="product__container-info">
        <FormControl>
          <FormLabel>Category</FormLabel>
          <Typography className="description">
            <strong>{product.category}</strong>
          </Typography>
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Typography className="description">
            <strong>{product.description}</strong>
          </Typography>
        </FormControl>
      </Box>
      <Button variant="contained" color='success' onClick={() => handleChosenProduct(product)}>Add To Cart</Button>
    </Box>
  );
}

export default Product;
