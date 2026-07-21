import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingAnimation from "../../components/loadingAnimation";
import StarRating from "../../components/starRating";

export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalReviews, setTotalReviews] = useState(0);
    const [isReviewsLoaded, setIsReviewsLoaded] = useState(false);

    useEffect(() => {
        if (!isReviewsLoaded) {
            const token = localStorage.getItem("token");

            axios.get(import.meta.env.VITE_API_URL + "/reviews/" + pageSize + "/" + currentPage, {
                headers: { Authorization: "Bearer " + token }
            }).then((response) => {
                setReviews(response.data.reviews);
                setTotalPages(response.data.totalPages);
                setTotalReviews(response.data.total);
                setIsReviewsLoaded(true);
            }).catch((error) => {
                console.log(error);
                toast.error("Failed to load reviews");
            });
        }
    }, [isReviewsLoaded]);

    async function handleDelete(reviewId) {
        if (!window.confirm("Delete this review? This cannot be undone.")) return;

        const token = localStorage.getItem("token");
        try {
            await axios.delete(import.meta.env.VITE_API_URL + "/reviews/" + reviewId, {
                headers: { Authorization: "Bearer " + token }
            });
            toast.success("Review deleted");
            setIsReviewsLoaded(false);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to delete review");
        }
    }

    return (
        <div className="w-full min-h-screen bg-gray-50 p-6">
            <div className="w-full min-h-[90px] rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-between px-6 mb-6">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Reviews</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage customer reviews</p>
                </div>
                <span className="text-sm text-gray-600">
                    Total: <span className="font-semibold text-gray-800">{totalReviews}</span>
                </span>
            </div>

            {
                isReviewsLoaded ?
                    reviews.length === 0 ? (
                        <p className="text-gray-500 text-center py-10">No reviews yet.</p>
                    ) : (
                        <>
                            <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                                <table className="w-full min-w-[900px] text-sm text-gray-700">
                                    <thead className="bg-gray-100 text-gray-600">
                                        <tr>
                                            <th className="text-left font-semibold px-5 py-4">Product ID</th>
                                            <th className="text-left font-semibold px-5 py-4">User</th>
                                            <th className="text-left font-semibold px-5 py-4">Rating</th>
                                            <th className="text-left font-semibold px-5 py-4">Comment</th>
                                            <th className="text-left font-semibold px-5 py-4">Date</th>
                                            <th className="text-left font-semibold px-5 py-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reviews.map((item) => (
                                            <tr key={item._id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                                                <td className="px-5 py-4">
                                                    <span className="inline-block rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                                        {item.productId}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 font-medium text-gray-800">
                                                    {item.isAnonymous ? "Anonymous" : item.userName}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <StarRating rating={item.rating} readOnly onChange={() => {}} />
                                                </td>
                                                <td className="px-5 py-4 text-gray-600 max-w-xs truncate">
                                                    {item.comment || "-"}
                                                </td>
                                                <td className="px-5 py-4 text-gray-600">
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <button
                                                        onClick={() => handleDelete(item._id)}
                                                        className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="w-full flex justify-end items-center gap-3 mt-4">
                                <button
                                    onClick={() => {
                                        if (currentPage > 1) {
                                            setCurrentPage(currentPage - 1);
                                            setIsReviewsLoaded(false);
                                        }
                                    }}
                                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                                >
                                    Previous
                                </button>
                                <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
                                <button
                                    onClick={() => {
                                        if (currentPage < totalPages) {
                                            setCurrentPage(currentPage + 1);
                                            setIsReviewsLoaded(false);
                                        }
                                    }}
                                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                                >
                                    Next
                                </button>
                                <select
                                    value={pageSize}
                                    onChange={(e) => {
                                        setPageSize(parseInt(e.target.value));
                                        setCurrentPage(1);
                                        setIsReviewsLoaded(false);
                                    }}
                                    className="ml-4 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>
                        </>
                    )
                    :
                    <LoadingAnimation />
            }
        </div>
    );
}