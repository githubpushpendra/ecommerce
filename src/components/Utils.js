import axios from 'axios'
import { useContext } from 'react'
import { StateContext } from './Context'

const signIn = async(user, callback) => {
  try {
    const reqObj = makeReqObj('POST', 'https://dummyjson.com/auth/login', 
    {username: user.username, password: user.password}, 'application/json', null)
    console.log(reqObj)
    const response = await axios(reqObj)
    const data = response.data
    // console.log(data)
    callback(null, data)
  } catch(error) {
    callback(error.message, null)
  }
}

const fetchProducts = async(state, callback) => {
  try{
    const response = await axios.get('https://dummyjson.com/products', null, 'application/json', state.user.token)
    const data = response.data
    console.log(data)
    callback(null, data)  
  } catch(err) {
    callback(err.message, null)
  }
}


const makeReqObj = (method, url, data, content_type, token) => {
  return {
    method,
    url,
    data: data,
    headers: {
      'Authorization': `Bearer ${token}`, 
      'Content-Type': content_type
    }
  }
}

export  {signIn, fetchProducts}