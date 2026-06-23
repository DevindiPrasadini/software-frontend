import { useState } from "react"
import getCart, { addToCart , getCartTotal} from "../../utils/cart"
import getFormattedPrice from "../../utils/price-format"
import { Link, useLocation } from "react-router-dom"
import CreateOrderModal from "../../components/createOrderModal"

export default function CheckoutPage() {
    const location = useLocation()
    const [cart, setCart] = useState(location.state)

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
    <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
            Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-5">

                {cart.map((item) => (
                    <div
                        key={item.product.productId}
                        className="bg-white rounded-2xl shadow-sm border p-5 flex gap-5 hover:shadow-md transition"
                    >
                        <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-32 h-32 object-cover rounded-xl"
                        />

                        <div className="flex-1 flex flex-col justify-between">

                            <div>
                                <h2 className="text-lg font-semibold">
                                    {item.product.name}
                                </h2>

                                <p className="text-gray-400 text-sm">
                                    ID: {item.product.productId}
                                </p>

                                <div className="mt-3">
                                    {item.product.labelledPrice >
                                        item.product.price && (
                                        <p className="line-through text-gray-400">
                                            {getFormattedPrice(
                                                item.product.labelledPrice
                                            )}
                                        </p>
                                    )}

                                    <p className="text-2xl font-bold text-accent">
                                        {getFormattedPrice(
                                            item.product.price
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-4">

                                <div className="flex items-center border rounded-full overflow-hidden">

                                    <button
                                        onClick={() => {
                                            addToCart(
                                                item.product,
                                                -1
                                            );
                                            setCart(getCart());
                                        }}
                                        className="px-4 py-2 hover:bg-gray-100"
                                    >
                                        −
                                    </button>

                                    <span className="px-4 font-medium">
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
                                        className="px-4 py-2 hover:bg-gray-100"
                                    >
                                        +
                                    </button>

                                </div>

                                <div className="text-right">
                                    <p className="text-sm text-gray-400">
                                        Subtotal
                                    </p>

                                    <p className="font-bold text-lg">
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
           <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-50">
    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <div className="w-[500px] bg-white border rounded-t-lg shadow-2xl flex p-2 items-center justify-between fix-botton">
            <CreateOrderModal cart={cart}/>
           
           <p className="text-2xl font-bold text-accent">
                {getFormattedPrice(getCartTotal(cart))}
            </p>
        </div>

        {/* <Link
            to="/checkout"
            state={cart}
            className="bg-accent text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
            Order Now
        </Link> */}

    </div>
</div>
            

        </div>

    </div>
</div>
    )
}

