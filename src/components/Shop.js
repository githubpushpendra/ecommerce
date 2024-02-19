import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "./Context";
import {signIn, fetchProducts} from './Utils.js'
import { RotatingLines } from "react-loader-spinner";
import Card from "./Card.js";
import SearchFilter from "./SearchFilter.js";
import PriceFilter from "./PriceFilter.js";
import AddToCart from "./AddToCart.js";
import AddToCartIcon from "./AddToCartIcon.js";
import { useNavigate } from "react-router-dom";

const Shop = () => {

  const {state, dispatch} = useContext(StateContext);
  const [loading, setLoading] = useState(false)
  const [allItems, setAllItems] = useState([])
  const [searchInput, setSearchInput] = useState("all")
  const [items, setItems] = useState([])
  const navigate = useNavigate()


  useEffect(()=>{
    if(state.user.token === null){
      alert("Please Login!")
    } else {
      setLoading(true)
      fetchProducts(state, (err, products) => {
        setLoading(false)
        if(err) alert(err.message)
        else {
          dispatch({type: 'fetchproducts', payload: {items: [...products.products]}})
        }
      })
    }
  }, [])

  useEffect(()=>{
    if(state.filterValue !== 0) {
      console.log("Filter value is : ", state.filterValue, typeof(state.filterValue))
      const newArray = state.allItems.filter((item) => item.price >= state.filterValue && item.price <= (state.filterValue+500))
      setItems([...newArray])
    } else setItems([...state.allItems])
  }, [state.filterValue])

  useEffect(()=>{
    if(state.allItems.length > 0) {
      setItems([...state.allItems])
    }
  }, [state.allItems])

  const handleSearchSubmit = () => {
    console.log("SUBMITTED")
    const arr = state.allItems?.filter((item)=>{
      return item.title.toUpperCase().match(searchInput.toUpperCase())
    })
    setItems([...arr])
  }

  const handleClick = () => {
    navigate('/your-items')
  }

  return (
    <>
    <AddToCartIcon handleClick={handleClick} />
   
    <div className="shopParent">
      <SearchFilter className="searchbar" searchInput={searchInput} setSearchInput={setSearchInput} handleSearchSubmit={handleSearchSubmit}  />
      <PriceFilter />
    <div className="shop">
      {
        loading ? <RotatingLines />
        :
        <>
        {
        items.map((product) => {
          return<Card key={product?.id} props={product} />
        })
        }
        </>
      }
    </div>
    </div>
    </>
  )
}

export default Shop