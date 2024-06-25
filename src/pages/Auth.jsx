/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './Auth.css'
import React,{useState} from 'react'
import Login from './Login'
import Register from './Register'


const Auth = (props) =>
    {

        const[login,setLogin] = useState(true)

        return(
            <>
            <div className="Container">
            {login? <Login onsubmitform={props.click}/>: <Register onsubmitform={props.click}/>}
            <input className="input_login" type="button" value={login?"Create account...":"Alredy have an account ..."} onClick={()=>setLogin(!login)}/>
            </div>
            </>
        )
    }


export default Auth