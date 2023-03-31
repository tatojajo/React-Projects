import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.scss";

import Card from "../../components/Card";

function Home({handleChosenProduct,chosenProducts,setChosenProduct}) {
  const [products, setProducts] = useState([]);
  


  // * Delete Item
  const handleDeleteProduct = (deletedProductId) => {
    const updateAfterDelete = [...products].filter(
      (product) => product.id !== deletedProductId
    );
    setProducts(updateAfterDelete);
    axios.delete(`https://dummyjson.com/products/${deletedProductId}`);
  };

  // * Get products from Api And push them in local variable
  useEffect(() => {
    axios.get(`https://dummyjson.com/products`).then(({ data }) => {
      setProducts(data.products);
    });
  }, []);
  return (
    <>
      <div className="prouct__card--wrapper">
        {products.map((product) => {
          return (
            <Card
              product={product}
              key={product.id}
              chosenProducts={chosenProducts}
              setChosenProduct={setChosenProduct}
              handleDeleteProduct={handleDeleteProduct}
              handleChosenProduct={handleChosenProduct}
            />
          );
        })}
      </div>
    </>
  );
}

export default Home;
