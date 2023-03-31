import React from "react";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "./Card.scss";

export const CartItems = ({ product, chosenProducts, setChosenProducts }) => {
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
    <section className="card">
      <span className="quantity-number">{product.quantity}</span>
      <div className="card-header">
        <img src={product?.images?.[0]} width="50px" height="100px" alt="" />
        <p>
          <Link to={`/product/${product.id}`}>
            <strong>{product.title}</strong>
          </Link>
        </p>
        <button
          onClick={() => handleRemoveItem(product)}
          style={{ color: "red" }}
        >
          Remove
        </button>
      </div>
      <div className="card-body">
        <p>
          Brend: <strong>{product.brand}</strong>
        </p>
        <p>
          category: <strong>{product.category}</strong>
        </p>
      </div>
      <div className="cart-btns">
        <button
          onClick={() => {
            handleQuantityDown(product);
          }}
        >
          -
        </button>
        <p>Quantity</p>
        <button
          onClick={() => {
            handleQuantityUp(product);
          }}
        >
          +
        </button>
      </div>
    </section>
  );
};

function Card({ product, handleDeleteProduct, handleChosenProduct }) {
  return (
    <section className="card">
      <div className="card-header">
        <img src={product.images[0]} width="50px" height="100px" alt="" />
        <p>
          <Link to={`/product/${product.id}`}>
            <strong>{product.title}</strong>
          </Link>
        </p>
        <button
          style={{ color: "red" }}
          onClick={() => {
            handleDeleteProduct(product.id);
          }}
        >
          Delete
        </button>
      </div>
      <div className="card-body">
        <p>
          Brend: <strong>{product.brand}</strong>
        </p>
        <p>
          category: <strong>{product.category}</strong>
        </p>
      </div>
      <div className="card-btns">
        <button onClick={() => handleChosenProduct(product)}>
          Add To Cart
        </button>
        <button>Edit Product</button>
      </div>
    </section>
  );
}

export default Card;
