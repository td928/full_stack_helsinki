import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0))
  //const [max, setMax] = useState(0)

  const handleNext = () =>{
    return(
      setSelected(Math.floor(Math.random()*5))
    )
  }

  const handleVote = () =>{
    const copy = {...voted}

    copy[selected] += 1

    setVoted(copy)

    // after the voted is updated also update the max
    //setMax(indexOfMax(voted))
    
    //console.log('the max is', max)
  }


  //console.log("the votes array", voted)
  //console.log("the highest vote", indexOfMax(...voted))

  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {voted[selected]} votes</p>

      <Button onClick={handleVote} text="vote"/>
      <Button onClick={handleNext} text="next anecdote"/>
      
      <h1>Anecdote with most votes</h1>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

// const points = Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0)
//const points = Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0)

const Button = (props) =>{
  return(
     <button onClick={props.onClick}>{props.text}</button>
  )  
}


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)