import React from 'react'
import { logOut } from '../../Store/AuthSlice'
import authService from "../../appwrite/Auth"
import { useDispatch } from 'react-redux'
function LogoutBtn() {
    const dispatch  = useDispatch()
   const logOutHandler=(()=>{
        authService.logOut()
        .then(()=>(
            dispatch(logOut())
        ))
        .catch((error)=>{
            throw error;
        })
    })
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logOutHandler}
    >Logout</button>
  )
}

export default LogoutBtn