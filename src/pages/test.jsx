import { useState } from "react"
import { createClient } from "@supabase/supabase-js";
import uploadMedia from "../utils/mediaUpload";
//import { FaRegUserCircle } from "react-icons/fa";
//import { FcGoogle } from "react-icons/fc";

let url="https://dzebvhhdxglmuksuvsgo.supabase.co"
let key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6ZWJ2aGhkeGdsbXVrc3V2c2dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMjMzNzEsImV4cCI6MjA5MTc5OTM3MX0.nsaL-haddL-XoFwEyDZZE_PZSmXcOn-2NjY7xKZwsys"
const supabase = createClient(url , key);

export default function TestPage(){

   const [file, setFile]=useState(null);

   async function handleUpload(){
      try{
         const url = await uploadMedia(file);
         console.log(url)

      }catch(error){
         console.log(error);

      }

      
   }

   return(
      <div className="w-full h-screen text-4xl flex flex-col justify-center items-center bg-primary text-secondary">
         <input onChange={
            (e)=>{
               setFile(e.target.files[0])
            }
         }type="file"/>
         <button onClick={handleUpload} className="bg-secondary text-primary px-4 py-2 rounded-3xl">
            Upload
         </button>
         
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
