import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ShoppingCart } from 'lucide-react';
import { StateContext } from './Context';

export default function AddToCartIcon({handleClick}) {
  const {state, dispatch} = useContext(StateContext)
  // console.log("State in add to cart icon: ", state.totalItems)
  
  const [price, setPrice] = useState(0)

  useEffect(()=>{
    const filteredObjects = state.allItems.filter(obj1 => state.selectedItems.some(obj2 => obj2.id === obj1.id));
    const totalPrice = filteredObjects.reduce((accumulator, currentObject) => {
      const countObj = state.selectedItems.find(obj => obj.id === currentObject.id);
    
    // Multiply the price by the count and add it to the accumulator
      return accumulator + (currentObject.price * countObj.count);
    }, 0);
    setPrice(totalPrice)
  }, [state.selectedItems])

  return (
    <div className='addToCartIcon'>
      <label onClick={handleClick}>
      {/* <div className='numberOfItems'>{state.selectedItems.length}</div> */}
      <div className='numberOfItems'>{price}</div>
      <ShoppingCart />
      </label>
    </div>
  )
}
