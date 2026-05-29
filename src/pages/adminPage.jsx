import { Link, Route, Routes } from "react-router-dom";
import AdminProductPage from "./admin/adminProductPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminEditProductPage from "./admin/adminEditProductPage";

export default function AdminPage(){
    return(
        <div className="w-full min-h-screen flex   bg-accent">
            <div className="w-[300px] min-h-screen bg-accent text-white">
                
                <Link to="/admin/" className="block py-2 px-4 hover:bg-gray-700">Orders</Link>
                <Link to ="/admin/products" className="block py-2 px-4 hover:bg-gray-700">Products</Link>
                <Link to="/admin/users" className="block py-2 px-4 hover:bg-gray-700">Users</Link>
                <Link to="/admin/reviews" className="block py-2 px-4 hover:bg-gray-700">Reviews</Link>

                

            </div>
            <div className="w-[calc(100%-300px)] h-full border-[10px] border-accent rounded-2xl bg-primary">
                <Routes>
                    <Route path="/" element={<h1>Orders Dashboard</h1>}/>
                    <Route path="/products" element={<AdminProductPage />}/>
                    <Route path="/add-product" element={<AdminAddProductPage />}/>
                    <Route path="/edit-products" element={<AdminEditProductPage />}/>
                    <Route path="/users" element={<h1>Users Dashboard</h1>}/>
                    <Route path="/reviews" element={<h1>Reviews Dashboard</h1>}/>
                </Routes>
            </div>
        </div>
    )
}