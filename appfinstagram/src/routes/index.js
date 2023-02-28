import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from "../pages/Main";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";


const Rout = () => {
return(
 <BrowserRouter>
  <Routes>

    <Route path="/" element={<Main/>}/>
    <Route path="/signIn" element={<SignIn/>}/>
    <Route path="/signUp" element={<SignUp/>} />
  </Routes>
 </BrowserRouter>

)


}

export default Rout;