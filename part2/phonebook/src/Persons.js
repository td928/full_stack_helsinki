// new Filter is only used here to set up the display section for the phone books
import React from 'react'

const Persons = (props) => {
    
    const personsToShow = props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLocaleLowerCase()))
    
    const rows = () => personsToShow.map(person => <li key={person.name}>{person.name} {person.number}</li>)

    return(
        <ul>
            {rows()}
        </ul>
    )
}

export default Persons;