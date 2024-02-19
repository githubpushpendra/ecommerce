import { Network } from 'lucide-react'
import React, {createContext, useReducer} from 'react'

const initialState = {
  loggedIn: false,
  user: {
    email: '',
    firstName: '',
    lastName: '',
    id: '',
    gender: '',
    imag: '',
    token: null,
    username: null   
  },
  filterValue: 0,
  allItems: [],
  selectedItems: [],
  error: null
}



// const action = {
//   type: "",
//   payload: {
//     username: "",
//     item: ""
//   }
// }

const reducer = (state = initialState, action) => {
  switch(action.type){
    case "login": {
      return {...state, loggedIn: true, user: action.payload.user, allItems:[]}
    }
    case "logout": return {...state, loggedIn: false, username: null, allItems: [], selectedItems: [], totalItems: 0}
    case "addtocart": {
      // selectedItems
      const product = action.payload.product
      // console.log("add to cart bug: ", product.id, product.title)
      // console.log("ATTOTCART: ", action.payload.product.title)
      const index = state.selectedItems.findIndex(item => item.id === product.id)
      const newArr = []
      if(index !== -1) {
        state.selectedItems.forEach((item)=>{
          if(item.id === product.id) newArr.push({id: item.id, count: item.count + 1})
          else newArr.push(item)
        })
      } else {
        state.selectedItems.forEach((item)=>{
          newArr.push({id: item.id, count: item.count})
        })
        newArr.push({id: product.id, count: 1})
      }
      const newState = {
        ...state,
        selectedItems: newArr,
      }
      return newState
    }
    case "remove-from-cart":{
      const product = action.payload.product
    
      const newArr = []
      state.selectedItems.forEach((item)=>{
        if(item.id !== product.id) newArr.push(item)
        else if(item.id === product.id && item.count > 1) newArr.push({id: item.id, count: item.count - 1})
      })
      return {
        ...state,
        selectedItems: newArr
      }
    }
    case "fetchproducts":{
      return {...state, allItems: [...action.payload.items]}
    }
    case "filter": return {...state, filterValue: action.payload.filterValue}
    case "error": return {...state, error: action.payload.error}
    default: return initialState;
  }
}

const StateContext = createContext();

const ContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{state, dispatch}} >
      {children}
    </StateContext.Provider>
  );
}

export {StateContext, ContextProvider}