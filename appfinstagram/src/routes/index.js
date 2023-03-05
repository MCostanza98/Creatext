import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import{ ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReacToastify.css';

import 'react-toastify/dist/ReactToastify.css';

import Main from "../pages/Main";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";


const Rout = () => {
return(
 <BrowserRouter>
 <ToastContainer
 position="top-center"
 autoClose={2500}
 hideProgressBar={false}
 newestOnTop={false}
 closeOnClick
 rtl={false}
 pauseOnHover
 draggable
 />

  <Routes>

    <Route exact path="/" element={<Main/>}/>
    <Route  exact path="/signin" element={<SignIn/>}/>
    <Route  exact path="/signup" element={<SignUp/>} />
  </Routes>
 </BrowserRouter>

)


}

export default Rout;