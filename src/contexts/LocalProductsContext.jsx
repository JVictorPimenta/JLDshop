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

  function updateProduct(id, updatedProduct) {
    setLocalProducts(prev => 
      prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p)
    );
  }

  return (
    <LocalProductsContext.Provider value={{ 
      localProducts, 
      addProduct, 
      removeProduct,
      updateProduct 
    }}>
      {children}
    </LocalProductsContext.Provider>
  );
}

export function useLocalProducts() {
  return useContext(LocalProductsContext);
}