import { createContext, useContext, useState, useMemo } from "react";
export const StoreContext = createContext(null);

export const useStore = () => useContext(StoreContext)

const StoreProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [chosenProducts, setChosenProducts] = useState([]);
  // * Handle ChosenProduct

  const handleChosenProduct = (product) => {
    setChosenProducts((prev) => {
      const indexOfProduct = prev.findIndex((item) => item.id === product.id);
      if (indexOfProduct === -1) {
        return [...prev, { ...product, quantity: 1 }];
      }

      return prev;
    });
  };

  const store = {
    searchResult,
    setSearchResult,
    chosenProducts,
    setChosenProducts,
    handleChosenProduct,
  };
  return (
    <StoreContext.Provider
      value={store}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;