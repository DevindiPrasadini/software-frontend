import { useState } from "react"
import getCart, { addToCart, getCartTotal } from "../../utils/cart"
import getFormattedPrice from "../../utils/price-format"
import { Link, useLocation } from "react-router-dom"
import CreateOrderModal from "../../components/createOrderModal"

export default function CheckoutPage() {
    const location = useLocation()
    const [cart, setCart] = useState(location.state)

    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4 lg:py-10 pb-32 lg:pb-10">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8">
                    Shopping Cart
                </h1>

                <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4 lg:space-y-5">

                        {cart.map((item) => (
                            <div
                                key={item.product.productId}
                                className="bg-white rounded-2xl shadow-sm border p-3 lg:p-5 flex gap-3 lg:gap-5 hover:shadow-md transition"
                            >
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-20 h-20 lg:w-32 lg:h-32 object-cover rounded-xl flex-shrink-0"
                                />

                                <div className="flex-1 flex flex-col justify-between min-w-0">

                                    <div>
                                        <h2 className="text-sm lg:text-lg font-semibold truncate">
                                            {item.product.name}
                                        </h2>

                                        <p className="text-gray-400 text-xs lg:text-sm">
                                            ID: {item.product.productId}
                                        </p>

                                        <div className="mt-1 lg:mt-3">
                                            {item.product.labelledPrice >
                                                item.product.price && (
                                                <p className="line-through text-gray-400 text-xs lg:text-base">
                                                    {getFormattedPrice(
                                                        item.product.labelledPrice
                                                    )}
                                                </p>
                                            )}

                                            <p className="text-base lg:text-2xl font-bold text-accent">
                                                {getFormattedPrice(
                                                    item.product.price
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mt-2 lg:mt-4">

                                        <div className="flex items-center border rounded-full overflow-hidden">

                                            <button
                                                onClick={() => {
                                                    addToCart(
                                                        item.product,
                                                        -1
                                                    );
                                                    setCart(getCart());
                                                }}
                                                className="px-3 py-1 lg:px-4 lg:py-2 hover:bg-gray-100 text-sm lg:text-base"
                                            >
                                                −
                                            </button>

                                            <span className="px-3 lg:px-4 font-medium text-sm lg:text-base">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() => {
                                                    addToCart(
                                                        item.product,
                                                        1
                                                    );
                                                    setCart(getCart());
                                                }}
                                                className="px-3 py-1 lg:px-4 lg:py-2 hover:bg-gray-100 text-sm lg:text-base"
                                            >
                                                +
                                            </button>

                                        </div>

                                        <div className="text-right">
                                            <p className="text-xs lg:text-sm text-gray-400">
                                                Subtotal
                                            </p>

                                            <p className="font-bold text-sm lg:text-lg">
                                                {getFormattedPrice(
                                                    item.product.price *
                                                    item.quantity
                                                )}
                                            </p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="fixed bottom-[80px] lg:bottom-0 left-0 right-0 bg-white border-t shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-40">
                        <div className="max-w-6xl mx-auto px-4 py-3 lg:px-6 lg:py-4 flex justify-center lg:justify-end">

                            <div className="w-full lg:w-[500px] bg-white lg:border rounded-t-lg lg:shadow-2xl flex flex-col-reverse sm:flex-row gap-2 p-2 items-stretch sm:items-center justify-between">
                                <CreateOrderModal cart={cart} />

                                <p className="text-lg lg:text-2xl font-bold text-accent text-center sm:text-right">
                                    {getFormattedPrice(getCartTotal(cart))}
                                </p>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}