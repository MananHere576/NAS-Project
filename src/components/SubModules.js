import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const SubModules = ({ courseId, onSelectSubmodule }) => {
  const subModulesData = {
    preamble: ['Original', 'Introduction', 'Key Terms', 'Historical Significance'],
    'fundamental-rights': ['Introduction', 'Right to Equality', 'Right to Freedom', 'Right Against Exploitation', 'Right to Freedom of Religion', 'Cultural and Educational Rights', 'Saving of Certain Laws', 'Right to Constitutional Remedies'],
    'directive-principles': ['Introduction', 'Socialist Principles', 'Gandhian Principles', 'Liberal-Intellectual Principles', 'Amendments to DPSP', 'Conflicts between Fundamental Rights and DPSP', 'Implementation of DPSP'],
    'fundamental-duties': ['Introduction', 'History', 'List of Fundamental Duties', 'Significance and Impact', 'Judicial Interpretation', 'Way Forward and Application']
  };

  const subModules = subModulesData[courseId] || [];

  const styles = {
    container: {
      textAlign: 'center',
      padding: '40px 20px',
      minHeight: '100vh', // Full height of the viewport
    },
    title: {
      fontSize: '36px',
      marginBottom: '40px',
      color: '#388e3c', // Dark green for titles
    },
    card: {
      marginBottom: '20px',
      border: '1px solid #388e3c', // Green border
      borderRadius: '10px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ffffff',
    },
    cardTitle: {
      fontSize: '20px',
      color: '#388e3c', // Dark green for card titles
      marginBottom: '10px',
    },
    button: {
      backgroundColor: '#66bb6a', // Green button background
      border: 'none',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#43a047', // Darker green on hover
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Sub-Modules for {courseId.replace('-', ' ')}</h2>
      <Row>
        {subModules.map((subModule, index) => (
          <Col md={6} lg={4} key={index}>
            <Card style={styles.card}>
              <Card.Body>
                <Card.Title style={styles.cardTitle}>{subModule}</Card.Title>
                <button
                  style={styles.button}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                  onClick={() => onSelectSubmodule(index)}
                >
                  Start
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SubModules;
