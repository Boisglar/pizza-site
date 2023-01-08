import Categories from '../components/Categories';
import PIzzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import '../scss/app.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import Skeleton from '../components/PizzaBlock/Skeleton';

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategiryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
  const sortBy = sortType.sortProperty.replace('-', '');
  const category = categoryId > 0 ? `category=${categoryId}` : '';

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63b708764f17e3a931c8adda.mockapi.io/item?${category}&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setPizzas(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(index) => setCategiryId(index)} />
        <Sort value={sortType} onChangeSort={(index) => setSortType(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((item) => <PIzzaBlock key={item.id} {...item} />)}
      </div>
    </>
  );
}
