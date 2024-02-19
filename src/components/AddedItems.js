import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import { RotatingLines} from 'react-loader-spinner'
import { StateContext } from './Context'

export default function AddedItems() {

  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])

  const {state, dispatch} = useContext(StateContext)

  useEffect(()=>{
    // console.log("SELECTED ITEMS ARE: ", state.selectedItems)
    // const newItems = state.allItems.map(item => {
    //   const newArr = state.selectedItems.filter((item2) => item2.id === item.id) 
    //   if(newArr.length > 0) return item
    // } )
    const newArr = state.allItems.filter((item)=> state.selectedItems.some(item2 => item2.id === item.id))
    // console.log("SELECTED: ", state.selectedItems)
    // console.log("ALL ITEMS: ", state.allItems)
    // console.log("ITEMS TO SHOW: ", newArr)
    setItems([...newArr])
  }, [])

  return (
    <div>
      <div className="shopParent">
      <div className="shop">
        {
          loading ? <RotatingLines />
          :
          <>
          {
          items.map((product) => {
            return <Card key={product?.id} props={product} />
          })
          }
          </>
        }
      </div>
    </div>
    </div>
  )
}
