import React from "react";
import {CartItems} from "../../components/Card";
import './Cart.scss'

function Cart({ chosenProducts, setChosenProducts }) {
  return (
    <div className="chosen__product--container">
      <h1 className="chosen__product--container-title">My Cart</h1>
      <div className="chosen__product--container-content">
        {chosenProducts.map((product) => {
          return <CartItems product={product} key={product.id}  setChosenProducts={setChosenProducts} chosenProducts={chosenProducts}/>;
        })}
      </div>
    </div>
  );
}

export default Cart;
