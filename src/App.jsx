

import './App.css'
import ProductCard from './components/productCard'
import TrendingProducts from './components/trendingProducts'
import HomePage from "./pages/homePage"
import AdminPage from './pages/adminPage'
import TestPage from './pages/test'
import { Route, Routes } from 'react-router-dom'


function App(){
  return(
    <>
      <div className='w-full h-screen  flex justify-center item relative bg-primary text-secondary'>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/admin/*' element={<AdminPage/>}/>
        <Route path='/test' element={<TestPage/>}/>
      </Routes>
      </div>
    </>
  )
} 
export default App

  
