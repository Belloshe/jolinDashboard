import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import trendsData from '../../data/trends.json'; 
import styles from './trends.module.css';

const Trends = () => {
    const [trends, setTrends] = useState([]);
  
    useEffect(() => {
      setTrends(trendsData.value);
    }, []);
  
    return (
      <div className={styles.container}>
        <h1>Trends</h1>
        <ul>
          {trends.map((item, index) => (
            <li className={styles.trendItem} key={index}>
              {item.trend === 'pos' ? (
                <Image 
                  className={styles.trendIcon} 
                  src="/images/positive-arrow-green-icon.svg" 
                  alt="Positive trend" 
                  width={20} 
                  height={20} 
                />
              ) : (
                <Image 
                  className={styles.trendIcon} 
                  src="/images/negative-arrow-red-icon.svg" 
                  alt="Negative trend" 
                  width={20} 
                  height={20} 
                />
              )}
              <span className={styles.trendText}>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    );
};
  
export default Trends;
