import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (pizza) => {
    setCartItems((prevItems) => {
      const existingPizza = prevItems.find(item => item.id === pizza.id);
      if (existingPizza) {
        return prevItems.map(item =>
          item.id === pizza.id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prevItems, { ...pizza, count: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, count: item.count - 1 } : item
      ).filter(item => item.count > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Función para calcular y formatear el precio total
  const getTotalFormatted = () => {
    const total = cartItems.reduce((total, item) => total + item.price * item.count, 0);
    return Math.round(total).toLocaleString('es-ES'); // Formatea sin decimales y con separador de miles
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getTotalFormatted }}>
      {children}
    </CartContext.Provider>
  );
};
