import React from 'react'
import { useState } from 'react'

const Filter = ({ setFilterValue }) => {
  return (
    <>
      <div>
        <label
          for="site-search"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Search
        </label>
        <input
          className="relative mt-2 relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 sm:text-sm sm:leading-6"
          placeholder="Search product name"
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
