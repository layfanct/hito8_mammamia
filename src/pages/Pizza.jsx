import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Pizza.css'; 

const Pizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
        const data = await response.json();
        setPizza(data);
      } catch (error) {
        console.error('Error fetching pizza:', error);
      }
    };

    fetchPizza();
  }, [id]);

  if (!pizza) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="pizza-container">

      <h1 className="pizza-title">{pizza.name}</h1>


      <div className="pizza-content">
        <img src={pizza.img} alt={pizza.name} className="pizza-image-pizza" />
        
        <div className="pizza-details">

          <p className="pizza-description">{pizza.desc}</p>

          <div className="pizza-ingredients">
            <h2>Ingredientes:</h2>
            <ul>
              {pizza.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="pizza-price">Precio: ${pizza.price}</p>
    </div>
  );
};

export default Pizza;
