import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaPhoneAlt, FaTimes, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import getFormattedPrice from "../utils/price-format";

const STATUS_OPTIONS = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function OrderDetailsModal(props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState(props.order?.status || "Pending");
    const [isUpdating, setIsUpdating] = useState(false);

    const order = props.order;
    const refresh = props.refresh;

    if (!order) return null;

    async function handleUpdateStatus() {
        setIsUpdating(true);
        try {
            await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/orders/${order.orderId}`,
                { status }
            );
            toast.success("Order status updated");
            setIsModalOpen(false);
            refresh && refresh();
        } catch (err) {
            console.error(err);
            toast.error("Failed to update order status");
        } finally {
            setIsUpdating(false);
        }
    }

    return (
        <>
            <FaEye
                className="text-2xl text-blue-500 cursor-pointer hover:text-blue-700"
                onClick={() => setIsModalOpen(true)}
            />
            {isModalOpen &&
                <div className="w-screen h-screen fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">

                        {/* Header — fixed */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
                            <div>
                                <h2 className="text-base font-bold text-gray-900">Order Details</h2>
                                <p className="text-xs text-blue-600 font-medium mt-0.5">
                                    {order.orderId}
                                </p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                            >
                                <FaTimes className="text-sm" />
                            </button>
                        </div>

                        {/* Scrollable body */}
                        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">

                            {/* Customer info — compact */}
                            <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                                <p className="text-sm font-semibold text-gray-800">
                                    {order.firstName} {order.lastName}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <FaEnvelope className="text-gray-400 shrink-0" />
                                    <span className="truncate">{order.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <FaPhoneAlt className="text-gray-400 shrink-0" />
                                    <span>{order.phone}</span>
                                </div>
                                <div className="flex items-start gap-2 text-xs text-gray-500">
                                    <FaMapMarkerAlt className="text-gray-400 shrink-0 mt-0.5" />
                                    <span className="leading-relaxed">
                                        {order.addressLineOne}, {order.addressLineTwo}, {order.city}, {order.state}
                                    </span>
                                </div>
                            </div>

                            {/* Items */}
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                                    Items ({order.items.length})
                                </p>
                                <div className="space-y-2">
                                    {order.items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-2 shadow-sm"
                                        >
                                            <img
                                                className="w-14 h-14 object-cover rounded-lg shrink-0"
                                                src={item.product.image}
                                                alt={item.product.name}
                                            />
                                            <div className="flex flex-col min-w-0 flex-1">
                                                <span className="text-sm font-medium text-gray-800 truncate">
                                                    {item.product.name}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    Qty: {item.quantity}
                                                </span>
                                                <span className="text-xs text-gray-500 font-medium">
                                                    {getFormattedPrice(item.product.price)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Footer — fixed, total pinned bottom-right */}
                        <div className="shrink-0 border-t border-gray-100 px-5 py-4 flex items-center justify-between bg-white">
                            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                                Total
                            </span>
                            <span className="text-lg font-bold text-green-600">
                                {getFormattedPrice(order.total)}
                            </span>
                        </div>

                    </div>
                </div>
            }
        </>
    )
}