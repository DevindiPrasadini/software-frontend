import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import uploadMedia from "../../utils/mediaUpload"; //  Fixed!

export default function AdminAddProductPage() {
    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [price, setPrice] = useState("");
    const [labelledPrice, setLabelledPrice] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [brand, setBrand] = useState("Apple"); // Initialized with first option
    const [model, setModel] = useState("");
    const [category, setCategory] = useState("lap"); // Initialized with first option
    const [isAvailable, setIsAvailable] = useState(true);
    const [stock, setStock] = useState(0);
    const [isSaving , setIsSeving] = useState(false)
    const navigate = useNavigate();
    const location = useLocation()
    
    async function handleSave() {
        try {
            setIsSeving(true)
            const token = localStorage.getItem("token");
            if (token == null) {
                toast.error("You must be logged in to perform this action");
                window.location.href = "/login";
                return;
            }

            // Upload images concurrently
            const mediaUploadPromises = [];
            for (let i = 0; i < images.length; i++) {
                mediaUploadPromises.push(uploadMedia(images[i]));
            }
            const urls = await Promise.all(mediaUploadPromises);

            // Clean up alternative names string into an array
            const altNamesArray = altNames.split(",").map(item => item.trim()).filter(Boolean);

            const productData = {
                productId: productId,
                name: name,
                altNames: altNamesArray,
                price: parseFloat(price) || 0, // Keeps numbers clean for backend
                labelledPrice: parseFloat(labelledPrice) || 0,
                description: description,
                images: urls,
                brand: brand,
                model: model,
                category: category,
                isAvailable: isAvailable,
                stock: parseInt(stock, 10) || 0 // Ensures integer conversion
            };

            await axios.post(
                import.meta.env.VITE_API_URL + "/products", 
                productData,
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            );

            toast.success("Product added successfully");
            navigate("/admin/products");

        } catch (error) {
            setIsSeving(false)
            console.error("Error saving product:", error);
            toast.error(error?.response?.data?.message || "Failed to add product");
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center p-4 overflow-y-auto">
            <div className="sticky top-0 w-full h-[100px] rounded-lg bg-red-300 text-white flex items-center justify-between p-5 z-10">
                <h1 className="text-2xl font-semibold">Add new product</h1>
                <div className="h-full flex justify-center items-center gap-2">
                    <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        disabled={isSaving}>{isSaving? "Saving..." : "Save"}
                    </button>
                    <button onClick={() => navigate("/admin/products")} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Cancel
                    </button>
                </div>
            </div>

            <div className="w-full flex flex-wrap bg-white mt-8 p-5 shadow-2xl rounded-lg">
                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Product Id</label>
                    <input 
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                    />
                </div>
                <div className="w-3/4 p-2">
                    <label className="block mb-2 font-semibold">Name</label>
                    <input 
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="w-full p-2">
                    <label className="block mb-2 font-semibold">Alternative names (Comma separated)</label>
                    <input 
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        placeholder="e.g. iphone 14, apple phone"
                        value={altNames}
                        onChange={(e) => setAltNames(e.target.value)}
                    />
                </div>
                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Price</label>
                    <input 
                        type="number"
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Label price</label>
                    <input 
                        type="number"
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        value={labelledPrice}
                        onChange={(e) => setLabelledPrice(e.target.value)}
                    />
                </div>
                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    >
                        <option value="lap">lap</option>
                        <option value="phone">phone</option>
                        <option value="Headphone">HeadPhone</option>
                        <option value="Mouse">Mouse</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Images</label>
                    <input 
                        type="file" 
                        multiple 
                        className="w-full p-1 border border-gray-300 rounded-lg"
                        onChange={(e) => setImages(e.target.files)}
                    />
                </div>
                <div className="w-full p-2"> {/* Expanded width for description readability */}
                    <label className="block mb-2 font-semibold">Description</label>
                    <textarea 
                        className="border border-gray-300 rounded-md p-2 w-full h-24"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Brand</label>
                    <select 
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    >
                        <option value="Apple">Apple</option>
                        <option value="Samsung">Samsung</option>
                        <option value="hp">Hp</option>
                        <option value="Sony">Sony</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Model</label>
                    <input 
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    />
                </div>
                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Stock</label>
                    <input 
                        type="number"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>
                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Availability</label>
                    <select 
                        value={isAvailable.toString()}
                        onChange={(e) => setIsAvailable(e.target.value === "true")} 
                        className="border border-gray-300 rounded-md p-2 w-full"
                    >
                        <option value="true">Available</option>
                        <option value="false">Not available</option>
                    </select>
                </div>
            </div>
        </div>
    );
}