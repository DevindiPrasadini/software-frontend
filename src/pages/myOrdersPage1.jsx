import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingAnimation from "../components/loadingAnimation";
import getFormattedPrice from "../utils/price-format";
import CustomerOrderDetailsModal from "../components/customerOrderDetailsModal";

const STATUS_STYLES = {
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700"
};

export default function MyOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [isOrdersAreLoaded, setIsOrdersAreLoaded] = useState(false);
    const [cancellingId, setCancellingId] = useState(null);

    useEffect(() => {
        if (!isOrdersAreLoaded) {
            const token = localStorage.getItem("token");

            axios.get(import.meta.env.VITE_API_URL + "/orders/" + pageSize + "/" + currentPage, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then(
                (response) => {
                    setOrders(response.data.orders);
                    setTotalOrders(response.data.total);
                    setTotalPages(response.data.totalPages);
                    setIsOrdersAreLoaded(true);
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            );
        }
    }, [isOrdersAreLoaded]);

    async function handleCancel(orderId) {
        if (!window.confirm("Cancel this order? This cannot be undone.")) return;

        setCancellingId(orderId);
        const token = localStorage.getItem("token");
        try {
            await axios.put(import.meta.env.VITE_API_URL + "/orders/" + orderId + "/cancel", {}, {
                headers: { Authorization: "Bearer " + token }
            });
            toast.success("Order cancelled");
            setIsOrdersAreLoaded(false);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to cancel order");
        } finally {
            setCancellingId(null);
        }
    }

    return (
        <div className="w-full min-h-screen bg-gray-50 p-6">
            <div className="w-full min-h-[90px] rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-between px-6 mb-6">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">My Orders</h1>
                    <p className="text-sm text-gray-500 mt-1">Track your orders and delivery status</p>
                </div>
                <span className="text-sm text-gray-600">
                    Total: <span className="font-semibold text-gray-800">{totalOrders}</span>
                </span>
            </div>

            {
                isOrdersAreLoaded ?
                    orders.length === 0 ? (
                        <p className="text-gray-500 text-center py-10">You haven't placed any orders yet.</p>
                    ) : (
                        <>
                            <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                                <table className="w-full min-w-[800px] text-sm text-gray-700">
                                    <thead className="bg-gray-100 text-gray-600">
                                        <tr>
                                            <th className="text-left font-semibold px-5 py-4">Order ID</th>
                                            <th className="text-left font-semibold px-5 py-4">Date</th>
                                            <th className="text-left font-semibold px-5 py-4">Items</th>
                                            <th className="text-left font-semibold px-5 py-4">Total</th>
                                            <th className="text-left font-semibold px-5 py-4">Status</th>
                                            <th className="text-left font-semibold px-5 py-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((item) => (
                                            <tr key={item.orderId} className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                                                <td className="px-5 py-4">
                                                    <span className="inline-block rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                                        {item.orderId}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-gray-600">
                                                    {new Date(item.date).toLocaleDateString()}
                                                </td>
                                                <td className="px-5 py-4 text-gray-600">
                                                    {item.items.length} item{item.items.length !== 1 ? "s" : ""}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="font-semibold text-gray-800">{getFormattedPrice(item.total)}</span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[item.status] || "bg-gray-100 text-gray-600"}`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <CustomerOrderDetailsModal order={item} />
                                                        {item.status === "Pending" && (
                                                            <button
                                                                onClick={() => handleCancel(item.orderId)}
                                                                disabled={cancellingId === item.orderId}
                                                                className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium disabled:opacity-50"
                                                            >
                                                                {cancellingId === item.orderId ? "Cancelling..." : "Cancel"}
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="w-full flex justify-end items-center gap-3 mt-4">
                                <button
                                    onClick={() => {
                                        if (currentPage > 1) {
                                            setCurrentPage(currentPage - 1);
                                            setIsOrdersAreLoaded(false);
                                        }
                                    }}
                                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                                >
                                    Previous
                                </button>
                                <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
                                <button
                                    onClick={() => {
                                        if (currentPage < totalPages) {
                                            setCurrentPage(currentPage + 1);
                                            setIsOrdersAreLoaded(false);
                                        }
                                    }}
                                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                                >
                                    Next
                                </button>
                                <select
                                    value={pageSize}
                                    onChange={(e) => {
                                        setPageSize(parseInt(e.target.value));
                                        setCurrentPage(1);
                                        setIsOrdersAreLoaded(false);
                                    }}
                                    className="ml-4 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                </select>
                            </div>
                        </>
                    )
                    :
                    <LoadingAnimation />
            }
        </div>
    );
}