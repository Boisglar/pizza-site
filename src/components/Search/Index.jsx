import React from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import { useState } from 'react';
import { useCallback } from 'react';

export default function Search() {
  const [value, setValue] = useState('');
  const { setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 250),
    [],
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.root}>
      <svg className={styles.icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <title />
        <g id="search">
          <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
        </g>
      </svg>
      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Поиск пиццы..."
        value={value}
        onChange={onChangeInput}
      />
      {value && (
        <span className={styles.clearIcon} onClick={onClickClear}>
          ☓
        </span>
      )}
    </div>
  );
}
