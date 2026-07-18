import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import getFormattedPrice from "../utils/price-format";
import { getCartTotal } from "../utils/cart";

export default function OrderSummaryPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isPlacing, setIsPlacing] = useState(false);

    const { cart, shippingDetails } = location.state || {};

    if (!cart || !shippingDetails) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-xl font-bold">No order details found</h1>
                <Link to="/checkout" className="px-4 py-2 bg-accent text-white rounded-lg">
                    Back to cart
                </Link>
            </div>
        );
    }

    const total = getCartTotal(cart);

    async function confirmOrder() {
        setIsPlacing(true);
        const token = localStorage.getItem("token");
        try {
            const data = {
                ...shippingDetails,
                paymentMethod: "COD",
                items: cart.map((item) => ({
                    productId: item.product.productId,
                    quantity: item.quantity
                }))
            };

            await api.post("/orders", data, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success("Order placed successfully");
            navigate("/my-orders");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to place order");
        } finally {
            setIsPlacing(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 pb-32 lg:pb-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Order Summary</h1>

                {/* Product details */}
                <div className="bg-white rounded-2xl shadow-sm border p-5 mb-5">
                    <h2 className="font-semibold text-gray-800 mb-4">Items</h2>
                    <div className="flex flex-col gap-3">
                        {cart.map((item) => (
                            <div key={item.product.productId} className="flex items-center gap-4">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">{item.product.name}</p>
                                    <p className="text-sm text-gray-500">
                                        Qty: {item.quantity} × {getFormattedPrice(item.product.price)}
                                    </p>
                                </div>
                                <p className="font-semibold text-gray-800">
                                    {getFormattedPrice(item.product.price * item.quantity)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Shipping details */}
                <div className="bg-white rounded-2xl shadow-sm border p-5 mb-5">
                    <h2 className="font-semibold text-gray-800 mb-3">Shipping To</h2>
                    <p className="text-gray-600 text-sm">
                        {shippingDetails.firstName} {shippingDetails.lastName}
                    </p>
                    <p className="text-gray-600 text-sm">
                        {shippingDetails.addressLineOne}
                        {shippingDetails.addressLineTwo && `, ${shippingDetails.addressLineTwo}`}
                        , {shippingDetails.city}, {shippingDetails.state} {shippingDetails.postalCode}
                    </p>
                    <p className="text-gray-600 text-sm">{shippingDetails.phone}</p>
                </div>

                {/* Payment + delivery */}
                <div className="bg-white rounded-2xl shadow-sm border p-5 mb-5">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-600">Payment Method</span>
                        <span className="font-semibold text-gray-800">Cash on Delivery</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Estimated Delivery</span>
                        <span className="font-semibold text-gray-800">3–5 business days</span>
                    </div>
                </div>

                {/* Total */}
                <div className="bg-white rounded-2xl shadow-sm border p-5 mb-5 flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Total</span>
                    <span className="text-2xl font-bold text-accent">{getFormattedPrice(total)}</span>
                </div>

                <button
                    onClick={confirmOrder}
                    disabled={isPlacing}
                    className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition disabled:opacity-50"
                >
                    {isPlacing ? "Placing order..." : "Confirm Order"}
                </button>
            </div>
        </div>
    );
}