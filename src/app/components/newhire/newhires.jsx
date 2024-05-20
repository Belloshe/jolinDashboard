import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import data from '../../data/newhires.json';
import styles from './newHiresChart.module.css';

const Newhireschart = () => {
    const [selectedCategory, setSelectedCategory] = useState('Gender');
    const [chartData, setChartData] = useState({});

    const demographicValues = {
        Gender: ['Male', 'Female', 'Non-Binary'],
        'Age Group': ['18-25', '26-35', '36-45', '46-55', '56+'],
        Background: ['native', 'Immigrant'],
        Ethnicity: ['Majority', 'Minority'],
        'Sexual Orientation': ['hetero', 'LBGTQ+'],
    };

    useEffect(() => {
        const prepareChartData = (category) => {
            const values = demographicValues[category];
            let preparedData = {};

            values.forEach(value => {
                preparedData[value] = data.value
                    .filter(item => item.demographic_category === category && item.demographic_value === value)
                    .map(item => ({
                        ...item,
                        inclusion_value: Math.round(item.inclusion_value * 100) / 100,
                    }));
            });

            setChartData(preparedData);
        };

        prepareChartData(selectedCategory);
    }, [selectedCategory]);

    const getCategoryColor = (index) => {
        return index % 2 === 0 ? '#fdd835' : '#1e88e5';
    };

    const renderCustomLegend = (props) => {
        const { payload } = props;
        return (
            <ul className={styles.customLegend}>
                {payload.map((entry, index) => (
                    <li key={index} className={styles.legendItem}>
                        <svg height="10" width="10" className={styles.legendIcon}>
                            <circle cx="5" cy="5" r="5" fill={entry.color} />
                        </svg>
                        <span className={styles.legendText} style={{ marginLeft: 5, fontSize: '12px' }}>{entry.value}</span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h2 className={styles.chartTitle}>Inclusion of New Hires</h2>
                <div className={styles.controls}>
                    <select className={styles.dropdown} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        {Object.keys(demographicValues).map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart margin={{ top: 30, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        {Object.keys(chartData).map(( index) => (
                            <linearGradient key={`color${index}`} id={`color${index}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={getCategoryColor(index)} stopOpacity={0.8}/>
                                <stop offset="95%" stopColor={getCategoryColor(index)} stopOpacity={0}/>
                            </linearGradient>
                        ))}
                    </defs>
                    <XAxis dataKey="time" type="category" allowDuplicatedCategory={false} />
                    <YAxis />
                    <Tooltip />
                    <Legend iconType="circle" content={renderCustomLegend} verticalAlign="top" align="center" wrapperStyle={{ top: -30 }} />
                    {Object.entries(chartData).map(([key, value], index) => (
                        <Area key={key} type="monotone" data={value} dataKey="inclusion_value" name={key} stroke={getCategoryColor(index)} fillOpacity={0.6} fill={`url(#color${index})`} />
                    ))}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Newhireschart;
