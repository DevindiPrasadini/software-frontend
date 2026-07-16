import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import toast from "react-hot-toast";


export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword , setConfirmPassword]=useState("")
    const [lastName , setLastName]= useState("")
    const [firstName , setFirstName] =useState("")
    const navigate = useNavigate()

    function handleRegister(){//print email and password
        
        if(password != confirmPassword){
            toast.error("Password do not match!")
            return
        }
        
        console.log("email: ",email);
        console.log("password: ",password);
        

        axios.post(import.meta.env.VITE_API_URL+"/users/",{
            email: email,
            password: password,
            firstName : firstName,
            lastName: lastName

        }).then((response)=>{
           

            toast.success("Registered sucessfully")
          
                navigate("/login")
           

        }).catch((error)=>{
            //alert("login failed! chaeck your credentials and try again.")
            //alert(error.data.response.message);
            toast.error(error.response.data.message)
           
        })

    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-[url('/login-bg.jpg')] bg-center bg-cover">
            <div className="w-0 lg:w-1/2 h-full">
            </div>

            <div className=" w-[90%] lg:w-1/2 h-full  flex justify-center items-center">
                <div className="w-[500px] h-[700px] backdrop-blur-lg rounded-xl shadow-2xl flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold mb-8 text-secondary">Sign Up</h1>
                    <div  className="w-3/4 flex gap-4 mb-6">
                    <input 
                    onChange={
                        (e)=>{
                            setFirstName(e.target.value)
                        }
                       }
                       value={firstName}
                       placeholder="First Name"
                       className="w-1/2 p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"/>
                       <input 
                    onChange={
                        (e)=>{
                            setLastName(e.target.value)
                        }
                       }
                       value={lastName}
                       placeholder="Last Name"
                       className="w-1/2 p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"/>
                    </div>
                    <input
                        onChange={
                            (e) => {
                                setEmail(e.target.value)
                            }
                        }
                        value={email}
                        placeholder="Email"
                        className="w-3/4 p-3 mb-6 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">

                    </input>
                    <input
                        onChange={
                            (e) => {
                                setPassword(e.target.value)
                            }
                        }
                        value={password}
                        type="password"
                        placeholder="Password"
                        className="w-3/4 p-3 mb-6 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">

                    </input>
                    <input
                        onChange={
                            (e) => {
                                setConfirmPassword(e.target.value)
                            }
                        }
                        value={confirmPassword}
                        type="password"
                        placeholder="Confirm Password"
                        className="w-3/4 p-3 mb-6 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">

                    </input>
                   
                    <button onClick={handleRegister} className="w-3/4 p-3 bg-accent text-white rounded-lg">
                        Sign Up
                    </button>
                    <p className="mt-6 w-3/4 text-center text-white">Already have an account ?<Link to="/login" className="text-accent">Login</Link></p>




                </div>
            </div>
        </div>
    )
}