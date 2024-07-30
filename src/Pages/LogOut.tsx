import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../ReduxToolkit/Reducers/Change/AuthSlice';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = (name:string)=>{
        if(name === "Log Out"){
            dispatch(logout());
            localStorage.removeItem("login")
            localStorage.removeItem("login-user")
            navigate('/login');
        }
    }
    useEffect(() => {
        handleClick("Log Out");
    })
  return (
    <></>
  )
}

export default LogOut
