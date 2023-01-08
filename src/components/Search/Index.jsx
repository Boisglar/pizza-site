import React from 'react';
import { useContext } from 'react';
import { SearchContext } from '../../App';

import styles from './Search.module.scss';

export default function Search() {
  const { serchValue, setSearchValue } = useContext(SearchContext);

  return (
    <div className={styles.root}>
      <svg className={styles.icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <title />
        <g id="search">
          <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
        </g>
      </svg>
      <input
        className={styles.input}
        placeholder="Поиск пиццы..."
        value={serchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {serchValue && (
        <span className={styles.clearIcon} onClick={() => setSearchValue('')}>
          ☓
        </span>
      )}
    </div>
  );
}
