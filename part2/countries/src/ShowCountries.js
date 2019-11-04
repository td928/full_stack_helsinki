import React, {useState} from 'react'
import FullDetail from './FullDetail'
import ShortlistCountries from './ShortlistCountries'

const ShowCountries = ({countries, filter}) => {
    const [country, setCountry] = useState({countries: countries})
    //const [value, setValue] = useState(10)
    // which countries the 
    const countriesToShow = countries.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))

    const count = Object.keys(countriesToShow).length 

    setCountry({countries: allCountries})
   // const setToValue = (newValue) =>{
   //     setValue(newValue)
   // }

    console.log(country)

    const handleClick = ({name}) => {
        
        console.log('click handle name?', name)
        const countryToShow = country.countries.find(c => c.name === name)

        console.log('click handle country?', countryToShow)

        return <FullDetail country={countryToShow}/>
    }

    if(count  === 1){

        //console.log('what is the var now?:', countriesToShow[0].capital)

        return <FullDetail country={countriesToShow[0]}/>
    }

    else if(count === 0){
       return <p>no match please check input</p>
    } 

    else if (count < 10){
        //console.log(value)
      const rows = () => countriesToShow.map(c => 
            <ShortlistCountries
            key={c.name}
            name={c.name}
            handleClick={() => handleClick(c.name)}
            />
        )

      return(
        <div>
            {rows()}
        </div>)
    }

    else{
        return <p> too many results please specify </p>
    }

  }

  export default ShowCountries;

  // <ShowCountries filter={newFilter} countries={countries} /> 
  //</p><li key={c.name}>{c.name}</li>
  //<button onClick={FullDetail(c)}>show</button>
  //<p key={c.name}>{c.name}</p> 