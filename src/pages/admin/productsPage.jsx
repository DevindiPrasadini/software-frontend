import axios from "axios";
import { useEffect, useState } from "react"
import ProductCard from "../../components/productCard";
import toast from "react-hot-toast";
import api from "../../utils/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("")
  const [isProductsAreLoaded, setIsProductsAreLoaded] = useState(false)

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // ✅ run once on mount

  async function handleSearch() {

    try {
      const response = await api.get("/products/search/" + query)
      setProducts(response.data)

    } catch (error) {
      console.log(error)
      toast.error("Failed to search products!")
    }
  }

  return (
    <div className="w-full h-full flex flex-wrap relative justify-center items-start lg:pb-0 pt-16">
      <div className="full absolute top-0 left-0 w-full h-[100px] flex justify-center items-center">
        <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search products..." className="w-1/2 p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"></input>
        <button className="ml-4 px-4 py-3 bg-accent text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark" onClick={handleSearch}>Search</button>
        {/*button for all products */}
        <button className="ml-4 px-4 py-3 bg-pink-300 text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark" onClick={() => {
          setQuery("")
          axios.get(import.meta.env.VITE_API_URL + "/products")
            .then((response) => setProducts(response.data))
            .catch((error) => console.log(error))
        }}>All Products</button>
      </div>
      {products.map((item) => (
        <ProductCard key={item.productId} product={item} />
      ))}
      <div className="w-full h-[100px]"></div>
    </div>
  );
}