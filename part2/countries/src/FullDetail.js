import React from 'react'

const FullDetail = ({country}) => {

    console.log('what is country', country)
    
    const languages = () => country.languages.map(c => <li key={c.name}>{c.name}</li>)
    
    
    return(
        <div>
            <h2>{country.name}</h2>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>

            <h3>languages</h3>
            <ul>
                {languages()}
            </ul>
                <img
                 src={country.flag} 
                 alt=''
                 width='100'
                 height='50'/>
        </div>
    )
}

export default FullDetail;