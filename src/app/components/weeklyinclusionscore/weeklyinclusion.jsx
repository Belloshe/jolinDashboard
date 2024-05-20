import React, { useState, useEffect } from 'react';
import inclusionData from '../../data/inclusion.json';
import styles from './weeklyinclusion.module.css';

function WeeklyInclusion() {
    const [selectedWeek, setSelectedWeek] = useState('2022-W45');
    const [currentWeekData, setCurrentWeekData] = useState({});
    const [previousWeekData, setPreviousWeekData] = useState({});
    const [showArrows, setShowArrows] = useState(false); 

    useEffect(() => {
        const currentData = inclusionData.value.find(item => item.ISO_Week === selectedWeek) || {};
        const previousWeek = getPreviousWeek(selectedWeek);
        const previousData = inclusionData.value.find(item => item.ISO_Week === previousWeek) || {};

        setCurrentWeekData(currentData);
        setPreviousWeekData(previousData);
    }, [selectedWeek]);

    function calculatePercentageChange(current, previous) {
        if (previous === 0) return 0;
        return ((current - previous) / previous) * 100;
    }

    function getPreviousWeek(week) {
        const [year, weekNumber] = week.split('-W');
        let prevWeekNumber = parseInt(weekNumber, 10) - 1;
        let prevYear = parseInt(year, 10);

        if (prevWeekNumber < 1) {
            prevWeekNumber = 52;
            prevYear -= 1;
        }

        return `${prevYear}-W${prevWeekNumber < 10 ? '0' + prevWeekNumber : prevWeekNumber}`;
    }

    function handleWeekChange(event) {
        setSelectedWeek(event.target.value);
        setShowArrows(true); 
    }
    function renderProgressBar(label, current = 0, previous = 0, tooltip) {
        const percentageChange = calculatePercentageChange(current, previous);
        const percentageText = percentageChange > 0 ? `+${Math.round(percentageChange)}` : `${Math.round(percentageChange)}`;
        const arrowColor = percentageChange >= 0 ? '#4CAF50' : '#F44336';
        const arrowIconSrc = percentageChange >= 0 ? "/images/positive-arrow-green-icon.svg" : "/images/negative-arrow-red-icon.svg";
    
        return (
            <div className={styles.progressBarWrapper}>
                <div className={styles.labelContainer}>
                <h3 className={styles.labelTitle}>{label}</h3>
                    <div className={styles.infoIconWrapper}>
                        <img src="/images/info-icon.svg" alt="Info" className={styles.infoIcon}/>
                        <div className={styles.tooltip}>{tooltip}</div>
                    </div>
                    {showArrows && (
                        <div className={styles.arrows}>
    <span style={{ color: arrowColor }}>{percentageText}</span>
    <img src={arrowIconSrc} alt={percentageChange >= 0 ? 'Positive change' : 'Negative change'} />
</div>
                    )}
                </div>
                <div className={styles.progressContainer}>
                    <div className={styles.progress} style={{ width: `${Math.abs(percentageChange)}%`, backgroundColor: arrowColor }}></div>
                </div>
            </div>
        );
    }
    
    function sortWeeks(a, b) {
        const weekA = parseInt(a.split('-W')[1]);
        const weekB = parseInt(b.split('-W')[1]);
        return weekA - weekB;
    }
    

    return (
        <div className={styles.outerWrapper}>
        <div className={styles.header}>
            <h1 className={styles.title}>Weekly Inclusion Score</h1>
            <div className={styles.selectWrapper}>
                <select className={styles.select} onChange={handleWeekChange} value={selectedWeek}>
                    {Array.from(new Set(inclusionData.value.map(item => item.ISO_Week))).sort(sortWeeks).map(week => (
                        <option key={week} value={week}>{`Week ${parseInt(week.split('-W')[1])}`}</option>
                    ))}
                </select>
            </div>
        </div>

    
            <div className={styles.innerWrapper}>
                {renderProgressBar('Team Interactions', currentWeekData['Team Inclusion'], previousWeekData['Team Inclusion'], 'Evaluates the frequency and quality of communications between team members.')}
                {renderProgressBar('Work Habits', currentWeekData['Work Habits'], previousWeekData['Work Habits'], 'Assesses the flexibility and inclusivity of work routines.')}
                {renderProgressBar('Informal Influence', currentWeekData['Informal Influence'], previousWeekData['Informal Influence'], 'Unofficial impact individuals have within the organisation.')}
                {renderProgressBar('Cross-Functional Interaction', currentWeekData['Cross-Functional Inclusion'], previousWeekData['Cross-Functional Inclusion'], 'Measures the engagement between different departments or functions.')}
            </div>
        </div>
    );
}

export default WeeklyInclusion;
