import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import uploadMedia from "../../utils/mediaUpload";
import { Navigate } from "react-router-dom";

export default function AdminEditProductPage() {
    const location = useLocation();

    const [productId, setProductId] = useState(location.state?.productId || "");
    const [name, setName] = useState(location.state?.name || "");
    const [altNames, setAltNames] = useState(location.state?.altNames ? location.state.altNames.join(",") : "");
    const [price, setPrice] = useState(location.state?.price || "");
    const [labelPrice, setLabelPrice] = useState(location.state?.labelPrice || "");
    const [description, setDescription] = useState(location.state?.description || "");
    const [images, setImages] = useState([]);
    const [brand, setBrand] = useState(location.state?.brand || "");
    const [model, setModel] = useState(location.state?.model || "");
    const [category, setCategory] = useState(location.state?.category || "");
    const [isAvailable, setIsAvailable] = useState(location.state?.isAvailable ?? true);
    const [stock, setStock] = useState(location.state?.stock || 0);
    const [isUpdating, setIsUpdating] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (location.state == null) {
            toast.error("No product data found. Please select a product to edit.");
            navigate("/admin/products");
        }
    }, []);

    if (location.state == null) {
        return <Navigate to="/admin/products" />;
    }

    async function handleUpdate() {
        setIsUpdating(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("You must be logged in to perform this action");
                navigate("/login");
                return;
            }

            // ✅ Only upload if new images are selected, skip entirely otherwise
            let urls = [];
            const imageArray = Array.from(images);

            if (imageArray.length > 0) {
                console.log("Uploading images...", imageArray);
                try {
                    urls = await Promise.all(imageArray.map(img => uploadMedia(img)));
                    console.log("Upload complete, urls:", urls);
                } catch (uploadError) {
                    // ✅ Catch upload failure separately so it doesn't silently hang
                    console.error("Image upload failed:", uploadError);
                    toast.error("Image upload failed. Please try again.");
                    return; // Stop here, don't proceed with update
                }
            }

            const altNamesArray = altNames
                .split(",")
                .map(item => item.trim())
                .filter(Boolean);

            const productData = {
                productId,
                name,
                altNames: altNamesArray,
                price: parseFloat(price) || 0,
                labelPrice: parseFloat(labelPrice) || 0,
                description,
                images: urls.length > 0 ? urls : location.state.images,
                brand,
                model,
                category,
                isAvailable,
                stock: parseInt(stock, 10) || 0,
            };

            console.log("Sending product data:", productData);

            await axios.put(
                `${import.meta.env.VITE_API_URL}/products/${productId}`,
                productData,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );

            console.log("Update successful, navigating...");
            toast.success("Product updated successfully");

            navigate("/admin/products", { replace: true });

        } catch (error) {
            console.error("Error updating product:", error);
            toast.error(error?.response?.data?.message || "Failed to update product");
        } finally {
            setIsUpdating(false);
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center p-4 overflow-y-auto">
            <div className="sticky top-0 w-full h-[100px] rounded-lg bg-red-300 text-white flex items-center justify-between p-5 z-10">
                <h1 className="text-2xl font-semibold">Edit Product</h1>
                <div className="h-full flex justify-center items-center gap-2">
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isUpdating}
                    >
                        {isUpdating ? "Updating..." : "Update"}
                    </button>
                    <button
                        onClick={() => navigate("/admin/products")}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        disabled={isUpdating}
                    >
                        Cancel
                    </button>
                </div>
            </div>

            <div className="w-full flex flex-wrap bg-white mt-8 p-5 shadow-2xl rounded-lg">
                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Product Id</label>
                    <input
                        className="border border-gray-300 rounded-lg p-2 w-full bg-gray-100"
                        value={productId}
                        disabled={true}
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
                        value={labelPrice}
                        onChange={(e) => setLabelPrice(e.target.value)}
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
                <div className="w-full p-2">
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