import React from 'react';
import styles from './inclusion.module.css';
import Inclusion from './Inclusion';
import InclusionScore from './inclusionScore';

const ScoreNavigator= () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftContent}>
        <InclusionScore />
      </div>
      <div className={styles.middleContent}>
        <Inclusion />
      </div>
    </div>
  );
};

export default ScoreNavigator;
