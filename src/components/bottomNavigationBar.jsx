import { GoHome } from "react-icons/go";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import UserData from "./userData";

export default function BottomNavigationBar(){
    return(
        <div className="flex lg:hidden fixed bottom-0 w-full h-[80px] items-center justify-evenly py-2 bg-white shadow-[0_-4px_12px_-4px_rgba(0,0,0,0.25)]">
            <Link to="/" className="w-10 h-10 flex justify-center items-center rounded-lg text-accent shadow-2xl shadow-accent text-2xl">
                <GoHome />
            </Link>
            <Link to="/products" className="w-10 h-10 flex justify-center items-center rounded-lg text-accent shadow-2xl shadow-accent text-2xl">
                <CiSearch />
            </Link>
            <Link to="/cart" className="w-10 h-10 flex justify-center items-center rounded-lg text-accent shadow-2xl shadow-accent text-2xl">
                <CiShoppingCart />
            </Link>
            <UserData/>
        </div>
    )
}