import React from 'react';
import styles from './oopts.module.css'; 
import ooptsData from '../../data/oppts.json'; 

const Opportunities = () => {
  return (
    <div className={styles.container}>
        <h2 className={styles.title}>Opportunities</h2> 
        <div className={styles.box}>
          {ooptsData.value.map((oopts, index) => (
            <div key={index} className={styles.ooptsItem}>
              <h3>{oopts.title}</h3>
              <p>{oopts.text}</p>
            </div>
          ))}
        </div>
    </div>
  );
};

export default Opportunities;
