import React, { useEffect } from 'react';
import justiceImg from '../../Images/justice.png';
import libertyImg from '../../Images/liberty.png';
import equalityImg from '../../Images/equality.png';
import fraternityImg from '../../Images/fraternity.png';

const Folder2 = () => {
  useEffect(() => {
    const draggableImages = document.querySelectorAll('.draggable-image');
    const dropPoints = document.querySelectorAll('.countries');
    const resultDisplay = document.getElementById('result');

    draggableImages.forEach((image) => {
      image.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
      });
    });

    dropPoints.forEach((dropPoint) => {
      dropPoint.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      dropPoint.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(draggedId);
        const dropId = dropPoint.getAttribute('data-id');

        // Check if the drop is correct
        if (draggedId === dropId.toLowerCase()) {
          dropPoint.appendChild(draggedElement);
          resultDisplay.textContent = 'Correct!';
        } else {
          resultDisplay.textContent = 'Try Again!';
        }
      });
    });

    // Reset game logic on start
    const startButton = document.getElementById('start');
    startButton.addEventListener('click', () => {
      dropPoints.forEach((dropPoint) => {
        dropPoint.innerHTML = dropPoint.getAttribute('data-id');
      });
      resultDisplay.textContent = '';
      draggableImages.forEach((image) => {
        document.querySelector('.draggable-objects').appendChild(image);
      });
    });
  }, []);

  // Updated data to link each image with specific country names
  const linkedCountries = {
    justice: ['Social', 'Economic', 'Political'],
    liberty: ['Thought', 'Expression', 'Belief', 'Faith', 'Worship'],
    equality: ['Status', 'Opportunity'],
    fraternity: ['Dignity', 'Integrity', 'Unity'],
  };

  let count = 0;
  const totalItemsToMatch = 4;

  // Function to select and shuffle categories
  const getRandomCategories = (categories, total) => {
    const result = [];
    const keys = Object.keys(categories);
    const usedKeys = new Set();

    while (result.length < total && result.length < keys.length) {
      const randomIndex = Math.floor(Math.random() * keys.length);
      const key = keys[randomIndex];

      if (!usedKeys.has(key)) {
        const categoryItems = categories[key];
        const randomItem = categoryItems[Math.floor(Math.random() * categoryItems.length)];
        result.push({ id: key, item: randomItem });
        usedKeys.add(key);
      }
    }

    return result;
  };

  // Function to shuffle array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Win Game Display
  const stopGame = () => {
    document.querySelector('.controls-container').classList.remove('hide');
    document.getElementById('start').classList.remove('hide');
  };

  // Drag & Drop Functions
  function dragStart(e) {
    e.dataTransfer.setData('text', e.target.id);
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function drop(e) {
    e.preventDefault();
    const draggedElementData = e.dataTransfer.getData('text');
    const droppableElementData = e.target.getAttribute('data-id');

    // Check if the dragged item matches the drop target
    if (linkedCountries[draggedElementData].includes(droppableElementData)) {
      const draggedElement = document.getElementById(draggedElementData);
      e.target.classList.add('dropped');
      draggedElement.classList.add('hide');
      draggedElement.setAttribute('draggable', 'false');

      e.target.innerHTML = `<img src="${draggedElementData}.png" alt="${draggedElementData}">`;
      count += 1;
    }

    if (count === totalItemsToMatch) {
      document.getElementById('result').innerText = 'You Won!';
      stopGame();
    }
  }

  // Creates flags and countries
  const creator = () => {
    const dragContainer = document.querySelector('.draggable-objects');
    const dropContainer = document.querySelector('.drop-points');
    dragContainer.innerHTML = '';
    dropContainer.innerHTML = '';

    // Select and shuffle categories
    const randomCategories = getRandomCategories(linkedCountries, totalItemsToMatch);

    // Shuffle draggable flags and drop points
    const shuffledCategories = shuffleArray(randomCategories);
    const shuffledCountries = shuffleArray(shuffledCategories.map(({ item }) => item));

    // Create draggable flags
    shuffledCategories.forEach(({ id }) => {
      const flagDiv = document.createElement('div');
      flagDiv.classList.add('draggable-image');
      flagDiv.setAttribute('draggable', true);
      flagDiv.setAttribute('id', id);
      flagDiv.innerHTML = `<img src="${id}.png" alt="${id}">`;
      dragContainer.appendChild(flagDiv);
    });

    // Create drop points with shuffled country names
    shuffledCountries.forEach((item) => {
      const countryDiv = document.createElement('div');
      countryDiv.classList.add('countries');
      countryDiv.setAttribute('data-id', item);
      countryDiv.textContent = item;
      dropContainer.appendChild(countryDiv);
    });
  };

  // Start Game
  const startButtonClickHandler = () => {
    const controls = document.querySelector('.controls-container');
    controls.classList.add('hide');
    document.getElementById('start').classList.add('hide');
    creator();
    count = 0;
    const dropPoints = document.querySelectorAll('.countries');
    const draggableObjects = document.querySelectorAll('.draggable-image');

    draggableObjects.forEach((element) => {
      element.addEventListener('dragstart', dragStart);
    });

    dropPoints.forEach((element) => {
      element.addEventListener('dragover', dragOver);
      element.addEventListener('drop', drop);
    });
  };

  return (
    <div className="container">
      <h3>Drag & Drop The Images Over Their Respective Subsection Portions</h3>
      <div className="draggable-objects">
        {/* Justice */}
        <div className="draggable-image" draggable="true" id="justice">
          <img src="Images/justice.png" alt="Justice" />
        </div>

        {/* Liberty */}
        <div className="draggable-image" draggable="true" id="liberty">
          <img src="Images/liberty.png" alt="Liberty" />
        </div>

        {/* Equality */}
        <div className="draggable-image" draggable="true" id="equality">
          <img src="Images/equality.png" alt="Equality" />
        </div>

        {/* Fraternity */}
        <div className="draggable-image" draggable="true" id="fraternity">
          <img src="Images/fraternity.png" alt="Fraternity" />
        </div>
      </div>

      <div className="drop-points">
        <div className="countries" data-id="Social">Social</div>
        <div className="countries" data-id="Economic">Economic</div>
        <div className="countries" data-id="Thought">Thought</div>
        <div className="countries" data-id="Expression">Expression</div>
        <div className="countries" data-id="Status">Status</div>
        <div className="countries" data-id="Opportunity">Opportunity</div>
        <div className="countries" data-id="Dignity">Dignity</div>
        <div className="countries" data-id="Integrity">Integrity</div>
      </div>

      <div className="controls-container">
        <p id="result"></p>
        <button id="start" onClick={startButtonClickHandler}>Start Game</button>
      </div>

      <style>{`
        html, body {
          height: 100%;
          margin: 0;
        }

        body {
          background-image: url('Images/background.jpg'); /* Ensure the path is correct */
          background-size: cover; /* Make sure the background image covers the entire page */
          background-position: center; /* Center the background image */
          background-repeat: no-repeat; /* Prevent the background image from repeating */
          background-attachment: fixed; /* Keep the background fixed */
          font-family: Arial, sans-serif;
        }

        .container {
          width: 80%;
          height: 80%;
          max-width: 80vw;
          max-height: 80vh;
          background-color: #ffffff;
          padding: 3em;
          position: absolute;
          transform: translate(-50%, -50%);
          top: 50%;
          left: 50%;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          overflow: auto; /* Allow scrolling if content overflows */
        }

        h3 {
          text-align: center;
        }

        .draggable-objects {
          display: flex;
          justify-content: space-around;
          margin-bottom: 2em;
        }

        .draggable-image {
          cursor: grab;
        }

        .countries {
          border: 2px dashed #4CAF50;
          padding: 1em;
          margin: 1em;
          text-align: center;
        }

        .dropped {
          background-color: #d4edda;
        }

        #result {
          text-align: center;
          font-size: 1.5em;
          margin-bottom: 1em;
        }

        .controls-container {
          text-align: center;
          margin-top: 2em;
        }

        #start {
          padding: 0.5em 2em;
          font-size: 1.2em;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 0.5em;
          cursor: pointer;
        }

        #start:hover {
          background-color: #45a049;
        }

        .hide {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Folder2;
