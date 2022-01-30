import React from 'react';
import ItemCount from './itemCount';
import styles from './item.module.css';

export default function ItemDetail(item) {
  return <div className={styles.itemDetailCard}>
          <div className={styles.itemDetailTitle}>
            <h2>{item.name}</h2><span className={styles.itemCategory}>{item.category}</span>
          </div>
          <div>
            <img src={item.picture} width='200px' height='200px'/>
          </div>
          <div>
            <h2>{`$ ${item.price}`}</h2>
          </div>
          <div>
            <span className={styles.itemDescription}>{item.description}</span>
          </div>
          <div className={styles.itemCounter}>
            <ItemCount stock='10' initial='1'/>
          </div>
        </div>;
}
