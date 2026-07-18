//186024531888-ja5vjsmbc9l618ujq4f4cbav5rs0n7m3.apps.googleusercontent.com

import './App.css'
import ProductCard from './components/productCard'
import TrendingProducts from './components/trendingProducts'
import HomePage from "./pages/homePage"
import AdminPage from './pages/adminPage'
import TestPage from './pages/test'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/loginPage'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './pages/registerPage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ForgetPassword from './pages/forgetPassword'



function App(){
  return(
    <GoogleOAuthProvider clientId='186024531888-ja5vjsmbc9l618ujq4f4cbav5rs0n7m3.apps.googleusercontent.com'>
  
      <div className='w-full h-full  flex justify-center item relative bg-primary text-secondary'>
      <Toaster position='top-right'/>
      <Routes>
        <Route path='/*' element={<HomePage/>}/>
        <Route path='/admin/*' element={<AdminPage/>}/>
        <Route path='/test' element={<TestPage/>}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/forgot-password" element={<ForgetPassword/>}/>
      
      </Routes>
      </div>
    
    </GoogleOAuthProvider>
  )
} 
export default App

  
