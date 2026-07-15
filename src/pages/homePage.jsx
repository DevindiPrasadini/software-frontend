import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./admin/productsPage";
import ProductOverviewPage from "./admin/productOverviewPage";
import CartPage from "./admin/cart";
import CheckoutPage from "./admin/checkout";
import CustomerOrdersPage from "./customerMyOrdersPage";
import SettingsPage from "./settings";
import TestPage from "./test";
import BottomNavigationBar from "../components/bottomNavigationBar";
import NotFoundPage from "./notFoundPage";

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
                <Route path="/my-orders" element={<CustomerOrdersPage/>}/>
                <Route path="/settings" element={<SettingsPage/>}/>
                <Route path="/checkout" element={<CheckoutPage/>}/>
                <Route path="/test" element={<TestPage/>}/>
                <Route path="/*" element={<NotFoundPage/>}/>
            </Routes>
            <BottomNavigationBar/>
           </div>

        </div>
    )
}
