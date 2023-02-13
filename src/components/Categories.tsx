import { useWhyDidYouUpdate } from 'ahooks';
import React, { memo } from 'react';

type CategoriesProps = {
  value: number;
  onClickCategory: (index: number) => void;
};

const Categories: React.FC<CategoriesProps> = memo(({ value, onClickCategory }) => {
  const categories = ['все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  //функция которая проверяет почему идет рендер
  useWhyDidYouUpdate('Categories', { value, onClickCategory });
  //
  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={value === index ? 'active' : ''}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
});
export default Categories;
