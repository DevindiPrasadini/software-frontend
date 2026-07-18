import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import UserData from "./userData";
import { useLocation } from "react-router-dom";

export default function Header(){
    const location = useLocation();

    function isActive(to) {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
}

    return(
        <header className="w-full h-[100px] bg-accent relative flex items-center justify-center flex-shrink-0">
            <Link to="/" className="lg:w-[200px] h-full absolute  lg:left-10 flex justify-center items-center">
                <img src="/iComputer_transparent.png" alt="Logo" className="h-[150px] mr-2"/>
            </Link>
            
            <div className="h-full hidden lg:flex justify-center items-centers gap-10">
                <Link to="/" className="relative text-white mt-7 text-lg font-semibold">
                    Home
                    {isActive("/") && (
                        <span className="absolute left-0 bottom-5 w-full h-[3px] bg-white rounded-full" />
                    )}
                </Link>
                <Link to="/products" className="relative text-white mt-7 text-lg font-semibold">
                    Products
                    {isActive("/products") && (
                        <span className="absolute left-0 bottom-5 w-full h-[3px] bg-white rounded-full" />
                    )}
                </Link>
                <Link to="/Contact-us" className="relative text-white mt-7 text-lg font-semibold">
                    Contact Us
                    {isActive("/Contact-us") && (
                        <span className="absolute left-0 bottom-5 w-full h-[3px] bg-white rounded-full" />
                    )}
                </Link>
            </div>
            <div className=" h-[50px] hidden absolute right-30 lg:flex justify-center items-center">
                <UserData/>
            </div>
            <Link to="/cart" className="w-[50px] h-[50px] absolute right-10 hidden lg:flex justify-center items-center">
            <BiCart className="text-white text-3xl"/></Link>
        </header>
    )
}