import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import toast from "react-hot-toast";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    function handleLogin(){//print email and password
        console.log("email: ",email);
        console.log("password: ",password);
        

        axios.post(import.meta.env.VITE_API_URL+"/users/login",{
            email: email,
            password: password
        }).then((response)=>{
            console.log("Login successful: ", response.data);
            localStorage.setItem("token", response.data.token);
            //alert("Login successfull")
            toast.success("login sucessfull")
            if(response.data.isAdmin){
                //redirect to admin dashboard
                //window.location.href = "/admin"
                
                navigate("/admin")
            }else{
                //redirect to home page
                //window.location.href ="/"
                navigate("/")
            }

        }).catch((error)=>{
            //alert("login failed! chaeck your credentials and try again.")
            //alert(error.data.response.message);
            toast.error(error.response.data.message)
           
        })

    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-[url('/login-bg.jpg')] bg-center bg-cover">
            <div className="w-1/2 h-full">
            </div>

            <div className="w-1/2 h-full  flex justify-center items-center">
                <div className="w-[500px] h-[700px] backdrop-blur-lg rounded-xl shadow-2xl flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold mb-8 text-secondary">Sign in</h1>
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
                        className="w-3/4 p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">

                    </input>
                    <p className="mb-6 w-3/4 text-right">Forget Password? <Link to="/forgot-password" className="text-accent">Click here</Link></p>
                    <button onClick={handleLogin} className="w-3/4 p-3 bg-accent text-white rounded-lg">
                        Sign In
                    </button>
                    <p className="mt-6 w-3/4 text-center text-white">Don't have an account?<Link to="/register" className="text-accent">Register</Link></p>




                </div>
            </div>
        </div>
    )
}