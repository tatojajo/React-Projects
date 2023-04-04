import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.scss";

import ProductCard from "../../components/Card";
import { useStore } from "../../store/StoreContext";

function Home() {
  const { setChosenProduct, searchResult } = useStore();
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
          <ProductCard
            product={product}
            key={product.id}
            setChosenProduct={setChosenProduct}
          />
        );
      })}
    </div>
  ) : (
    <>
      <div className="prouct__card--wrapper">
        {products.map((product) => {
          return (
            <ProductCard
              product={product}
              key={product.id}
              handleDeleteProduct={handleDeleteProduct}
            />
          );
        })}
      </div>
    </>
  );
}

export default Home;
