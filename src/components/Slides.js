import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import slidesData from '../data/slidesData';

const Slides = ({ courseId, subModuleId }) => {
  const slides = slidesData[courseId][subModuleId] || [];
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      padding: '40px',
      minHeight: '100vh', // Full height of the viewport
    },
    card: {
      width: '100%',
      maxWidth: '800px', // Max width for better readability
      border: '1px solid #388e3c', // Green border
      borderRadius: '10px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ffffff', // White background for card
    },
    header: {
      fontSize: '24px',
      color: '#388e3c', // Dark green for header
      textAlign: 'center',
    },
    title: {
      fontSize: '20px',
      color: '#388e3c', // Dark green for titles
    },
    text: {
      color: '#555', // Dark gray for text for better readability
      marginBottom: '20px',
    },
    footer: {
      textAlign: 'center',
      padding: '10px',
    },
    button: {
      backgroundColor: '#66bb6a', // Green button background
      border: 'none',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#43a047', // Darker green on hover
    },
    endMessage: {
      fontSize: '18px',
      color: '#388e3c', // Dark green for end message
    },
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Card.Header style={styles.header}>Slide {currentSlide + 1}</Card.Header>
        <Card.Body>
          <Card.Title style={styles.title}>Original Text</Card.Title>
          <Card.Text style={styles.text}>
            {slides[currentSlide].originalText.split('\n').map((line, index) => (
              <span key={index}>{line}<br /></span>
            ))}
          </Card.Text>
          <hr />
          <Card.Title style={styles.title}>Simplified Version</Card.Title>
          <Card.Text style={styles.text}>{slides[currentSlide].simplifiedText}</Card.Text>
        </Card.Body>
        <Card.Footer style={styles.footer}>
          {currentSlide < slides.length - 1 ? (
            <Button
              style={styles.button}
              onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <p style={styles.endMessage}>End of Sub-Module</p>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Slides;
