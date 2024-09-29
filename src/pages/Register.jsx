import { useState, useContext } from "react"; 
import { UserContext } from "../context/UserContext"; 
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';
import { useNavigate } from "react-router-dom"; 

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register } = useContext(UserContext); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    try {

      const response = await register(email, password);

 
      if (response && response.token) {
        toast.success("Registro exitoso.");
        setTimeout(() => {
          navigate("/"); 
        }, 1000);
      }
    } 
    

    catch (error) {
      
      if (error.error && error.error.includes("Invalid email")) {
        toast.error("El email ingresado no es válido.");
      } else if (error.error && error.error.includes("Password must be at least 6 characters")) {
        toast.error("La contraseña debe tener al menos 6 caracteres.");
      } else if (error.error && error.error.includes("User already exists")) {
        toast.error("Este usuario ya está registrado.");
      } else if (error.error && error.error.includes("Email and password are required")) {
        toast.error("El email y la contraseña son obligatorios.");
      } else {
        toast.error("Error al registrar. Inténtalo de nuevo.");
      }
    }
    
    
  };

  return (
    <div className="main-content">
      <div className="register-container">
        <h1>Registro</h1>
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
          <div>
            <label>Confirmar Contraseña:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit">Registrar</button>
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

export default Register;
