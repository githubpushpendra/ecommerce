import React, { useContext, useEffect } from 'react'
import './styles/cart.css'
import { StateContext } from './Context'

export default function AddToCart(props) {

  const {state, dispatch} = useContext(StateContext)

  const handleAddToCart = () => {
    dispatch({type: "addtocart", payload: {product: props.props}})
    // console.log("JGkffd ", props.props.brand)
  }

  // useEffect(()=>{
  //   console.log("ADDED ITEMS: ", state.selectedItems)
  // }, [state.selectedItems])
  // console.log("Props.Props.Count Is: ", props.props.id)
  // const test = () => {
  //   const ans = state.selectedItems.find((obj)=>{
  //     if(obj.id === props.props.id) return obj.count
  //   })
  //   // console.log("Test fun: ", ans)
  // }
  // test()
  return (
    <>
    { state.selectedItems?.some(obj => obj['id'] === props.props.id) ? <>
    <div className='addtocart' style={{cursor: 'default', backgroundColor: 'rgb(36, 35, 35)'}}>
      { state.selectedItems?.some(obj => obj['id'] === props.props.id) ? <>{state.selectedItems.find(obj=>obj.id===props.props.id).count}</>
        :
        <>Added to Cart</>
      }
    </div></>
        :
        <>
        <div className='addtocart' onClick={handleAddToCart}>
      { state.selectedItems?.some(obj => obj['id'] === props.props.id) ? <>Added to cart</>
        :
        <>Add to Cart</>
      }
    </div></>
      }
    </>
    
  )
}
