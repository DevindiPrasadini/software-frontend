

import './App.css'
import ProductCard from './components/productCard'
import TrendingProducts from './components/trendingProducts'

function App(){
  return(
    <>
      <div className='w-[700px] h-[700px] border-[6px] flex justify-center item'>
        <div className='w-[600px] h-[600px] bg-yellow-500 flex flex-col items-center justify-center'>
          <div className='w-[70px] h-[70px] bg-red-600'></div>
          <div className='w-[70px] h-[70px] bg-blue-600'></div>
          <div className='w-[70px] h-[70px] bg-green-400 fixed top-[10px] left-[25px]'></div>
          <div className='w-[70px] h-[70px] bg-orange-500'></div>
          <div className='w-[70px] h-[70px] bg-white'></div>
          <div className='w-[70px] h-[70px] bg-pink-500'></div>
        </div>







      </div>
    </>
  )
} 
export default App

  
