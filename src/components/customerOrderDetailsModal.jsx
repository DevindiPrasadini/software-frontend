
import { useState } from "react";

import { FaEye, FaPhoneAlt, FaTimes, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import getFormattedPrice from "../utils/price-format";


const STATUS_OPTIONS = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function CustomerOrderDetailsModal(props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    

    const order = props.order;
   

    

    if (!order) return null;

    
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
                                
                                <div className="w-full h-[250px]  flex flex-col overflow-y-scroll items-center p-4">
                            {
                                order.items.map(
                                    (item , index)=>{
                                        return(
                                            <div key={index} className="w-full flex justify-between items-center bg-gray-100 rounded-lg p-2 mb-2">
                                                <div className="flex items-center gap-4">
                                                    <img className="w-[80px] h-[80px] object-cover rounded-lg" src={item.product.image}/>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="font-semibold text-gray-800">{item.product.name}</span>
                                                        <span className="text-sm text-gray-500">Quantity: {item.quantity}</span>
                                                        <span className="text-sm text-gray-500">Price: {getFormattedPrice(item.product.price)}</span>
                                                    </div>
                                                </div>
                                                <div className="text-lg font-semibold text-gray-800">
                                                    {getFormattedPrice(item.product.price * item.quantity)}
                                                </div>
                                            </div>
                                        )
                                    }
                                )
                            }
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
                         {/*notes */}
                          
                        

                    </div>
                </div>
            }
        </>
    )
}