// new Filter is only used here to set up the display section for the phone books
import React from 'react'

const Persons = ({name, number, handleClick}) => {
    //console.log('what is the ids', id)
    return(
        <p>
            {name} {number} <button onClick={handleClick}>delete</button>
        </p>
    )
}

export default Persons;