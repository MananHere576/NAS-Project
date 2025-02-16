import React from 'react';
import { Link } from 'react-router-dom';

const Games = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '40px',
      padding: '20px',
      minHeight: '100vh', // Full height of the viewport
    },
    title: {
      fontSize: '36px',
      color: '#388e3c', // Dark green color for the title
      marginBottom: '20px',
    },
    gameButtons: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px', // Space between buttons
    },
    button: {
      backgroundColor: '#66bb6a', // Green button background
      border: 'none',
      color: '#fff',
      padding: '15px 30px',
      borderRadius: '5px',
      fontSize: '18px',
      cursor: 'pointer',
      textDecoration: 'none', // Remove underline from Link
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#43a047', // Darker green on hover
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Select a Game</h2>
      <div style={styles.gameButtons}>
        <Link to="/Folder1" style={styles.button}>
          <button style={styles.button}>Game 1</button>
        </Link>
        <Link to="/Folder2" style={styles.button}>
          <button style={styles.button}>Game 2</button>
        </Link>
        <Link to="/Folder3" style={styles.button}>
          <button style={styles.button}>Game 3</button>
        </Link>
        <Link to="/Folder4" style={styles.button}>
          <button style={styles.button}>Game 4</button>
        </Link>
      </div>
    </div>
  );
};

export default Games;
