import React from 'react'
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';

const App = () => {
  return (
   


    <div className='w-screen min-h-screen  bg-richblack-900 Core-50 flex flex-col font-inter'>
     <Navbar/>
  <Routes>

    <Route path="/" element={<Home/>}/>
   </Routes>
    </div>
  
  )
}

export default App;
