import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import noteService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newPerson, setNewPerson ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState(null)



  
  useEffect(() => {
    noteService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])
  
  console.log('what are the persons', persons)
      

  const addNewPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newPerson,
      number: newNumber
    }

    // check the duplicate 
    const checkDuplicate = (persons.findIndex(person => (person.name === personObject.name)) === -1)

    // conditional clause to add new person or send out warning for duplicate
    if(checkDuplicate){
      noteService
        .create(personObject)
        .then(data => {
          setPersons(persons.concat(data))

          console.log('what is the person name', data.name)

          setMessage(`Added ${data.name}`)

          console.log('what is the message', message)

          setTimeout(() => {
            setMessage(null)
          }, 5000)

          setNewPerson('')
          setNewNumber('')
        })
    }
    else{

      const result = window.confirm(`${newPerson} is already added to the phonebook, replace the old number with a new one?`)

      const id = persons.find(person => person.name === newPerson).id

      if(result){
        noteService
          .update(id, personObject)
          .then(changedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : changedPerson))
          })
      }

      setNewPerson('')
      setNewNumber('')
    }
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

  const handleDeleteClick = (id) => {
    //console.log(id)
    //console.log(persons.find(person => person.id === id).name)
    
    const person = persons.find(p => p.id === id)

    const result = window.confirm(`Delete ${persons.find(person => person.id === id).name} ?`)
    
    if(result){
      noteService
        .remove(id)
        .then(
          setPersons(persons.filter(person => person.id !== id))
          )
        .catch(error => {
          setMessage(
            `'${person.name}' is already removed from server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)

          // update the persons hook
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  const rows = () => personsToShow.map(person => 
    <Persons
      key={person.id}
      name={person.name} 
      number={person.number}
      handleClick={() => handleDeleteClick(person.id)} 
      />
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter filter={newFilter} handleChange={handleFilterChange}/>

      <h2>Add a new</h2>
      <PersonForm addNewPerson={addNewPerson} newPerson={newPerson} handlePersonsChange={handlePersonsChange} newNumber={newNumber} handleNumbersChange={handleNumbersChange}/>

      <h2>Numbers</h2>
      <div>
        {rows()}
      </div>
      
    </div>
  )
}

export default App