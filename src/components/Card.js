import React, { useContext, useEffect } from 'react'
import './styles/card.css'
import './styles/cards.css'
import AddToCart from "./AddToCart.js";
import './styles/cart.css'
import { StateContext } from './Context.js';

export default function Card({props}) { // props is single product

  const {state, dispatch} = useContext(StateContext)

  const img = Array.isArray(props.images) ? props.images[0] : props.images

  const handlePlus = () => {
    
    // console.log(":PROPSO " ,props)
    dispatch({type: "addtocart", payload: {product: props}})
  }
  const handleMinus = () => {
    dispatch({type: "remove-from-cart", payload: {product: props}})
  }

  // useEffect(()=>{
  //   console.log("Selected item in + - op are: ", state.selectedItems)
  // }, [state.selectedItems])

  return (
    <div className='card'>
      <div className='imgbox'>
        <img src={img} alt='Product Image' className='product-image'></img>
      </div>
      <div className='product-desc'>
        <div className='card-title'>
          <h3> {props.title} </h3>
          <h2 className='price'> {props.price}/-</h2>
        </div>
      {/* <div className='text'> 
        <a className='link'>Sign in</a>&nbsp;or&nbsp;
        <a className='link'>Create</a> an account to see pricing </div> */}
        <div className='addToCartButton'>
          <button className='minus' onClick={handleMinus}>-</button>
          <AddToCart props={props} />
          <button className='plus' onClick={handlePlus}>+</button>
        </div>
      </div>
    </div>
  )
}