import axios from "axios";
import { useEffect, useState } from "react"
import ProductCard from "../../components/productCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="w-full h-full flex flex-wrap justify-center items-start"> {/* ✅ flex-wrap added */}
      {products.map((item) => (
        <ProductCard key={item.productId} product={item}/>
      ))}
    </div>
  );
}