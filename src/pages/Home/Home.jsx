import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.scss";

import Card from "../../components/Card";

function Home({
  handleChosenProduct,
  chosenProducts,
  setChosenProduct,
  searchResult,
}) {
  const [products, setProducts] = useState([]);

  // * Delete Item
  const handleDeleteProduct = async (deletedProductId) => {
    const updateAfterDelete = [...products].filter(
      (product) => product.id !== deletedProductId
    );
    setProducts(updateAfterDelete);

    const data = await axios.delete(
      `https://dummyjson.com/products/${deletedProductId}`
    );
    console.log(data);
  };

  // * Get products from Api And push them in local variable
  useEffect(() => {
    const getProducts = async () => {
      const {
        data: { products },
      } = await axios(`https://dummyjson.com/products`);
      setProducts(products);
    };
    getProducts();
  }, []);
  return searchResult.length > 0 ? (
    <div className="prouct__card--wrapper">
      {searchResult.map((product) => {
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
  ) : (
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
