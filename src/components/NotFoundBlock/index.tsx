import React from 'react';
import styles from './NotFoundBlock.module.scss';

const  NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <div className={styles.discription}>
        К сожалению данная страница отсутвует в нашем интернет-магазине
      </div>
    </div>
  );
}
export default NotFoundBlock