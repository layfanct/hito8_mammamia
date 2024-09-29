import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext'; 
import { UserContext } from '../context/UserContext'; // Importamos UserContext
import './Navbar.css';
import { useNavigate } from 'react-router-dom'; // Para redirigir después del logout

function Navbar() {
  const { getTotalFormatted } = useContext(CartContext);
  const { token, logout } = useContext(UserContext); // Consumimos el método logout del contexto
  const navigate = useNavigate(); // Para redirigir al login después de cerrar sesión

  const handleLogout = () => {
    logout(); // Llamamos al método logout para cerrar sesión
    navigate("/login"); // Redirigimos al login después del logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Pizzería Mamma Mía</h1>
      </div>
      <div className="navbar-right">
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/cart" className="custom-cart-btn">
          Total: ${getTotalFormatted()}
        </Link>

        {/* Si el usuario está autenticado, mostramos el botón de Cerrar Sesión */}
        {token ? (
          <>
            <Link to="/profile" className="nav-link">Perfil</Link>
            <button onClick={handleLogout} className="nav-link">Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Iniciar Sesión</Link>
            <Link to="/register" className="nav-link">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
