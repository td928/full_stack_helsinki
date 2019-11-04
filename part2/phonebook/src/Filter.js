import React from 'react'

// only job here is handle the filter 

const Filter = ({filter, handleChange}) => {
    return(
        <div>
            filter shown with:
            <input
                value={filter}
                onChange={handleChange}/>
        </div>
    )
}

export default Filter;