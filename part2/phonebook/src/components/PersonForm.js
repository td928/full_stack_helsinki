import React from 'react'

const PersonForm = (props) => {
  return(
    <form onSubmit={props.addNewPerson}>
      <div>
        name: 
        <input 
          value={props.newPerson}
          onChange={props.handlePersonsChange}/>
      </div>
      <div>
        number:
        <input
          value={props.newNumber}
          onChange={props.handleNumbersChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;