import { useState } from "react"
import api from "../utils/api"
import toast from "react-hot-toast"
import StarRating from "./StarRating"

export default function ReviewForm({ productId, onReviewAdded }) {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const [isAnonymous, setIsAnonymous] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function submitReview() {
        if (rating === 0) {
            toast.error("Please select a star rating")
            return
        }
        const token = localStorage.getItem("token")
        if (!token) {
            toast.error("Please log in to leave a review")
            return
        }

        setIsSubmitting(true)
        try {
            await api.post(
                "/reviews",
                {
                    productId: productId,
                    rating: rating,
                    comment: comment,
                    isAnonymous: isAnonymous
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            toast.success("Review submitted")
            setRating(0)
            setComment("")
            setIsAnonymous(false)
            if (onReviewAdded) 
                await onReviewAdded()
        } catch (error) {
            console.log(error)
            const message = error?.response?.data?.message || "Failed to submit review"
            toast.error(message)
        }
        setIsSubmitting(false)
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-800">Write a Review</h2>

            <StarRating rating={rating} onChange={setRating} />

            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this product..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                rows={3}
            />

            <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                Post anonymously
            </label>

            <button
                onClick={submitReview}
                disabled={isSubmitting}
                className="px-6 py-2 rounded-xl bg-accent text-white font-medium hover:opacity-90 transition"
            >
                {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
        </div>
    )
}