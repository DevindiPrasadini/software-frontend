import { Link } from "react-router-dom";  // ✅ add this

export default function ProductCard(props) {

  const product = props.product;
  return (
    <Link to={"/overview/"+product.productId} state={product} className="w-[300px] h-[450px] m-10 bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col hover:[&_.primary-image]:opacity-0 justify-between cursor-pointer">
      <div className="w-[300px] h-[300px] bg-red-300 relative">
        <img src={product.images[1]} alt={product.productName} className="w-[300px] h-[300px] object-cover bg-white absolute top-0 left-0" />
        <img src={product.images[0]} alt={product.productName} className="w-[300px] h-[300px] object-cover bg-white absolute top-0 left-0 primary-image transition-opacity duration-500" />
      </div>
      <h1 className="text-lg font-semibold mt-2 px-2">{product.name}</h1>
      <div className="w-full flex flex-col py-4">
        {
          product.labelledPrice  > product.price && <span className="tetx-sm text-gray-500 mt-2 px-4 line-through">{product.labelledPrice}</span>
        }
        <span className="text-lg font-bold mt-1 px-4">{product.price}</span>
      </div>

    </Link>
  )
}