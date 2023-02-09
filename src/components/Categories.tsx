import React from 'react';


type CategoriesProps = {
  value: number;
  onClickCategory: any;
}

 const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
  const categories = ['все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

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
}
export default Categories
