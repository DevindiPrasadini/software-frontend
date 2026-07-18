import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import getFormattedPrice from "../utils/price-format";

const LOW_STOCK_THRESHOLD = 5;

export default function ProductCard(props) {
  const product = props.product;
  const reviewStats = props.reviewStats || { averageRating: 0, reviewCount: 0 };
  const unitsSold = props.unitsSold || 0;

  const stock = product.stock ?? 0;
  const isOutOfStock = stock <= 0;
  const isLowStock = !isOutOfStock && stock <= LOW_STOCK_THRESHOLD;

  return (
    <Link
      to={"/overview/" + product.productId}
      state={product}
      className={`w-[300px] h-[450px] m-10 rounded-lg shadow-2xl overflow-hidden flex flex-col hover:[&_.primary-image]:opacity-0 justify-between cursor-pointer ${isOutOfStock ? "opacity-60" : ""}`}
    >
      <div className="w-[300px] h-[300px] relative">
        <img src={product.images[1]} alt={product.productName} className="w-[300px] h-[300px] object-cover bg-white absolute top-0 left-0" />
        <img src={product.images[0]} alt={product.productName} className="w-[300px] h-[300px] object-cover bg-white absolute top-0 left-0 primary-image transition-opacity duration-500" />

        {isOutOfStock && (
          <div className="absolute top-3 left-3 bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Out of Stock
          </div>
        )}
        {isLowStock && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Only {stock} left
          </div>
        )}
      </div>
      <h1 className="text-lg font-semibold mt-2 px-2">{product.name}</h1>

      <div className="flex items-center gap-2 px-4">
        <StarRating rating={Math.round(reviewStats.averageRating)} readOnly onChange={() => { }} />
        <span className="text-sm text-gray-500">
          {reviewStats.reviewCount > 0
            ? `${reviewStats.averageRating.toFixed(1)} (${reviewStats.reviewCount})`
            : "No reviews yet"}
        </span>
      </div>

      {unitsSold > 0 && (
        <span className="text-xs text-gray-500 px-4 mt-1">{unitsSold} sold</span>
      )}

      <div className="w-full flex flex-col py-4">
        {
          product.labelledPrice > product.price && <span className="tetx-sm text-gray-500 mt-2 px-4 line-through">{getFormattedPrice(product.labelledPrice)}</span>
        }
        <span className="text-lg font-bold mt-1 px-4">{product.price}</span>
      </div>
    </Link>
  )
}