import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import FullDetail from './FullDetail'
import ShortlistCountries from './ShortlistCountries'

const App = () => {

  const [newFilter, setNewFilter] = useState('')
  const [country, setCountry] = useState({countries:[]})
  const [showDetail, setShowDetail] = useState(false)
  const [countryToShow, setCountryToShow] = useState({})


  useEffect(() =>{
    console.log('effect')

    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        //console.log(response.data)

        return response.data
      })
      .then(allCountries => setCountry({countries: allCountries}))
  }, [])


  const handleFilterChange = (event) =>{
    console.log(event.target.value)
    setNewFilter(event.target.value.toLowerCase())

    console.log('what is the filter new filter', newFilter)
  }

  // get the list countries the filter matched with
  const countriesToShow = country.countries.filter(c => c.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  //find out how many countries are in the filtered list
  const count = Object.keys(countriesToShow).length 

  const ChooseOneCountry = (name) => {

    //console.log('click handle name', name)
    //console.log('what is the state', country.countries)

    // update the country being selected
    const countryToShow = country.countries.find(c => c.name === name)

    setCountryToShow(countryToShow)

    // change the display state to 
    setShowDetail(!showDetail)


    //console.log('click handle country', countryToShow)

  }

  const rows = () => countriesToShow.map(c => 
    <ShortlistCountries
      key={c.name}
      name={c.name}
      ChooseCountry={() => ChooseOneCountry(c.name)}
    />
  )

  const Display = ({count, countries}) => {
  
    if(count  === 1){
  
        return <FullDetail country={countries[0]}/>
    }
  
    else if (showDetail){
      //setShowDetail(!showDetail)
      return <FullDetail country={countryToShow} />
    }

    else if(count === 0){
       return <p>no match please check input</p>
    } 
  
    else if (count < 10){
  
      return(
        <div>
            {rows()}
        </div>
      )
    }
  
    else{
        return <p> too many results please specify </p>
    }
  
  }

  return (
    <div>
      <Filter filter={newFilter} handleChange={handleFilterChange}/>

      <Display count={count} countries={countriesToShow}/> 
    </div>
  )
}

export default App