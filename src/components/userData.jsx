import { useEffect, useState } from "react"
import api from "../utils/api"
import { Link, useNavigate } from "react-router-dom"

export default function UserData(){

    const [user , setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(
        ()=>{
            const token = localStorage.getItem("token")
            if(token){
                api.get("/users/me" , {
                    headers: {
                        "Authorization":`Bearer ${token}`
                    }
                })
                .then(response=>{
                    setUser(response.data)
                })
                .catch(error =>{
                    console.log(error)
                });
            }
        },[]
    );

    return(
        <div>
            
                {user ? (
                <div className="flex">
                    <img src={user.image} className=" h-[40px] w[30px] aspect-square"/>
                   <select className="text-white text-center" 
                   onChange={(e)=>{
                    if(e.target.value === "option2"){
                        navigate("/settings")
                    }else if(e.target.value === "option3"){
                       navigate("/my-orders")
                   }else if(e.target.value === "option4"){
                     localStorage.removeItem("token")
                        navigate("/login")
                   }

                   e.target.value = "option1"
                        
                   }}>
                    <option value="option1"className="bg-accent ">{user.firstName}</option>
                    <option value="option2"className="bg-accent ">Settings</option>
                    <option value="option3"className="bg-accent ">My Orders</option>
                    <option value="option4"className="bg-accent ">Log Out</option>
                   </select>
                </div>
                ) :(
                    <>
                    <Link to="/login" className="text-white text-lg font-semibold mr-4">Login</Link>
                    <Link to="/register" className="text-white text-lg font-semibold mr-4">Register</Link>
                    </>
                )}
                </div>
                );
          
}