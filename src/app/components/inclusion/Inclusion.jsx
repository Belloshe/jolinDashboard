import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  defs,
  linearGradient,
  stop
} from 'recharts';

import inclusionData from '../../data/inclusion.json';
import styles from './inclusion.module.css';

const RenderLegend = (props) => {
  const { payload, selectedTeam } = props;

  const customPayload = [
    { color: '#0033FF', value: selectedTeam },
    { color: '#00afb9', value: 'Company Average' } 
  ];

  return (
    <ul className={styles.legendList}>
      {customPayload.map((entry, index) => (
        <li key={index} className={styles.legendItem}>
          <span className={styles.legendColor} style={{ backgroundColor: entry.color }} />
          {entry.value}
        </li>
      ))}
    </ul>
  );
};

export default function Inclusion() {
  const [selectedTeam, setSelectedTeam] = useState('Finance');
  const teams = ['Finance', 'Sales', 'Marketing', 'Engineering', 'HR'];

  const filteredData = inclusionData.value.filter(entry => entry.Team === selectedTeam);
  const uniqueMonths = Array.from(new Set(filteredData.map(entry => entry.Month)));

  const companyAverageData = uniqueMonths.map(month => {
    const monthData = filteredData.filter(entry => entry.Month === month);
    const inclusionScores = monthData.map(entry => entry['Inclusion score']);
    const averageScore = inclusionScores.reduce((acc, curr) => acc + curr, 0) / inclusionScores.length;
    return { Month: month, 'Inclusion score': averageScore };
  });

  const chartData = uniqueMonths.map(month => {
    const currentData = filteredData.find(entry => entry.Month === month) || {};
    const avgData = companyAverageData.find(entry => entry.Month === month) || {};
    return {
      Month: month,
      InclusionScore: currentData['Inclusion score'],
      CompanyAverage: avgData['Inclusion score'],
      Benchmark: currentData.Benchmark
    };
  });

  const generateLinearGradientId = (index) => `color${index}`;

  return (
    <div className={styles.container}>
      <div className={styles.selectorContainer}>
        <select className={styles.teamSelect} onChange={(e) => setSelectedTeam(e.target.value)} value={selectedTeam}>
          {teams.map(team => (
            <option key={team} value={team}>{team}</option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="Month" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <defs>
            {chartData.map((entry, index) => (
              <linearGradient key={generateLinearGradientId(index)} id={generateLinearGradientId(index)} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={index % 2 === 0 ? "#0033ff" : "#00afb9"} stopOpacity={0.7}/>
                <stop offset="100%" stopColor={index % 2 === 0 ? "#00afb9" : "#0033ff"} stopOpacity={0}/>
              </linearGradient>
            ))}
          </defs>
          <Area type="monotone" dataKey="InclusionScore" stroke="#0033FF" fill={`url(#${generateLinearGradientId(0)})`} />
          <Area type="monotone" dataKey="CompanyAverage" stroke="#00afb9" fill={`url(#${generateLinearGradientId(1)})`} />
          <Area type="monotone" dataKey="Benchmark" stroke="#FF0000" strokeDasharray="3 3" fill="transparent" />
          <Legend align="center" verticalAlign="top" height={36} content={<RenderLegend selectedTeam={selectedTeam} />} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
