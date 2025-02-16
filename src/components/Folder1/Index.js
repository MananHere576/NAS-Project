import React, { useEffect } from 'react';

const ScratchCard = ({ id, message, content }) => {
  useEffect(() => {
    const canvas = document.getElementById(`scratch${id}`);
    const context = canvas.getContext("2d");
    initScratchCard(context);

    let mouseX = 0;
    let mouseY = 0;
    let isDragged = false;

    const events = {
      mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup",
      },
      touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
      },
    };

    const isTouchDevice = () => {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch (e) {
        return false;
      }
    };

    const getXY = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = !isTouchDevice() ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
      mouseY = !isTouchDevice() ? e.clientY - rect.top : e.touches[0].clientY - rect.top;
    };

    const scratch = (x, y) => {
      context.globalCompositeOperation = "destination-out";
      context.beginPath();
      context.arc(x, y, 20, 0, 2 * Math.PI);
      context.fill();
    };

    const deviceType = isTouchDevice() ? "touch" : "mouse";

    canvas.addEventListener(events[deviceType].down, (event) => {
      isDragged = true;
      getXY(event);
      scratch(mouseX, mouseY);
    });

    canvas.addEventListener(events[deviceType].move, (event) => {
      if (isDragged) {
        getXY(event);
        scratch(mouseX, mouseY);
      }
    });

    canvas.addEventListener(events[deviceType].up, () => {
      isDragged = false;
    });

    canvas.addEventListener("mouseleave", () => {
      isDragged = false;
    });
  }, [id]);

  const initScratchCard = (context) => {
    let gradientColor = context.createLinearGradient(0, 0, 300, 300);
    gradientColor.addColorStop(0, getRandomBrightColor());
    gradientColor.addColorStop(1, getRandomBrightColor());
    context.fillStyle = gradientColor;
    context.fillRect(0, 0, 300, 300);
  };

  const getRandomBrightColor = () => {
    const brightColors = ['FF5733', '33FF57', '3357FF', 'F0F033', 'FF33A1', '33FFF0']; // Array of bright colors
    return `#${brightColors[Math.floor(Math.random() * brightColors.length)]}`;
  };

  return (
    <div style={styles.scratchCard}>
      <div style={styles.base}>
        <h4 style={styles.message} id={`message${id}`}>{message}</h4>
        <h3 style={styles.content} id={`content${id}`}>{content}</h3>
      </div>
      {/* Reduced width and height by 50px each (250x250) */}
      <canvas style={styles.scratch} id={`scratch${id}`} width="250" height="250"></canvas>
    </div>
  );
};

const App = () => {
  const facts = [
    { message: "Fact 1", content: "India’s Constitution combines elements from the British, American, Irish, and Canadian systems." },
    { message: "Fact 2", content: "Living Document: It has been amended over 100 times to stay current." },
    { message: "Fact 3", content: "Its preamble is the longest among all constitutions." },
    { message: "Fact 4", content: "Available in all 22 official Indian languages." },
    { message: "Fact 5", content: "Covers not only laws but governance and emergency powers." },
    { message: "Fact 6", content: "Originally hand-illustrated with symbolic artwork." },
    { message: "Fact 7", content: "Dr. B.R. Ambedkar is known as the 'Father of the Constitution.'" },
    { message: "Fact 8", content: "Adopted on November 26, 1949, and effective from January 26, 1950." },
  ];

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        {facts.map((fact, index) => (
          <ScratchCard key={index} id={index + 1} message={fact.message} content={fact.content} />
        ))}
      </div>
    </div>
  );
};

// Internal CSS styles
const styles = {
  outerContainer: {
    height: '100vh',
    background: 'linear-gradient(135deg, #e8f5e9, #a5d6a7)', // Light green gradient
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '"Poppins", sans-serif',
    overflow: 'hidden', // Prevent scrolling
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)', // 4 cards per row
    gridGap: '20px', // Spacing between cards
    padding: '20px',
    maxWidth: '1200px', // Max width to center the cards
    margin: '0 auto', // Center the container
  },
  scratchCard: {
    position: 'relative',
    width: '250px', // Reduced width by 50px
    height: '250px', // Reduced height by 50px
  },
  base: {
    height: '100%', // Make sure the base fills the card
    width: '100%', // Make sure the base fills the card
    backgroundColor: '#f1f8e9', // Light green background for cards
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0.3em',
    boxShadow: '0 1.2em 2.5em rgba(16, 96, 16, 0.15)', // Greenish shadow
  },
  content: {
    fontWeight: 600,
    fontSize: '1.2em',
    color: '#388e3c', // Dark green color for text
  },
  message: {
    fontWeight: 400,
    fontSize: '1em',
    color: '#7b7b7b', // Neutral gray color for subtitle
  },
  scratch: {
    position: 'absolute',
    top: 0,
    left: 0,
    cursor: 'grabbing',
    borderRadius: '0.3em',
    WebkitTapHighlightColor: 'transparent',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    userSelect: 'none',
  },
};

export default App;
