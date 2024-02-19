import React, { useContext, useEffect, useState } from 'react';
import './styles/pricefilter.css';
import { StateContext } from './Context';

const PriceFilter = () => {
  const [value, setValue] = useState(0);
  const [clicked, setClicked] = useState('0')

  const myStyle = {
    backgroundColor: 'green',
    margin: '10px',
    padding: '5px',
    borderRadius: '10px',
    boxShadow: '3px 3px 3px 3px rgba(0, 0, 0, 0.5)'
  }

  const {state, dispatch} = useContext(StateContext)

  const handleFilterClick = (e) => {
    console.log("Fiter click: ", e.target.id)
    if(clicked === e.target.id) {
      setClicked('0')
      setValue(0)
    }
    else {
      setClicked(e.target.id)
      if(e.target.id === '1') setValue(1)
      if(e.target.id === '2') setValue(500)
      if(e.target.id === '3') setValue(1000)
      if(e.target.id === '4') setValue(1500)
    }
  }

  useEffect(()=>{
    dispatch({type: "filter", payload: {filterValue: value}})
  }, [value])

  return (
    <div className="filter-container">
      <div id='1' className='filter' style={clicked==='1' ? myStyle : null} onClick={handleFilterClick}>1-500</div>
      {/* <div id='1' className='filter' style={myStyle} onClick={handleFilterClick}>1-500</div> */}
      <div id='2' className='filter' style={clicked==='2' ? myStyle : null} onClick={handleFilterClick}>500-1000</div>
      <div id='3' className='filter' style={clicked==='3' ? myStyle : null} onClick={handleFilterClick}>1000-1500</div>
      <div id='4' className='filter' style={clicked==='4' ? myStyle : null} onClick={handleFilterClick}>1500-2000</div>
    </div>
  );
};

export default PriceFilter;
