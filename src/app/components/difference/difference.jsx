import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import differenceData from '../../data/difference.json';
import styles from './difference.module.css';

function Difference() {
  const [selectedCategory, setSelectedCategory] = useState('Gender');
  const [legendData, setLegendData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    renderChart(selectedCategory);
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [selectedCategory]);

  const renderChart = (category) => {
    const canvasContainer = document.getElementById('canvasContainer');
    if (canvasContainer) {
      canvasContainer.innerHTML = '';
      const newCanvas = document.createElement('canvas');
      newCanvas.id = 'myChart';
      canvasContainer.appendChild(newCanvas);

      const ctx = newCanvas.getContext('2d');
      const metrics = ['Team Inclusion', 'Cross-Functional Inclusion', 'Informal Influence', 'Work Habits'];
      const backgroundColors = ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)'];
      const legendItems = [];

      const datasets = differenceData.value
        .filter(item => item.demographic_category === category)
        .reduce((acc, { demographic_value, metric, variation }, index) => {
          if (!legendItems.find(item => item.label === demographic_value)) {
            legendItems.push({ label: demographic_value, color: backgroundColors[index % backgroundColors.length] });
          }

          let dataset = acc.find(ds => ds.label === demographic_value);
          if (!dataset) {
            dataset = {
              label: demographic_value,
              data: new Array(metrics.length).fill(null),
              backgroundColor: backgroundColors[index % backgroundColors.length],
            };
            acc.push(dataset);
          }

          const metricIndex = metrics.indexOf(metric);
          if (metricIndex !== -1) {
            dataset.data[metricIndex] = variation;
          }
          return acc;
        }, []);

      setLegendData(legendItems);

      const config = {
        type: 'bar',
        data: {
          labels: metrics,
          datasets: datasets,
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 20,
                suggestedMax: 80
              },
              grid: {
                display: false,
              },
            },
            x: {
              ticks: {
                autoSkip: false,
                maxRotation: 0,
                minRotation: 0,
                padding: 5,
                font: function(context) {
                  const width = context.chart.width;
                  const size = width < 300 ? 6 : (width < 500 ? 8 : 10);
                  return {
                    size: size,
                    family: 'Arial',
                    weight: 'bold',
                    lineHeight: 1.2,
                  };
                }
              },
              grid: {
                display: false,
              },
            }
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      };

      chartRef.current = new Chart(ctx, config);
    }
  };

  const handleCategorySelect = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Difference</h2>
        <div className={styles.legend}>
          {legendData.map((item, index) => (
            <div key={index} className={styles.legendItem}>
              <span className={styles.legendCircle} style={{ backgroundColor: item.color }}></span>
              {item.label}
            </div>
          ))}
        </div>
        <select className={styles.select} onChange={handleCategorySelect} value={selectedCategory}>
          {Array.from(new Set(differenceData.value.map(item => item.demographic_category))).map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div id="canvasContainer" style={{ height: '300px', width: '100%' }}></div>
    </div>
  );
}

export default Difference;
