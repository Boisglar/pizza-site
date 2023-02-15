import React, { useCallback, useRef } from 'react';
import { useEffect } from 'react';
import { Skeleton, Pagination, PizzaBlock, Categories, SortPopup } from '../components';
import { useSelector } from 'react-redux';
import { setCategiryId, setFIlters, setPageCount } from '../redux/filter/slice';
import { useNavigate } from 'react-router-dom';
import { SearchPizzaParams } from '../redux/pizza/slice';
import { useAppDispatсh } from '../redux/store';
import { selectSort } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { list } from '../components/Sort';
import qs from 'qs';
import '../scss/app.scss';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectSort);
  const { pizzas, status } = useSelector(selectPizzaData);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const dispatch = useAppDispatсh();

  const onClickCategory = useCallback((id: number) => {
    dispatch(setCategiryId(id));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
  const sortBy = sort.sortProperty.replace('-', '');
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const search = searchValue && `search=${searchValue}`;

  const getPizzas = async () => {
    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );
    window.scrollTo(0, 0);
  };

  const onChangePage = (page: number) => {
    dispatch(setPageCount(page));
  };

  //если был первый рендер, то проверяем URL - параметры и сохраняем в редукс
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = list.find((obj) => obj.sortProperty === params.sortBy);
      dispatch(
        setFIlters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || list[0],
        }),
      );
      isSearch.current = true;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
  }, [categoryId, sort.sortProperty, search, currentPage]); // eslint-disable-line react-hooks/exhaustive-deps
  // Если был первый рендер то запрашиваем Пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    getPizzas();

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, search, currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  const pizz = pizzas.map((item: any) => <PizzaBlock key={item.id} {...item} />);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onClickCategory} />
          <SortPopup value={sort} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === 'error' ? (
          <div className="content__error-info">
            <h2>Произошла ошибка</h2>
            <p> Не удалось загрузить пиццы, повторите попытку позже.</p>
          </div>
        ) : (
          <div className="content__items">{status === 'loading' ? skeletons : pizz}</div>
        )}

        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;
