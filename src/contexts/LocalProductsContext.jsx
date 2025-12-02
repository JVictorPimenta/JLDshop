import { createContext, useContext, useState } from "react";

const LocalProductsContext = createContext();

export function LocalProductsProvider({ children }) {
  const [localProducts, setLocalProducts] = useState([]);

  function addProduct(p) {
    setLocalProducts(prev => [...prev, p]);
  }

  function removeProduct(id) {
    setLocalProducts(prev => prev.filter(p => p.id !== id));
  }

  return (
    <LocalProductsContext.Provider value={{ localProducts, addProduct, removeProduct }}>
      {children}
    </LocalProductsContext.Provider>
  );
}

export function useLocalProducts() {
  return useContext(LocalProductsContext);
}
