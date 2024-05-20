import React, { useState } from 'react';
import Image from 'next/image';
import inclusionData from '../../data/inclusion.json';
import styles from './inclusion.module.css';

const InclusionScore = () => {
    const [selectedTeam, setSelectedTeam] = useState('Sales');

    const getCurrentAndLastMonthData = () => {
        if (Array.isArray(inclusionData.value)) {
            const currentMonthData = inclusionData.value.find(item => item.Month === 'Nov' && item.Team === selectedTeam);
            const lastMonthData = inclusionData.value.find(item => item.Month === 'Oct' && item.Team === selectedTeam);

            return {
                currentMonthData: currentMonthData,
                lastMonthData: lastMonthData
            };
        } else {
            console.error('Inclusion data is not in the expected format.');
            return {
                currentMonthData: null,
                lastMonthData: null
            };
        }
    };

    const calculateDifferenceFromBenchmark = (currentScore, benchmark) => {
        return currentScore - benchmark;
    };

    const { currentMonthData, lastMonthData } = getCurrentAndLastMonthData();

    const changeSinceLastMonth = currentMonthData && lastMonthData ? currentMonthData['Inclusion score'] - lastMonthData['Inclusion score'] : 0;

    const differenceFromBenchmark = currentMonthData ? calculateDifferenceFromBenchmark(currentMonthData['Inclusion score'], currentMonthData['Benchmark']) : 0;

    return (
        <div className={styles.selectContainer}>
            <div>
                <h1 className={styles.firstTitle}>Timeline</h1>
            </div>
            <h2 className={styles.leftTitle}>Inclusion Score</h2>
            <div className={styles.inclusionScore}>
                <p className={styles.scores}>{currentMonthData ? Math.floor(currentMonthData['Inclusion score']) : 'N/A'}</p>

                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBar} style={{ width: `${currentMonthData ? Math.floor(currentMonthData['Inclusion score']) : 0}%`}}></div>
                </div>
                <div className={styles.iconAndText}>
                    <div>
                        <Image 
                            src={changeSinceLastMonth >= 0 ? "/images/positive-arrow-green-icon.svg" : "/images/negative-arrow-red-icon.svg"}
                            alt={changeSinceLastMonth >= 0 ? "Increase" : "Decrease"}
                            width={20}
                            height={20}
                            className={styles.arrowIcon}
                        />
                        <span className={styles.textWithPadding}>
                            {`${changeSinceLastMonth >= 0 ? '+' : '-'}${Math.abs(changeSinceLastMonth).toFixed(0)}`} since last month
                        </span>
                    </div>
                    <div>
                        <Image 
                            src={differenceFromBenchmark >= 0 ? "/images/positive-arrow-green-icon.svg" : "/images/negative-arrow-red-icon.svg"}
                            alt={differenceFromBenchmark >= 0 ? "Increase" : "Decrease"}
                            width={20}
                            height={20}
                            className={styles.arrowIcon}
                        />
                        <span className={styles.textWithPadding}>
                            {`${differenceFromBenchmark >= 0 ? '+' : '-'}${Math.abs(differenceFromBenchmark).toFixed(0)}`} above benchmark
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InclusionScore;
