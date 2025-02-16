import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Folder1 from './components/Folder1/Index';
import Folder2 from './components/Folder2/Index';
import Folder3 from './components/Folder3/Index';
import Folder4 from './components/Folder4/Index';

const App = () => {
  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f0f9f0', // Light greenish background
      borderRadius: '10px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '1200px', // Max width for better readability on large screens
      margin: 'auto', // Center the container
      width: '100%', // Full width up to the maxWidth
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '48px', // Increased font size for better visibility
      color: '#388e3c', // Dark green color for the heading
    },
    fullWidthContainer: {
      width: '100vw', // Full viewport width
      marginLeft: 'calc(-50vw + 50%)', // Adjusts to remove the padding caused by centering
      paddingTop: '20px', // Adding space at the top of the screen
      paddingBottom: '20px', // Adding space at the bottom
      minHeight: '100vh', // Ensure the container takes the full viewport height
      boxSizing: 'border-box', // Ensure padding is included in height calculations
      backgroundColor: '#e8f5e9', // Very light green background for the full width section
    },
  };

  return (
    <div style={styles.fullWidthContainer}>
      <Router>
        <div style={styles.container}>
          <h1 style={styles.header}>Nagrik Aur Samvidhan</h1>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Folder1" element={<Folder1 />} />
            <Route path="/Folder2" element={<Folder2 />} />
            <Route path="/Folder3" element={<Folder3 />} />
            <Route path="/Folder4" element={<Folder4 />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
