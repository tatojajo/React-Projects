import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import "./Product.scss";

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
    <div className="product__container">
      <Link to={"/"}>
        <small>Back</small>
      </Link>
      <div className="product__container-header">
        <h2>{product.brand}</h2>
        <img src={product?.images?.[0]} alt="Avatar" />
        <fieldset>
          <legend>Model</legend>
          <p className="description">
            <strong>{product.title}</strong>
          </p>
        </fieldset>
      </div>
      <div className="product__container-info">
        <fieldset>
          <legend>Category</legend>
          <p className="description">
            <strong>{product.category}</strong>
          </p>
        </fieldset>
        <fieldset>
          <legend>Description</legend>
          <p className="description">
            <strong>{product.description}</strong>
          </p>
        </fieldset>
      </div>
      <button onClick={() => handleChosenProduct(product)}>Add To Cart</button>
    </div>
  );
}

export default Product;
