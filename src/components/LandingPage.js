import React, { useState } from 'react';
import Courses from './Courses';
import Games from './Games';
import Progress from './Progress';
import SubModules from './SubModules';
import Slides from './Slides';

const LandingPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSubmodule, setSelectedSubmodule] = useState(null);

  const renderContent = () => {
    if (selectedSubmodule) {
      return <Slides courseId={selectedCourse} subModuleId={selectedSubmodule} />;
    }

    if (selectedCourse) {
      return <SubModules courseId={selectedCourse} onSelectSubmodule={setSelectedSubmodule} />;
    }

    switch (selectedOption) {
      case 'courses':
        return <Courses onSelectCourse={setSelectedCourse} />;
      case 'games':
        return <Games />; // Render Games component here
      case 'progress':
        return <Progress />;
      default:
        return <div style={styles.placeholderText}>Please select an option from the left section.</div>;
    }
  };

  const styles = {
    landingContainer: {
      display: 'flex',
      height: '100vh',
      width: '100%',
      padding: '20px',
      boxSizing: 'border-box',
    },
    options: {
      flex: 1,
      maxWidth: '250px',
      backgroundColor: '#e6f7e6',
      padding: '10px',
      borderRadius: '10px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    optionsList: {
      marginBottom: '10px',
    },
    button: {
      display: 'block',
      width: '100%',
      marginBottom: '10px',
      padding: '10px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
    content: {
      flex: 3,
      marginLeft: '20px',
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    placeholderText: {
      fontSize: '18px',
      color: '#666',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.landingContainer}>
      <div style={styles.options}>
        <h2>Options</h2>
        <div style={styles.optionsList}>
          <button
            onClick={() => setSelectedOption('courses')}
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
          >
            Courses
          </button>
          <button
            onClick={() => setSelectedOption('games')}
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
          >
            Games
          </button>
          <button
            onClick={() => setSelectedOption('progress')}
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
          >
            Progress
          </button>
        </div>
      </div>

      <div style={styles.content}>
        {renderContent()}
      </div>
    </div>
  );
};

export default LandingPage;
