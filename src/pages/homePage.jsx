import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./admin/productsPage";
import ProductOverviewPage from "./admin/productOverviewPage";
import CartPage from "./admin/cart";
import CheckoutPage from "./admin/checkout";
import MyOrdersPage from "./myOrdersPage1";
import SettingsPage from "./settings";
import TestPage from "./test";
import BottomNavigationBar from "../components/bottomNavigationBar";
import NotFoundPage from "./notFoundPage";
import LandingPage from "./landingPage";
import ContactPage from "./contactPage";
import OrderSummaryPage from "./orderSummaryPage";

export default function Homepage(){
    return(
        <div className="w-full h-screen flex flex-col overflow-hidden">
           <Header/> 
           <div className="w-full flex-1 min-h-0 overflow-y-scroll pb-[90px] lg:pb-0">
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/products" element={<ProductsPage/>}/>
                <Route path="/contact-us" element={<ContactPage/>}/>
                <Route path="/overview/:productId" element={<ProductOverviewPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/my-orders" element={<MyOrdersPage/>}/>
                <Route path="/settings" element={<SettingsPage/>}/>
                <Route path="/checkout" element={<CheckoutPage/>}/>
                <Route path="/order-summary" element={<OrderSummaryPage/>}/>
                <Route path="/test" element={<TestPage/>}/>
                <Route path="/*" element={<NotFoundPage/>}/>
            </Routes>
            <BottomNavigationBar/>
           </div>

        </div>
    )
}