import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://63b708764f17e3a931c8adda.mockapi.io/item/${id}`);
        setPizza(data);
      } catch (error) {
        alert(error);
        navigate('/');
      }
    }
    fetchPizza();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!pizza) {
    return <h1>loading</h1>;
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h3>{pizza.title}</h3>
      <h3>{pizza.price} руб</h3>
      <br />
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
