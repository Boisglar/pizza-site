import Categories from '../components/Categories';
import PIzzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import { list } from '../components/Sort';
import '../scss/app.scss';
import { useContext, useRef, useState } from 'react';
import { useEffect } from 'react';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategiryId, setFIlters, setPageCount } from '../redux/slices/filterSlice';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const dispatch = useDispatch();
  const onClickCategory = (id) => {
    dispatch(setCategiryId(id));
  };

  const { serchValue } = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
  const sortBy = sort.sortProperty.replace('-', '');
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const search = serchValue && `search=${serchValue}`;

  const fitchPizzas = () => {
    setIsLoading(true);
    axios
      .get(
        `https://63b708764f17e3a931c8adda.mockapi.io/item?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`,
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
  };

  const onChangePage = (number) => {
    dispatch(setPageCount(number));
  };

  //если был первый рендер, то проверяем URL - параметры и сохраняем в редукс
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFIlters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId: categoryId,
        currentPage: currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, search, currentPage]);
  // Если был первый рендер то запрашиваем Пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fitchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, search, currentPage]);

  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  const pizz = pizzas.map((item) => <PIzzaBlock key={item.id} {...item} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizz}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
}
