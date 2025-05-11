import React, { useMemo, useState } from 'react'
import './App.css'

export default function App() {

  const [height,setHeight]=useState(130);
  const [weight,setWeight]=useState(50);

  function onHeightchange(e){
    setHeight(e.target.value)
  }

  function onWeightchange(e){
    setWeight(e.target.value)
  }

  const output=useMemo(()=>{
    const bmi=weight/(height/100)**2.;
    return bmi.toFixed(1)
  },[weight,height])
  return (
    <main>
  
      <h1>BMI Calculator</h1>
      <div className="input-section">
        <p className='slider-output'>weight:{weight}kg</p>
        <input type="range" className='input-slider' step="1" min="0" max="200" onChange={onWeightchange}  />
        <p className='slider-output'>height:{height}cm</p>
        <input type="range" className='input-slider' step="1" min="130" max="220" onChange={onHeightchange}/>
      </div>
      <div className="output-section">
        <p>Your BMI is :</p>
        <p className='output'>{output}</p>
      </div>


    </main>
  )
}
