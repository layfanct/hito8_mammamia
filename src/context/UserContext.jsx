
import { createContext, useState } from 'react';

// Crear el UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null); // Almacena el token JWT
  const [email, setEmail] = useState(null); // Almacena el email del usuario
  const [error, setError] = useState(null); // Para manejar errores
  const [profile, setProfile] = useState(null); // Almacena el perfil del usuario



const login = async (email, password) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      // Si la respuesta no es exitosa, lanza un error que será capturado en Login.jsx
      throw new Error(response.status); 
    }

    const data = await response.json();
    setToken(data.token); // Guarda el token JWT
    setEmail(data.email); // Guarda el email del usuario
    setError(null); // Limpia el error si el login es exitoso
  } catch (error) {
    console.error(error);
    setError(error.message); // Guarda el error para manejarlo en Login.jsx
    throw error; // Lanza el error para que sea manejado en Login.jsx
  }
};


const register = async (email, password) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json(); 

    if (!response.ok) {
      
      throw data; 
    }

    setToken(data.token); // Guarda el token JWT
    setEmail(data.email); // Guarda el email del usuario
    setError(null); // Limpia el error si el registro es exitoso
    return data; // Devuelve los datos si el registro es exitoso
  } catch (error) {
    console.error('Error en el registro:', error.message);
    setError(error.message); // Guarda el error
    throw error; // Lanza el error para que se maneje en Register.jsx
  }
};






  // Método para cerrar sesión (logout)
  const logout = () => {
    setToken(null); // Elimina el token
    setEmail(null); // Elimina el email
    setProfile(null); // Elimina el perfil
  };

  // Método para obtener el perfil del usuario autenticado
  const getProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Envía el token en el header
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener el perfil');
      }

      const data = await response.json();
      setProfile(data); // Guarda el perfil del usuario en el estado
      setError(null); // Limpia cualquier error previo
    } catch (error) {
      console.error(error);
      setError(error.message); // Guarda el error si ocurre
    }
  };

  return (
    <UserContext.Provider value={{ token, email, profile, error, login, register, logout, getProfile }}>
      {children}
    </UserContext.Provider>
  );
};

