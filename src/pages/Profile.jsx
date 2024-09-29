import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import './Profile.css';
const Profile = () => {
  const { email, logout } = useContext(UserContext); 
  const navigate = useNavigate(); 

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  return (
    <div className="profile-container">
      <h1>Perfil del Usuario</h1>
      <p>Email: {email}</p> 
      <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Profile;
