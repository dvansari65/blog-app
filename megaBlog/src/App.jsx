
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import authService from "./appwrite/Auth"
import { Header,Footer } from "./components";
import { logIn,logOut } from "./Store/AuthSlice";
import { Outlet } from "react-router-dom";

 
function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(logIn({userData}))
      }else{
        dispatch(logOut())
      }
    })
    .finally(()=>setLoading(false))
  },[])
  return !loading?(
    <div className="w-screen min-h-screen flex justify-center bg-gray-400">
      <div className=" ">
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ):null
}

export default App
