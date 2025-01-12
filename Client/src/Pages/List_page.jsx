import React, { useState } from 'react'
import Banner1 from '../Components/Banner1/Banner1'
import Achievements from '../Components/Achievements/Achievements'
import Challenges from '../Components/Challenges/Challenges'
import Search from '../Components/Search_page/Search'
import Display_card from '../Components/Display_card/Display_card'


export default function List_page() {
  const [filterClick, setFilterClick] = useState(false);
  const [isDimmed, setIsDimmed] = useState(false);
  const toggleDim = () => {
    setIsDimmed(!isDimmed);
  };
  return (
    <div>
      <Banner1 />
      <Achievements />
      <Challenges />
      <Search filterClick={filterClick} setFilterClick={setFilterClick} toggleDim={toggleDim}/>
      <Display_card filterClick={filterClick} setFilterClick={setFilterClick} isDimmed={isDimmed}/>
    </div>
  )
}
