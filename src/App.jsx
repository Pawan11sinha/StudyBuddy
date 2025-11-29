import React from 'react'
import Home from './pages/Home';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import OpenRoute from "./components/core/Auth/OpenRoute"
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
// import About from "./pages/About";
// import Contact from "./pages/Contact";

const App = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.profile)
  return (
   


    <div className='w-screen min-h-screen  bg-richblack-900 Core-50 flex flex-col font-inter'>
     <Navbar/>
  <Routes>

    <Route path="/" element={<Home/>}/>


  <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

{/* 
    <Route
          path="/about"
          element={
            
              <About />
            
          }
        />
    <Route path="/contact" element={<Contact />} />
 */}




 <Route path="*" element={<Error />} />

  </Routes>

    </div>
  
  )
}

export default App;

