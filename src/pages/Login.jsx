import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext"; 
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    try {

      await login(email, password);
      

      toast.success("Inicio de sesión exitoso.");
      setTimeout(() => {
        navigate("/");
      }, 1000);
      
    } catch (error) {

      if (error.message.includes('401')) {  
        toast.error("Usuario o contraseña inválidos. Intenta nuevamente.");
      } else {
        toast.error("Error al iniciar sesión. Inténtalo de nuevo.");
      }
    }
  };

  return (
    <div className="main-content">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
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
    </div>
  );
};

export default Login;
