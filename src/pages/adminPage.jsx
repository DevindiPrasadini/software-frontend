import { useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import {
    FaBoxOpen,
    FaShoppingCart,
    FaUsers,
    FaStar,
    FaBars,
    FaTimes,
} from "react-icons/fa";
import AdminProductPage from "./admin/adminProductPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminEditProductPage from "./admin/adminEditProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import AdminUsersPage from "./admin/adminUsersPage";
import AdminReviewPage from "./admin/adminReviewPage";

const NAV_ITEMS = [
    { to: "/admin/", label: "Orders", icon: FaShoppingCart, exact: true },
    { to: "/admin/products", label: "Products", icon: FaBoxOpen },
    { to: "/admin/users", label: "Users", icon: FaUsers },
    { to: "/admin/reviews", label: "Reviews", icon: FaStar },
];

export default function AdminPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const location = useLocation();

    function isActive(item) {
        if (item.exact) return location.pathname === item.to;
        return location.pathname.startsWith(item.to);
    }

    return (
        <div className="w-full h-screen flex bg-gray-100 overflow-hidden">

            {/* Mobile top bar */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-accent text-white flex items-center justify-between px-4 z-40 shadow-md">
                <span className="font-bold text-lg">Admin Panel</span>
                <button onClick={() => setIsDrawerOpen(true)} aria-label="Open menu">
                    <FaBars className="text-xl" />
                </button>
            </div>

            {/* Mobile drawer overlay */}
            {isDrawerOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-50"
                    onClick={() => setIsDrawerOpen(false)}
                >
                    <div
                        className="w-[260px] h-full bg-accent text-white flex flex-col shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-4 h-14 border-b border-white/20">
                            <span className="font-bold text-lg">Admin Panel</span>
                            <button onClick={() => setIsDrawerOpen(false)} aria-label="Close menu">
                                <FaTimes className="text-xl" />
                            </button>
                        </div>
                        <nav className="flex flex-col mt-2">
                            {NAV_ITEMS.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item);
                                return (
                                    <Link
                                        key={item.to}
                                        to={item.to}
                                        onClick={() => setIsDrawerOpen(false)}
                                        className={`flex items-center gap-3 py-3 px-5 transition ${
                                            active ? "bg-white/20 font-semibold" : "hover:bg-white/10"
                                        }`}
                                    >
                                        <Icon className="text-lg" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            )}

            {/* Desktop sidebar */}
            <div className="hidden lg:flex w-[260px] h-screen bg-accent text-white flex-col shrink-0">
                <div className="px-5 py-6">
                    <span className="font-bold text-xl">Admin Panel</span>
                </div>
                <nav className="flex flex-col gap-1 px-3">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item);
                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={`flex items-center gap-3 py-3 px-4 rounded-xl transition ${
                                    active ? "bg-white/20 font-semibold" : "hover:bg-white/10 text-white/90"
                                }`}
                            >
                                <Icon className="text-lg" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Main content */}
            <div className="w-full h-screen pt-14 lg:pt-0 pb-16 lg:pb-0 overflow-y-auto lg:overflow-hidden flex flex-col">
                <div className="w-full flex-1 lg:m-4 lg:rounded-2xl bg-white p-4 lg:p-6 lg:shadow-sm overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<AdminOrdersPage />} />
                        <Route path="products" element={<AdminProductPage />} />
                        <Route path="add-product" element={<AdminAddProductPage />} />
                        <Route path="edit-product" element={<AdminEditProductPage />} />
                        <Route path="users" element={<AdminUsersPage />} />
                        <Route path="reviews" element={<AdminReviewsPage/>} />
                    </Routes>
                </div>
            </div>

            {/* Mobile bottom tab bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex justify-around items-center z-40 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item);
                    return (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`flex flex-col items-center justify-center gap-1 text-xs ${
                                active ? "text-accent font-semibold" : "text-gray-400"
                            }`}
                        >
                            <Icon className="text-lg" />
                            {item.label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}