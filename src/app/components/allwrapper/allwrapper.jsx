import React, { useEffect } from 'react';
import ScoreNavigator from '../inclusion/scoreNavigator';
import WeeklyInclusion from '../weeklyinclusionscore/Weeklyinclusion';
import Difference from '../difference/difference';
import Newhire from '../newhire/newhires';
import styles from './allwrapper.module.css';
import Risk from '../risks/risks';
import Oppts from '../oopts/oopts';
import Trends from '../trends/trends';

export default function AllWrapper() {
  useEffect(() => {
    console.log('Browser:', navigator.userAgent);
  }, []);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.wrapperContainer}>
        <div className={`${styles.box} ${styles.scoreNavigator}`}>
          <ScoreNavigator />
        </div>
        <div className={`${styles.box} ${styles.weeklyInclusion}`}>
          <WeeklyInclusion />
        </div>
        <div className={`${styles.box} ${styles.newhire}`}>
          <Newhire />
        </div>
        <div className={`${styles.box} ${styles.difference}`}>
          <Difference />
        </div>
        <div className={styles.horizontalContainer}>
          <div className={styles.trends}>
            <Trends />
          </div>
          <div className={styles.verticalStack}>
            <div className={styles.risk}>
              <Risk />
            </div>
            <div className={styles.oppts}>
              <Oppts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
