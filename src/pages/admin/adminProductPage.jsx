import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios"; // Added missing import
import toast from "react-hot-toast";

const sampleProducts = [
  {
    productId: "LAP001",
    name: "Apple MacBook Air M2",
    altNames: ["MacBook Air", "Apple Laptop", "M2 Air"],
    price: 1099,
    labelPrice: 1199,
    description: "Apple MacBook Air with M2 chip.",
    images: ["https://images.unsplash.com/photo-1517336714739-489689fd1ca8"],
    brand: "Apple",
    model: "MacBook Air M2",
    category: "lap",
    isAvailable: true,
    stock: 15
  },
  {
    productId: "LAP002",
    name: "Dell XPS 15",
    altNames: ["XPS 15", "Dell Laptop"],
    price: 1499,
    labelPrice: 1599,
    description: "Premium Dell XPS 15 laptop.",
    images: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45"],
    brand: "Dell",
    model: "XPS 15",
    category: "lap",
    isAvailable: true,
    stock: 10
  }
];

export default function AdminProductPage() {
  // Initialize state with sample products as a fallback
  const [products, setProducts] = useState(sampleProducts);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    // Guard clause: alert if token is missing
    if (!token) {
      toast.error("Access denied. Please log in.");
      return;
    }

    axios.get(import.meta.env.VITE_API_URL + "/products", {
      headers: { // Fixed typo: 'headers' must be lowercase
        "Authorization": "Bearer " + token
      }
    }).then((response) => {
  if (Array.isArray(response.data)) {
    // If your backend is completely empty, keep showing the sample products
    if (response.data.length === 0) {
      setProducts(sampleProducts);
    } else {
      // OPTION: Or combine them together so both live data and samples display!
      setProducts([...sampleProducts, ...response.data]);
    }
  }
})
    
    .catch((error) => {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products from server");
    });
  }, []); // Empty dependency array forces this to run exactly ONCE on page load

  return (
    <div className="w-full h-full p-6 bg-gray-50 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard - Products</h1>
      </div>

      <div className="w-full bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-pink-300 border-b border-gray-200 text-gray-600 font-semibold text-sm">
              <th className="p-4">Image</th>
              <th className="p-4">Product ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Label Price</th>
              <th className="p-4">Brand</th>
              <th className="p-4">Model</th>
              <th className="p-4">Category</th>
              <th className="p-4">Stock</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {products.map((item) => (
              <tr key={item.productId} className="odd:bg-blue-100 even:bg-fuchsia-300 hover:bg-accent/45">
                <td className="p-4">
                  <img
                    src={item.images?.[0] || "https://placehold.co/60"}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover border"
                  />
                </td>
                <td className="p-4 font-mono font-medium text-gray-500">{item.productId}</td>
                <td className="p-4 font-semibold text-gray-900">{item.name}</td>
                <td className="p-4">${item.price}</td>
                <td className="p-4 text-gray-400 line-through">${item.labelPrice}</td>
                <td className="p-4">{item.brand}</td>
                <td className="p-4">{item.model}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-semibold uppercase">
                    {item.category}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`font-semibold ${item.stock < 5 ? "text-red-500" : "text-gray-700"}`}>
                    {item.stock}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Floating Add Button */}
      <Link
        to="/admin/add-product"
        className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 flex justify-center items-center text-white rounded-full shadow-xl hover:bg-blue-700 hover:scale-105 transition-all z-20">
        <FaPlus className="text-xl" />
      </Link>
    </div>
  );
}