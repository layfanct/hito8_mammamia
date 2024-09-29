
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import './Cart.css';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, getTotalFormatted } = useContext(CartContext);
  const { token } = useContext(UserContext); 

  const handleCheckout = async () => {
    if (!token) {
      toast.error("Debes iniciar sesión para realizar el pago.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
          cart: cartItems, 
        }),
      });

      if (!response.ok) {
        throw new Error('Error al realizar el checkout.');
      }

      const data = await response.json();
      toast.success("Compra realizada con éxito.");


    } catch (error) {
      console.error("Error en el checkout:", error);
      toast.error("Error al realizar la compra simulada. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="cart-container">
      <h1>Carrito de Compras</h1>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        cartItems.map((pizza) => (
          <div key={pizza.id} className="cart-item">
            <img src={pizza.img} alt={pizza.name} className="pizza-image" />
            <div className="pizza-details">
              <h2>{pizza.name}</h2>
              <p>Precio: ${pizza.price}</p>
              <p>Cantidad: {pizza.count}</p>
              <div className="quantity-controls">
                <button onClick={() => removeFromCart(pizza.id)}>-</button>
                <button onClick={() => addToCart(pizza)}>+</button>
              </div>
            </div>
          </div>
        ))
      )}
      <h2>Total: ${getTotalFormatted()}</h2>

      {/* Botón "Pagar", deshabilitado si el token es false */}
      <button className="checkout-btn" onClick={handleCheckout} disabled={!token}>
        {token ? "Pagar" : "Inicia sesión para pagar"}
      </button>
      <ToastContainer 
        position="top-center" 
        autoClose={5000} 
        hideProgressBar 
        newestOnTop 
        closeOnClick 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </div>
  );
};

export default Cart;
