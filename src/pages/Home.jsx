import React, { useEffect, useState, useContext } from 'react';
import CardPizza from '../components/CardPizza';
import { CartContext } from '../context/CartContext'; 

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const { addToCart } = useContext(CartContext); 


  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pizzas");
        const data = await response.json();
        setPizzas(data); 
      } catch (error) {
        console.error("Error fetching pizzas:", error);
      }
    };

    fetchPizzas();
  }, []);

  return (
    <div>
      <div className="pizza-list">
        {/*<Header />*/}
        {pizzas.map((pizza) => (
          <CardPizza
            key={pizza.id}
            id={pizza.id}
            name={pizza.name}
            desc={pizza.desc}
            ingredients={pizza.ingredients}
            price={pizza.price}
            img={pizza.img}
            addToCart={() => addToCart(pizza)} 
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
