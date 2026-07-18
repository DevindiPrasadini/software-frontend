import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../utils/api"
import toast from "react-hot-toast"
import LoadingAnimation from "../../components/loadingAnimation"
import ImageSlideShow from "../../components/imageSlideShow"
import { Link } from "react-router-dom"
import getFormattedPrice from "../../utils/price-format"
import getCart, { addToCart } from "../../utils/cart"
import ReviewForm from "../../components/ReviewForm"
import ReviewList from "../../components/ReviewList"

const LOW_STOCK_THRESHOLD = 5;

export default function ProductOverviewPage() {
    const parameters = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [status, setStatus] = useState("loading")
    const [user, setUser] = useState(null)
    const [reviews, setReviews] = useState([])
    const [reviewsLoading, setReviewsLoading] = useState(false)

    useEffect(
        () => {
            api.get("/products/" + parameters.productId).then(
                (response) => {
                    setProduct(response.data)
                    setStatus("success")
                }
            ).catch(
                (error) => {
                    toast.error(error?.response?.data?.message || "An error occured while fetching product details.")
                    setStatus("error")
                }
            )
        }

        , []
    )

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            api.get("/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => setUser(response.data))
            .catch((error) => console.log(error))
        }
    }, [])

    useEffect(() => {
        if (product) {
            fetchReviews()
        }
    }, [product])

    async function fetchReviews() {
        if (!product) return

        setReviewsLoading(true)

        try {
            const response = await api.get(
                `/reviews/product/${product.productId}`
            )
            setReviews(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setReviewsLoading(false)
        }
    }

    return (
        <div className="w-full min-h-full flex flex-col items-center">
            {
                status == "loading" && (
                    <div className="w-full h-full flex justify-center items-center">
                        <LoadingAnimation />
                    </div>
                )
            }
            {
                status == "error" && (
                    <div className="w-full h-[300px] flex flex-col items-center justify-center gap-4">
                        <h1 className="text-2xl font-bold">Failed to load product details</h1>
                        <Link to="/products" className="px-4 py-2 bg-accent text-white rounded">Back to products </Link>
                    </div>
                )
            }
            {
                status == "success" && (() => {
                    const stock = product.stock ?? 0;
                    const isOutOfStock = stock <= 0;
                    const isLowStock = !isOutOfStock && stock <= LOW_STOCK_THRESHOLD;

                    return (
                        <div className="w-full bg-white flex flex-col pb-32 lg:pb-10">
                            <div className="w-full flex lg:flex-row flex-col">
                                <div className="lg:w-1/2 w-full flex justify-center items-center">
                                    <ImageSlideShow images={product.images} />
                                </div>
                                <div className="lg:w-1/2 w-full flex flex-col p-5">
                                    <h1 className="text-2xl lg:text-3xl font-bold">{product.name}
                                        {(product.altNames || []).map(
                                            (alterantiveName, index) => {
                                                return (
                                                    <span key={index} className="text-sm text-gray-500"> | {alterantiveName}</span>
                                                )
                                            }
                                        )}</h1>
                                    <h2 className="text-sm text-gray-500">{product.productId}</h2>

                                    <div className="w-full mt-5 flex flex-col">
                                        <p className="text-accent font-semibold text-2xl lg:text-3xl">
                                            {getFormattedPrice(product.price)}
                                        </p>
                                        {
                                            product.labelledPrice > product.price &&
                                            <span className="text-lg lg:text-xl text-gray-500 line-through ">
                                                {getFormattedPrice(product.labelledPrice)}
                                            </span>
                                        }

                                        {isOutOfStock && (
                                            <span className="mt-2 inline-block w-fit bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full">
                                                Out of Stock
                                            </span>
                                        )}
                                        {isLowStock && (
                                            <span className="mt-2 inline-block w-fit bg-orange-100 text-orange-600 text-sm font-medium px-3 py-1 rounded-full">
                                                Only {stock} left in stock
                                            </span>
                                        )}
                                    </div>

                                    {/* brand and model */}
                                    <div className="w-full mt-5 flex gap-10 flex-wrap">
                                        <span className="text-base lg:text-lg text-gray-500"><span className="text-gray-800 font-semibold">{product.brand}</span></span>
                                        <span className="text-base lg:text-lg text-gray-500"><span className="text-gray-800 font-semibold">{product.model}</span></span>
                                    </div>
                                    {/* category */}
                                    <div className="w-full mt-5 flex gap-10">
                                        <span className="text-base lg:text-lg text-gray-500"><span className="text-gray-800 font-semibold">{product.category}</span></span>
                                    </div>
                                    <p className="text-base lg:text-lg mt-5">
                                        {product.description}
                                    </p>

                                    {/* Desktop buttons - inline */}
                                    <div className="hidden lg:flex mt-5 gap-5">
                                        <button
                                            className={`w-62.5 h-16 font-semibold rounded-lg transition-colors-300 ${
                                                isOutOfStock
                                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                    : "bg-green-500 text-white cursor-pointer hover:bg-green-700"
                                            }`}
                                            disabled={isOutOfStock}
                                            onClick={() => {
                                                addToCart(product, 1)
                                                toast.success("Product added to cart")
                                            }}
                                        >
                                            {isOutOfStock ? "Out of Stock" : "Add to cart"}
                                        </button>

                                        {isOutOfStock ? (
                                            <button
                                                disabled
                                                className="w-62.5 h-16 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed flex justify-center items-center"
                                            >
                                                Buy now
                                            </button>
                                        ) : (
                                            <Link to="/checkout" state={
                                                [
                                                    {
                                                        product: {
                                                            productId: product.productId,
                                                            name: product.name,
                                                            image: product.images[0],
                                                            labelledPrice: product.labelledPrice,
                                                            price: product.price,
                                                        },
                                                        quantity: 1
                                                    }
                                                ]
                                            }
                                                className="w-62.5 h-16 bg-blue-500 text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors-300 flex justify-center items-center">Buy now</Link>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Mobile buttons - fixed above bottom nav */}
                            <div className="flex lg:hidden gap-5 fixed bottom-[70px] left-0 w-full p-3 bg-white/90 backdrop-blur-md border-t z-10">
                                <button
                                    className={`flex-1 h-14 font-semibold rounded-lg transition-colors-300 ${
                                        isOutOfStock
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-green-500 text-white cursor-pointer hover:bg-green-700"
                                    }`}
                                    disabled={isOutOfStock}
                                    onClick={() => {
                                        addToCart(product, 1)
                                        toast.success("Product added to cart")
                                    }}
                                >
                                    {isOutOfStock ? "Out of Stock" : "Add to cart"}
                                </button>

                                {isOutOfStock ? (
                                    <button
                                        disabled
                                        className="flex-1 h-14 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed flex justify-center items-center"
                                    >
                                        Buy now
                                    </button>
                                ) : (
                                    <Link to="/checkout" state={
                                        [
                                            {
                                                product: {
                                                    productId: product.productId,
                                                    name: product.name,
                                                    image: product.images[0],
                                                    labelledPrice: product.labelledPrice,
                                                    price: product.price,
                                                },
                                                quantity: 1
                                            }
                                        ]
                                    }
                                        className="flex-1 h-14 bg-blue-500 text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors-300 flex justify-center items-center">Buy now</Link>
                                )}
                            </div>

                            {/* Reviews section */}
                            <div className="w-full px-5 mt-10 flex flex-col gap-6 max-w-3xl mx-auto">
                                <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
                                <ReviewForm
                                    productId={product.productId}
                                    onReviewAdded={fetchReviews}
                                />
                                <ReviewList
                                    reviews={reviews}
                                    loading={reviewsLoading}
                                    isAdmin={user?.isAdmin}
                                    onReviewDeleted={fetchReviews}
                                    onReviewUpdated={fetchReviews}
                                />
                            </div>
                        </div>
                    );
                })()
            }
        </div>
    )
}