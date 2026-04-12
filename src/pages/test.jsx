/*import { useState } from "react"*/

import { FaRegUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function TestPage(){
   return(
      <div className="w-full h-screen text-4xl flex flex-col justify-center items-center bg-primary text-secondary">
        <FaRegUserCircle className="text-blue-600" />
        <FcGoogle />
         
      </div>
   )
  
}


 /*const [emotion,setEmotion] = useState("😀")
        

    return(
        <div className="w-full h-screen flex flex-col justify-center items-center bg-primary text-secondary">
           <div className="w-[300px] h-[300px] border-[6px] flex justify-center items-center">
             {emotion}
           </div>

           <div className="w-[300px] flex flex-row justify-center">
             <button onClick={
                ()=>{
                  setEmotion("😓")
                }
                }className="bg-accent w-[70px] h-[30px] text-white border border-primary">Sad</button>
             <button onClick={
                ()=>{
                    setEmotion("🌝")
                }
                }className="bg-accent w-[70px] h-[30px] text-white border border-primary">Happy</button>
             <button onClick={
                ()=>{
                   setEmotion("😡")
                }
                }className="bg-accent w-[70px] h-[30px] text-white border border-primary">Angry</button>
           </div>
        </div>
    )*/
