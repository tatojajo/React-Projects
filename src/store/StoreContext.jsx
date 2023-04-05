import { createContext, useContext, useState, useMemo } from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

export const StoreContext = createContext(null);

export const useStore = () => useContext(StoreContext);

const StoreProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [chosenProducts, setChosenProducts] = useState([]);
  const [themeMode, setThemeMode] = useState("light");

  // * theme mode function
  const handleThemeMode = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

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
  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  const store = {
    searchResult,
    setSearchResult,
    chosenProducts,
    setChosenProducts,
    handleChosenProduct,
    handleThemeMode,
  };
  return (
    <StoreContext.Provider value={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StoreContext.Provider>
  );
};

export default StoreProvider;
