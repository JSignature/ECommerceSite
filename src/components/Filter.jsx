import React from 'react'
import { useState } from 'react'

const Filter = ({ setSearchValue }) => {
  return (
    <>
      <div>
        <label for="site-search">Search products:</label>
        <input
          type="search"
          id="site-search"
          name="search"
          onChange={e => {
            setSearchValue(e.target.value)
          }}
        />
      </div>
    </>
  )
}

export default Filter
