const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupDescription = document.getElementById("popup-description");
const popupClose = document.getElementById("popup-close");

const rotationValues = [
  { 
    minDegree: 0, 
    maxDegree: 30, 
    value: 1, 
    description: 
      "<b style='font-size: 40px;'>Right to Equality</b><br>" +
      "- Ensures everyone is treated equally before the law.<br>" +
      "- Prohibits discrimination based on religion, race, caste, sex, or place of birth.<br>" +
      "- Guarantees equal opportunities in public employment.<br>" +
      "- Ensures everyone has the same access to public places and services.<br>" +
      "- Promotes fairness in government and social services.<br>" +
      "- Protects against unjust treatment and inequality in society."
  },
  { 
    minDegree: 31, 
    maxDegree: 90, 
    value: 2, 
    description: 
      "<b style='font-size: 40px;'>Right to Freedom</b><br>" +
      "- Protects freedom of speech and expression, including the right to share opinions.<br>" +
      "- Guarantees freedom of assembly and the right to gather peacefully.<br>" +
      "- Allows individuals to form associations and join groups of their choice.<br>" +
      "- Ensures freedom of movement within the country.<br>" +
      "- Provides the right to reside and settle in any part of the country.<br>" +
      "- Supports the ability to travel abroad and return to the country."
  },
  { 
    minDegree: 91, 
    maxDegree: 150, 
    value: 3, 
    description: 
      "<b style='font-size: 40px;'>Right against Exploitation</b><br>" +
      "- Prohibits human trafficking and forced labor.<br>" +
      "- Outlaws child labor and protects children from exploitation.<br>" +
      "- Ensures fair wages and working conditions for adults.<br>" +
      "- Protects workers from being forced to work under unfair conditions.<br>" +
      "- Promotes safe working environments and rights for employees.<br>" +
      "- Encourages ethical practices in employment and business."
  },
  { 
    minDegree: 151, 
    maxDegree: 210, 
    value: 4, 
    description: 
      "<b style='font-size: 40px;'>Right to Freedom of Religion</b><br>" +
      "- Guarantees freedom to practice, profess, and spread any religion.<br>" +
      "- Allows individuals to change their religion if they choose.<br>" +
      "- Protects religious institutions and their rights to operate freely.<br>" +
      "- Prohibits discrimination based on religion in public and private life.<br>" +
      "- Supports the right to manage religious affairs and education.<br>" +
      "- Ensures everyone can follow their own religious beliefs without interference."
  },
  { 
    minDegree: 211, 
    maxDegree: 270, 
    value: 5, 
    description: 
      "<b style='font-size: 40px;'>Cultural and Educational Rights</b><br>" +
      "- Protects the right to preserve and promote one's culture and language.<br>" +
      "- Ensures the right to establish and run educational institutions.<br>" +
      "- Supports minorities in maintaining their distinct cultural practices.<br>" +
      "- Provides the right to receive education in one's own language.<br>" +
      "- Encourages the celebration and preservation of diverse cultural heritage.<br>" +
      "- Promotes equal access to educational opportunities for all communities."
  },
  { 
    minDegree: 271, 
    maxDegree: 330, 
    value: 6, 
    description: 
      "<b style='font-size: 40px;'>Right to Constitutional Remedies</b><br>" +
      "- Provides the right to approach the court if fundamental rights are violated.<br>" +
      "- Allows individuals to seek legal action to protect their rights.<br>" +
      "- Ensures remedies are available for breaches of fundamental rights.<br>" +
      "- Supports judicial review and enforcement of rights by the judiciary.<br>" +
      "- Protects against any form of unjust action by the state.<br>" +
      "- Guarantees legal support and avenues for addressing rights violations."
  },
  { 
    minDegree: 331, 
    maxDegree: 360, 
    value: 1, 
    description: 
      "<b style='font-size: 40px;'>Right to Equality</b><br>" +
      "- Ensures everyone is treated equally before the law.<br>" +
      "- Prohibits discrimination based on religion, race, caste, sex, or place of birth.<br>" +
      "- Guarantees equal opportunities in public employment.<br>" +
      "- Ensures everyone has the same access to public places and services.<br>" +
      "- Promotes fairness in government and social services.<br>" +
      "- Protects against unjust treatment and inequality in society."
  }, // Repeat for completeness
];

// Size of each piece
const data = [16, 16, 16, 16, 16, 16];

// Background color for each piece
const pieColors = [
  "#d10019", // Light red
  "#1500c3", // Light blue
  "#c2cd00", // Light green
  "#d14019", // Light orange
  "#c200c3", // Light purple
  "#6f4a3a", // Light pink
];

// Create chart
let myChart = new Chart(wheel, {
  // Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  // Chart Type Pie
  type: "pie",
  data: {
    // Labels(values which are to be displayed on chart)
    labels: rotationValues.map(r => r.value),
    // Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    // Responsive chart
    responsive: true,
    rotation: 0, // Start rotation
    animation: {
      duration: 0,
    },
    plugins: {
      // Hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      // Display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
        anchor: 'center',
        align: 'center',
        offset: 0, // Center the label within the slice
        rotation: (context) => context.chart.options.rotation, // Rotate labels with the chart
      },
    },
  },
});

// Display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    // If the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Value: ${i.value}</p>`;
      // Show popup with details
      popupTitle.innerHTML = `Value: ${i.value}`;
      popupDescription.innerHTML = i.description; // Use innerHTML to render HTML
      popup.style.display = 'flex';
      spinBtn.disabled = false;
      break;
    }
  }
};

// Spinner count
let count = 0;
// 100 rotations for animation and last rotation for result
let resultValue = 101;
// Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  // Empty final value
  finalValue.innerHTML = `<p>Let's Learn!</p>`;
  // Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (360 - 0 + 1) + 0);
  // Calculate the rotation needed to stop at the random degree
  let rotationAngle = randomDegree + 1800; // 1800 degrees (5 full spins) for the spinning effect
  
  // Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    // Set rotation for pie chart
    myChart.options.rotation = (myChart.options.rotation || 0) + 10; // Increment rotation by 10 degrees
    // Update chart with new value
    myChart.update();
    // Stop spinning when the desired angle is reached
    if (myChart.options.rotation >= rotationAngle) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      myChart.options.rotation = randomDegree; // Ensure exact stopping point
      myChart.update();
      spinBtn.disabled = false;
    }
  }, 10);
});

// Close popup
popupClose.addEventListener('click', () => {
  popup.style.display = 'none';
});
