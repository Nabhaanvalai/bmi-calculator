import React, { useMemo, useState } from 'react'
import './App.css'

export default function App() {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [unit, setUnit] = useState('metric'); // 'metric' or 'imperial'

  function onHeightChange(e) {
    setHeight(e.target.value);
  }

  function onWeightChange(e) {
    setWeight(e.target.value);
  }

  function toggleUnit() {
    if (unit === 'metric') {
      // Convert to imperial
      setHeight(Math.round(height / 2.54)); // cm to inches
      setWeight(Math.round(weight * 2.20462)); // kg to pounds
      setUnit('imperial');
    } else {
      // Convert to metric
      setHeight(Math.round(height * 2.54)); // inches to cm
      setWeight(Math.round(weight / 2.20462)); // pounds to kg
      setUnit('metric');
    }
  }

  const bmiData = useMemo(() => {
    let bmi;
    if (unit === 'metric') {
      bmi = weight / ((height / 100) ** 2);
    } else {
      bmi = (weight / (height ** 2)) * 703;
    }
    
    let category;
    if (bmi < 18.5) {
      category = { name: 'Underweight', color: '#3498db' };
    } else if (bmi < 25) {
      category = { name: 'Normal weight', color: '#2ecc71' };
    } else if (bmi < 30) {
      category = { name: 'Overweight', color: '#f39c12' };
    } else {
      category = { name: 'Obese', color: '#e74c3c' };
    }
    
    return {
      value: bmi.toFixed(1),
      category
    };
  }, [weight, height, unit]);

  return (
    <main>
      <h1>BMI Calculator</h1>
      
      <div className="unit-toggle">
        <button onClick={toggleUnit} className="unit-button">
          {unit === 'metric' ? 'Switch to Imperial' : 'Switch to Metric'}
        </button>
      </div>
      
      <div className="input-section">
        <p className="slider-output">
          {unit === 'metric' ? `Weight: ${weight} kg` : `Weight: ${weight} lbs`}
        </p>
        <input 
          type="range" 
          className="input-slider" 
          step="1" 
          min={unit === 'metric' ? "30" : "66"} 
          max={unit === 'metric' ? "200" : "440"} 
          value={weight}
          onChange={onWeightChange} 
        />
        
        <p className="slider-output">
          {unit === 'metric' ? `Height: ${height} cm` : `Height: ${height} in`}
        </p>
        <input 
          type="range" 
          className="input-slider" 
          step="1" 
          min={unit === 'metric' ? "130" : "51"} 
          max={unit === 'metric' ? "220" : "87"} 
          value={height}
          onChange={onHeightChange}
        />
      </div>
      
      <div className="output-section">
        <p>Your BMI is:</p>
        <p className="output" style={{ backgroundColor: bmiData.category.color }}>
          {bmiData.value}
        </p>
        <p className="category">
          Category: <span style={{ color: bmiData.category.color }}>{bmiData.category.name}</span>
        </p>
      </div>
      
      <div className="bmi-info">
        <h3>BMI Categories:</h3>
        <ul>
          <li><span style={{ color: '#3498db' }}>Underweight:</span> BMI less than 18.5</li>
          <li><span style={{ color: '#2ecc71' }}>Normal weight:</span> BMI 18.5 to 24.9</li>
          <li><span style={{ color: '#f39c12' }}>Overweight:</span> BMI 25 to 29.9</li>
          <li><span style={{ color: '#e74c3c' }}>Obesity:</span> BMI 30 or greater</li>
        </ul>
      </div>
    </main>
  )
}
