import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header(){
    return(
        <header className="w-full h-[100px] bg-accent relative flex items-center justify-center flex-shrink-0">
            <Link to="/" className="lg:w-[200px] h-full absolute  lg:left-10 flex justify-center items-center">
                <img src="/logo.png" alt="Logo" className="h-[60px] mr-2"/>
            </Link>
            <div className="h-full hidden lg:flex justify-center items-centers gap-10">
                <Link to="/" className="text-white text-lg font-semibold">Home</Link>
                <Link to="/products" className="text-white text-lg font-semibold">Products</Link>
                <Link to="/Contact-us" className="text-white text-lg font-semibold">Contact Us</Link>
            </div>
            <div className=" h-[50px] hidden absolute right-30 lg:flex justify-center items-center">
                <UserData/>
            </div>
            <Link to="/cart" className="w-[50px] h-[50px] absolute right-10 hidden lg:flex justify-center items-center">
            <BiCart className="text-white text-3xl"/></Link>
        </header>
    )
}