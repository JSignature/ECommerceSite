import React from 'react'
import { useState } from 'react'

const Filter = ({ setFilterValue }) => {
  return (
    <>
      <div>
        <label for="site-search">Search products:</label>
        <input
          type="search"
          id="site-search"
          name="search"
          onChange={e => {
            setFilterValue(e.target.value)
          }}
        />
      </div>
    </>
  )
}

export default Filter
