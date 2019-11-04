import React from 'react'

const ShortlistCountries = ({name, ChooseCountry}) => {
    //console.log('what is the handle click function even?', handleClick)
    return(
        <p>
            {name}
            <button onClick={ChooseCountry}>show</button>
        </p>
    )
}


export default ShortlistCountries;