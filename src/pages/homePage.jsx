import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./admin/productsPage";
import ProductOverviewPage from "./admin/productOverviewPage";
import CartPage from "./admin/cart";

export default function Homepage(){
    return(
        <div className="w-full h-screen  flex flex-col  ">
           <Header/> 
           <div className="w-full min-h-[calc(100%-100px)] overflow-y-scroll border">
            <Routes>
                <Route path="/" element={<h1>Welcome to icomputer store!</h1>}/>
                <Route path="/products" element={<ProductsPage/>}/>
                <Route path="/contact-us" element={<h1>Contact us page</h1>}/>
                <Route path="/overview/:productId" element={<ProductOverviewPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
            </Routes>
           </div>

        </div>
    )
}
