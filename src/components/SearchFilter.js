import React from 'react'
import { Search } from 'lucide-react'

export default function SearchFilter({searchInput, setSearchInput, handleSearchSubmit}) {

  const handleChange = (e) => {
    console.log("INpu si kdfj;kajfad ", e.target.value)
    setSearchInput(e.target.value)
    handleSearchSubmit()
  }

  return (
    <div>
      <input
      type="text"
      placeholder="Search here"
      onChange={handleChange}
      value={searchInput} />
      {/* <Search onClick={handleSearchSubmit} /> */}
    </div>
   
  )
}
