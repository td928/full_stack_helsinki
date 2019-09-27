import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
  return(
  <button onClick={props.onClick}>
    {props.text}
  </button>
  )
}

const Display = (props) => {
  //console.log(props)
  if (props.text === "positive"){
    return(
      <tr>
        <td>{props.text}</td>
        <td> {props.value}{"%"}</td>
      </tr>
    )
  }
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) =>{
  //console.log(props)
  if ((props.good + props.bad + props.neutral) === 0){
    return(
      <div>No feedback given</div>
    )
  }

  return(
    <div>
      <table>
        <tbody>
          <Display text="good" value={props.good} />
          <Display text="neutral" value={props.neutral} />
          <Display text="bad" value={props.bad} />
          <Display text="all" value={props.good + props.bad + props.neutral} />
          <Display text="average" value={(props.good - props.bad) / (props.good + props.bad + props.neutral)} />
          <Display text="positive" value={props.good / (props.good + props.bad + props.neutral) * 100} />
        </tbody>
      </table>
    </div>
  )
} 


const App = (props) => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <div>
        <h1>give feedback</h1>
         
        <Button onClick={handleGoodClick} text="good" />
        <Button onClick={handleNeutralClick} text="neutral" />
        <Button onClick={handleBadClick} text="bad" />
        

        <h1>statistics</h1>
        <Statistics good={good} bad={bad} neutral={neutral} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
