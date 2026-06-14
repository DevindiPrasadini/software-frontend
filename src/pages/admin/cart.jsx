import { useState } from "react"
import getCart, { addToCart } from "../../utils/cart"
import getFormattedPrice from "../../utils/price-format"

export default function CartPage() {
    const [cart, setCart] = useState(getCart())

    return (
        <div className="w-full h-full flex flex-col p-5 items-center gap-4">
            {cart.map((item) => (
                <div key={item.product.productId} className="bg-white w-[500px] h-[150px] relative rounded-lg shadow-2xl flex">
                    <img className="w-[100px] h-[100px] object-cover rounded-l-lg" src={item.product.image} />
                    <div className="h-full w-[400px]">
                        <h1 className="text-lg font-semibold">{item.product.name}</h1>
                        <p className="text-sm text-gray-500">{item.product.productId}</p>
                        {item.product.labelledPrice > item.product.price && (
                            <p className="text-sm text-gray-500 line-through mt-2">
                                {getFormattedPrice(item.product.labelledPrice)}
                            </p>
                        )}
                        <p className="text-accent font-semibold text-sm">
                            {getFormattedPrice(item.product.price)}
                        </p>
                        <div className="w-[200px] h-full absolute right-2 border flex flex-col justify-end items-end p-2">
                            <div className="w-[100px] h-[30px] border rounded-full flex items-center justify-between p-2">
                                <button
                                    className="text-lg font-bold cursor-pointer hover:text-accent"
                                    onClick={() => { addToCart(item.product, -1); setCart(getCart()) }}
                                >-</button>
                                <span>{item.quantity}</span>
                                <button
                                    className="text-lg font-bold cursor-pointer hover:text-accent"
                                    onClick={() => { addToCart(item.product, 1); setCart(getCart()) }}
                                >+</button>
                            </div>
                            <p className="text-xl mt-2">
                                <span className="text-secondary font-semibold">
                                    {getFormattedPrice(item.product.price * item.quantity)}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}