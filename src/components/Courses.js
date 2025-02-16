import React from 'react';

const coursesData = [
  { id: 'preamble', title: 'Preamble' },
  { id: 'fundamental-rights', title: 'Fundamental Rights' },
  { id: 'directive-principles', title: 'Directive Principles' },
  { id: 'fundamental-duties', title: 'Fundamental Duties' }
];

const Courses = ({ onSelectCourse }) => {
  const styles = {
    container: {
      textAlign: 'center',
      marginTop: '20px',  // Further reduced space at the top
      marginBottom: '20px', // Further reduced space at the bottom
      padding: '20px',  // Reduced padding
      minHeight: '100vh', // Full height of the viewport
    },
    title: {
      fontSize: '32px',  // Slightly smaller font for the title
      color: '#388e3c', // Dark green color for the title
      marginBottom: '10px',  // Reduced margin below title
    },
    coursesList: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px', // Reduced space between cards
    },
    card: {
      backgroundColor: '#e8f5e9', // Very light green for cards
      borderRadius: '10px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Slightly smaller shadow
      width: '280px', // Reduced card width
      transition: 'transform 0.3s, box-shadow 0.3s', // Transition for hover effect
    },
    cardBody: {
      padding: '20px', // Further reduced padding inside the card
    },
    cardTitle: {
      fontSize: '22px',  // Reduced font size for card titles
      color: '#388e3c', // Dark green for card titles
      marginBottom: '10px', // Reduced margin below title
    },
    button: {
      backgroundColor: '#66bb6a', // Green button background
      border: 'none',
      color: '#fff',
      padding: '8px 16px', // Reduced padding for the button
      borderRadius: '5px',
      fontSize: '14px', // Slightly smaller font size for button
      cursor: 'pointer',
      transition: 'background-color 0.3s, transform 0.3s',
    },
    buttonHover: {
      backgroundColor: '#43a047', // Darker green on hover
    },
    cardHover: {
      transform: 'scale(1.05)', // Scale effect on hover
      boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.2)', // Slightly reduced shadow on hover
    },
  };
  
  

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Courses</h2>
      <div style={styles.coursesList}>
        {coursesData.map((course) => (
          <div
            key={course.id}
            style={styles.card}
            className="course-card"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = styles.cardHover.transform;
              e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={styles.cardBody}>
              <h5 style={styles.cardTitle}>{course.title}</h5>
              <button
                onClick={() => onSelectCourse(course.id)}
                style={styles.button}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
                }}
              >
                View {course.title}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
