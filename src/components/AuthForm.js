import { useEffect, useState } from "react"
import { useContext } from "react"
import { StateContext } from "./Context"
import {signIn} from './Utils.js'
import Error from './Error.js'
import './AuthoForm.css'
import { RotatingLines } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"

const AuthoForm = () => {

  const [username, setUsername] = useState("kminchelle")
  const [password, setPassword] = useState("0lelplR")
  const [loading, setLoading] = useState(false)

  const {state, dispatch} = useContext(StateContext)

  const navigate = useNavigate()

  const handleSubmit = () => {
    setLoading(true)
    signIn({username: username, password: password}, (err, user) => {
      if(err) {
        Error(err)
      } else {
        dispatch({type: 'login', payload: {user: user}})
      }
      setLoading(false)
      navigate('/shop')
    })
  }

  useEffect(()=>{
    console.log("Logged User is: ", state.user)
    // if(state.user.username !== null) navigate('/shop')
  }, [state.user])


  return (
    <div className='background'>
      <div className='authentication'>
        {loading ? <RotatingLines /> : 
        <>
          <h1>Login</h1>
          <div className='username'>
            <div className='title'>username</div>
            <div className='input-box'>
              <input placeholder={"username"} value={username}
              onChange={e=>setUsername(e.target.value)}
              ></input>
            </div>
          </div>
          <div className='password'>
          <div className='title'>Password</div>
            <div className='input-box'>
              <input type='password' placeholder={"******"} value={password}
              onChange={e=>setPassword(e.target.value)}
              ></input>
            </div>
          </div>
          <button className='btn btn-primary' style={{marginTop:"20px"}} onClick={handleSubmit}>Login</button>
        </>
        }
      </div>
    </div>
  )
}

export default AuthoForm