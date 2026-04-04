

import './App.css'
import ProductCard from './components/productCard'
import TrendingProducts from './components/trendingProducts'
import HomePage from "./pages/homePage"
import AdminPage from './pages/adminPage'
import { Route, Routes } from 'react-router-dom'


function App(){
  return(
    <>
      <div className='w-full h-screen border-[6px] flex justify-center item relative'>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/admin' element={<AdminPage/>}/>
      </Routes>
      </div>
    </>
  )
} 
export default App

  
