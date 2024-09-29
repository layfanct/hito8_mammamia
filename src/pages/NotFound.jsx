import { Link } from 'react-router-dom';
import './NotFound.css'; 

function NotFound() {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <h2>Oops! Parece que te perdiste.</h2>
      <p>No podemos encontrar la página que estás buscando.</p>
      <Link to="/" className="back-home-link">Volver al inicio</Link>
    </div>
  );
}

export default NotFound;
