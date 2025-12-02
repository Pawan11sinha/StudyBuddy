import React from 'react'
import Home from './pages/Home';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import OpenRoute from "./components/core/Auth/OpenRoute"
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import About from "./pages/About";
import DoubtChat from './components/common/DoubtChat';
// import Contact from "./pages/Contact";

// App.jsx or Routes.jsx



import QuizCategory from "./pages/Quiz/QuizCategory";
import QuizPlay from "./pages/Quiz/QuizPlay";
import QuizHistory from "./pages/Quiz/QuizHistory";
// aur tumhara PrivateRoute/RequireAuth











const App = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.profile)
  return (
   


    <div className='w-screen min-h-screen  bg-richblack-900 Core-50 flex flex-col font-inter'>
     <Navbar/>
  <Routes>

    <Route path="/" element={<Home/>}/>

    <Route path="/doubt-helper" 
          element={
           
            <DoubtChat />
         
            } />


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

          <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }
        />

         <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />  



    <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />  




    <Route
          path="/about"
          element={
            
              <About />
            
          }
        />

    <Route path="/quiz" element={<QuizCategory />} />
  <Route path="/quiz/:category" element={<QuizPlay />} />
  <Route path="/quiz/history" element={<QuizHistory />} />


          
    {/* <Route path="/contact" element={<Contact />} /> */}





 <Route path="*" element={<Error />} />

  </Routes>

    </div>
  
  )
}

export default App;

