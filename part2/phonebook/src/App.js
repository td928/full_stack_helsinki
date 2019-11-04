import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'}
  ]) 

  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() =>{
    console.log('effect')

    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newPerson,
      number: newNumber
    }

    console.log('button clicked', event.target)

    console.log('new person is:', personObject)

    const checkDuplicate = (persons.findIndex(person => (person.name === personObject.name)) === -1)

    console.log('value for the duplicate detector', checkDuplicate)

    // conditional clause to add new person or send out warning for duplicate
    if(checkDuplicate){
      setPersons(persons.concat(personObject))
    }
    else{
      window.alert(`${newPerson} is already added`)
    }

    setNewPerson('')
    setNewNumber('')
  }


  const handlePersonsChange = (event) =>{
    console.log(event.target.value)
    setNewPerson(event.target.value)
  }

  const handleNumbersChange = (event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  const handleFilterChange = (event) =>{
    console.log(event.target.value)
    setNewFilter(event.target.value.toLowerCase())

    console.log('what is the filter new filter', newFilter)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handleChange={handleFilterChange}/>

      <h2>Add a new</h2>
      <PersonForm addNewPerson={addNewPerson} newPerson={newPerson} handlePersonsChange={handlePersonsChange} newNumber={newNumber} handleNumbersChange={handleNumbersChange}/>

      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter}/>
    </div>
  )
}

export default App