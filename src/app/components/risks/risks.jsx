import React from 'react';
import styles from './risk.module.css'; 
import riskData from '../../data/risk.json'; 

const RiskComponent = () => {
  return (
    <div className={styles.container}>
        <h2 className={styles.title}>Risks</h2> 
        <div className={styles.box}>
          {riskData.value.map((risk, index) => (
            <div key={index} className={styles.riskItem}>
              <h3>{risk.title}</h3>
              <p>{risk.text}</p>
            </div>
          ))}
        </div>
    </div>
  );
};

export default RiskComponent;
