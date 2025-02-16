import React, { useEffect, useState } from 'react';
import { Chart, ArcElement, PieController } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register required chart elements and controller
Chart.register(ArcElement, PieController);

let chartInstance = null; // To store the chart instance

const App = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState({ title: '', description: '' });

  // Rotation values with corresponding descriptions
  const rotationValues = [
    {
      minDegree: 0,
      maxDegree: 30,
      value: 1,
      description: `
        <b style='font-size: 40px;'>Right to Equality</b><br>
        - Ensures everyone is treated equally before the law.<br>
        - Prohibits discrimination based on religion, race, caste, sex, or place of birth.<br>
        - Guarantees equal opportunities in public employment.<br>
        - Ensures everyone has the same access to public places and services.<br>
        - Promotes fairness in government and social services.<br>
        - Protects against unjust treatment and inequality in society.
      `,
    },
    {
      minDegree: 31,
      maxDegree: 90,
      value: 2,
      description: `
        <b style='font-size: 40px;'>Right to Freedom</b><br>
        - Guarantees freedom of speech and expression.<br>
        - Ensures freedom of assembly and association.<br>
        - Provides the right to move freely throughout the territory of India.<br>
        - Protects against arbitrary arrest and detention.
      `,
    },
    {
      minDegree: 91,
      maxDegree: 150,
      value: 3,
      description: `
        <b style='font-size: 40px;'>Right against Exploitation</b><br>
        - Prohibits human trafficking and forced labor.<br>
        - Abolishes child labor and ensures the dignity of all workers.
      `,
    },
    {
      minDegree: 151,
      maxDegree: 210,
      value: 4,
      description: `
        <b style='font-size: 40px;'>Right to Freedom of Religion</b><br>
        - Ensures the right to practice any religion of choice.<br>
        - Guarantees freedom from discrimination based on religion.
      `,
    },
    {
      minDegree: 211,
      maxDegree: 270,
      value: 5,
      description: `
        <b style='font-size: 40px;'>Cultural and Educational Rights</b><br>
        - Protects the rights of minorities to preserve their culture.<br>
        - Ensures the right to establish and administer educational institutions.
      `,
    },
    {
      minDegree: 271,
      maxDegree: 360,
      value: 6,
      description: `
        <b style='font-size: 40px;'>Right to Constitutional Remedies</b><br>
        - Provides the right to approach the court for enforcement of fundamental rights.<br>
        - Allows individuals to seek justice in case of violation of their rights.
      `,
    },
  ];

  const pieColors = ["#d10019", "#1500c3", "#c2cd00", "#d14019", "#c200c3", "#6f4a3a"];
  const data = [16, 16, 16, 16, 16, 16];

  const initializeChart = () => {
    const ctx = document.getElementById('wheel').getContext('2d');

    // Destroy the previous chart instance if it exists
    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: 'pie',
      data: {
        labels: rotationValues.map(r => r.value),
        datasets: [
          { backgroundColor: pieColors, data: data }
        ]
      },
      options: {
        responsive: true,
        rotation: 0,
        animation: { duration: 0 },
        plugins: {
          tooltip: false,
          legend: { display: false },
          datalabels: {
            color: "#ffffff",
            formatter: (_, context) => context.chart.data.labels[context.dataIndex],
            font: { size: 24 },
            anchor: 'center',
            align: 'center',
            offset: 0,
          },
        },
      },
    });
  };

  useEffect(() => {
    initializeChart(); // Initialize the chart on component mount
  }, []);

  const handleSpin = () => {
    let randomDegree = Math.floor(Math.random() * 360);
    const finalValue = rotationValues.find(({ minDegree, maxDegree }) => randomDegree >= minDegree && randomDegree <= maxDegree);
    
    if (finalValue) {
      setPopupContent({ title: `Value: ${finalValue.value}`, description: finalValue.description });
      setPopupVisible(true);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <canvas id="wheel" style={styles.wheel}></canvas>
        <button style={styles.spinBtn} onClick={handleSpin}>Spin</button>
        <img src="spinner-arrow-.svg" alt="spinner-arrow" style={styles.img} />
      </div>
      <div style={styles.finalValue}><p>Click On The Spin Button To Start</p></div>
      {popupVisible && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <span style={styles.popupClose} onClick={() => setPopupVisible(false)}>&times;</span>
            <h2 dangerouslySetInnerHTML={{ __html: popupContent.title }} />
            <p dangerouslySetInnerHTML={{ __html: popupContent.description }} />
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    width: '90%',
    maxWidth: '34.37em',
    maxHeight: '90vh',
    backgroundColor: '#f1f8e9', // Light green background
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '3em',
    paddingTop: '0em',
    paddingBottom: '0em',
    borderRadius: '0.3em', // Rounded corners to match card design
    boxShadow: '0 1.2em 2.5em rgba(16, 96, 16, 0.15)', // Greenish shadow
  },
  container: { position: 'relative', width: '100%', height: '100%' },
  wheel: { maxHeight: 'inherit', width: 'inherit' },
  spinBtn: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    height: '26%',
    width: '26%',
    borderRadius: '50%',
    cursor: 'pointer',
    border: '0',
    background: 'radial-gradient(#4caf50 50%, #388e3c 85%)', // Green gradient
    color: '#ffffff', // White text for contrast
    textTransform: 'uppercase',
    fontSize: '1.8em',
    letterSpacing: '0.1em',
    fontWeight: '600',
  },
  img: { position: 'absolute', width: '4em', top: '45%', right: '-8%' },
  finalValue: { 
    fontSize: '1.5em', 
    textAlign: 'center', 
    marginTop: '1.5em', 
    color: '#388e3c', // Dark green for final value text
    fontWeight: '500' 
  },
  popup: {
    position: 'fixed', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 1000,
  },
  popupContent: {
    background: '#fff', 
    padding: '20px', 
    borderRadius: '0.3em', // Rounded corners for popup
    width: '80%', 
    maxWidth: '600px', 
    textAlign: 'center',
  },
  popupClose: { 
    position: 'absolute', 
    top: '10px', 
    right: '10px', 
    fontSize: '24px', 
    cursor: 'pointer', 
    color: '#388e3c', // Dark green for close button
  },
};

export default App;
